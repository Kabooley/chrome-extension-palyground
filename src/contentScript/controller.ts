/********************************************************
 * controller
 * ____________________________________________
 *
 * 本家Udemy講義ページのトランスクリプト機能と同じものを生成する
 * 字幕データだけ、特別に生成された字幕データを取り扱う
 *
 *
 * 機能：
 * -
 *
 * NOTE:
 *
 * - 自動スクロール機能は要改善である
 *
 * TODO:
 *
 * - 字幕データは受動的に取得する仕様にする
 * 見た目があまりに変にならないように、
 *  字幕データがなくてもExTranscriptが縮まないようにする
 * 
 * - RESET機能
 *  まったく手つかず
 * 
 * - [済] Stateの外部モジュール化
 * - [済] 自動スクロール機能の発火条件の発見とそれに伴う修正
 * *******************************************************/
import sidebarTranscriptView from "./sidebarTranscriptView";
import bottomTranscriptView from "./bottomTranscriptView";
import * as selectors from "../utils/selectors";
import {
  extensionNames,
  iMessage,
  iResponse,
  orderNames,
  subtitle_piece,
  RESIZE_BOUNDARY,
  SIDEBAR_WIDTH_BOUNDARY,
  RESIZE_TIMER,
  SIGNAL,
  positionStatus,
  viewStatusNames,
  keyof_viewStatus,
  keyof_positionStatus,
} from "../utils/constants";
import Observable from "../utils/Observable";
import State from "../utils/contentScript/State";
import MutationObserver_ from "../utils/MutationObserver_";
// import { sendMessagePromise } from "../utils/helpers";

// ----- GLOBALS --------------------------

// Annotations
//
interface iController {
  // 本家Transcriptのポジション2通り
  position: keyof_positionStatus;
  // 本家Transcriptがsidebarであるときの表示のされ方2通り
  view: keyof_viewStatus;
  // 本家Transcriptでハイライトされている字幕の要素の順番
  highlight: number;
  // ExTranscriptの字幕要素のうち、いまハイライトしている要素の順番
  ExHighlight: number;
  // _subtitlesのindexプロパティからなる配列
  indexList: number[];
  // 自動スクロール機能が展開済かどうか
  isAutoscrollInitialized: boolean;
}

// 字幕データはでかいので、毎回気軽に呼び出さないでほしい
// そのため別にしておく
interface iSubtitles {
  subtitles: subtitle_piece[];
}

const statusBase: iController = {
  // position, viewの初期値は意味をなさず、
  // すぐに変更されることが前提である
  position: positionStatus.sidebar,
  view: viewStatusNames.wideView,
  highlight: null,
  ExHighlight: null,
  indexList: [],
  isAutoscrollInitialized: false,
};

const subtitleBase: iSubtitles = {
  subtitles: [],
};

let timerQueue: NodeJS.Timeout = null;
let sStatus: State<iController>;
let sSubtitles: State<iSubtitles>;
let transcriptListObserver: MutationObserver_ = null;

//
// --- CHROME LISTENERS -------------------
//

/**
 *  Chrome API: On Message Handler
 *
 * */
 chrome.runtime.onMessage.addListener(
  async (
    message: iMessage,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response: iResponse) => void
  ): Promise<boolean> => {
    try {
      if (message.to !== extensionNames.controller) return;
      console.log("CONTROLLER GOT MESSAGE");
      const { order, ...rest } = message;
      if (order && order.length) {
        if (order.includes(orderNames.reset)) {
          console.log("order: RESET controller.ts");
          handlerOfReset();
          sendResponse({complete: true, success: true});
        }
        if(order.includes(orderNames.turnOff)){
          console.log("order: TURN OFF ExTranscript");
          handlerOfTurnOff();
          sendResponse({complete: true, success: true});
        }
      }
      // 字幕データが送られてきたら
      if (rest.subtitles) {
        //  setStateのnotify()がこの変更に必要な関数を実行してくれる
        sSubtitles.setState({ subtitles: rest.subtitles });
        sendResponse({ complete: true });
      }
      return true;
    } catch (err) {
      console.error(err.message);
    }
  }
);

//
// --- REPLACE & INSERT VIEW METHODS ----------------------------
//

const renderSidebarTranscript = (): void => {
  const { subtitles } = sSubtitles.getState();
  bottomTranscriptView.clear();
  sidebarTranscriptView.clear();
  sidebarTranscriptView.render(subtitles);
  sidebarTranscriptView.updateContentHeight();
  // sidebarの時だけに必要
  window.addEventListener("scroll", onWindowScrollHandler);
};

const renderBottomTranscript = (): void => {
  const { subtitles } = sSubtitles.getState();
  sidebarTranscriptView.clear();
  bottomTranscriptView.clear();
  bottomTranscriptView.render(subtitles);
  // noSidebarの時は不要
  window.removeEventListener("scroll", onWindowScrollHandler);
};

// 
// --- Handlers ----------------------------------------------
// 

const reductionOfwindowResizeHandler = (): void => {
  clearTimeout(timerQueue);
  timerQueue = setTimeout(onWindowResizeHandler, RESIZE_TIMER);
}

const handlerOfTurnOff = (): void => {
console.log("Turning off ExTranscript");

// REMOVAL Listeners
window.removeEventListener("resize", reductionOfwindowResizeHandler);
window.removeEventListener("scroll", onWindowScrollHandler);

// CLEAR ExTranscript
const { position } = sStatus.getState();
if(position === positionStatus.sidebar) {
  sidebarTranscriptView.clear();
}
else {
  bottomTranscriptView.clear();
}

// REMOVAL MutationObserver
transcriptListObserver.disconnect();
transcriptListObserver = null;


// RESET State
sStatus.setState({...statusBase});
sSubtitles.setState({...subtitleBase});
}

const handlerOfReset = (): void => {
  console.log("Reset ExTranscript");

  handlerOfTurnOff();

  // NOTE: 以下はMAINの後半の処理と同じである
  const w: number = document.documentElement.clientWidth;
  const s: keyof_positionStatus =
    w > RESIZE_BOUNDARY ? positionStatus.sidebar : positionStatus.noSidebar;
  sStatus.setState({ position: s });

  if (s === positionStatus.sidebar) {
    sStatus.setState({
      view:
        w > SIDEBAR_WIDTH_BOUNDARY
          ? viewStatusNames.wideView
          : viewStatusNames.middleView,
    });
  }

  window.addEventListener("resize", reductionOfwindowResizeHandler);};


/**
 * Update ExTranscript View hight while it is sidebar.
 *
 * */
const onWindowScrollHandler = (): void => {
  const y: number = window.scrollY;
  y < 56
    ? sidebarTranscriptView.updateContentTop(56 - y)
    : sidebarTranscriptView.updateContentTop(0);
};

/*
  onWindowResizeHandler()

window.onresizeで境界条件を指定する

exTranscriptの配置換え：RESIZE_BOUNDARYをまたいだ時だけ更新する
updateContentHeight(): position === sidebarが真のときは必ず実行


*/
const onWindowResizeHandler = (): void => {
  console.log("[onWindowResizeHandler]");

  const w: number = document.documentElement.clientWidth;
  const { position, view } = sStatus.getState();

  // ブラウザの幅がRESIZE_BOUNDARYを上回るとき
  // Transcriptをsidebarに設置する
  if (w > RESIZE_BOUNDARY && position !== positionStatus.sidebar) {
    sStatus.setState({ position: positionStatus.sidebar });
    sStatus.setState({ view: viewStatusNames.middleView });

    // 同時に、sidebar時のTranscriptの表示方法の変更
    sStatus.setState({
      view:
        w > SIDEBAR_WIDTH_BOUNDARY
          ? viewStatusNames.wideView
          : viewStatusNames.middleView,
    });
  }

  // ブラウザの幅がRESIZE＿BOUNDARYを下回るとき
  // Transcriptを動画下部に表示する
  if (w < RESIZE_BOUNDARY && position !== positionStatus.noSidebar) {
    sStatus.setState({ position: positionStatus.noSidebar });
  }

  // Transcriptがsidebarの時、
  // 2通りある表示方法を決定する
  if (position === positionStatus.sidebar) {
    sidebarTranscriptView.updateContentHeight();
    if (view === viewStatusNames.middleView && w > SIDEBAR_WIDTH_BOUNDARY) {
      // sidebar widthを300pxから25%へ
      sStatus.setState({ view: viewStatusNames.wideView });
    }
    if (view === viewStatusNames.wideView && w < SIDEBAR_WIDTH_BOUNDARY) {
      // sideba widthを25%から300pxへ
      sStatus.setState({ view: viewStatusNames.middleView });
    }
  }
};

//
// ----- DETECT AUTO SCROLL METHODS -----------------------------
//
/*
    字幕要素群の中から、引数の要素が何番目にあるのかを探してその順番を返す
*/
const getElementIndexOfList = (
  from: NodeListOf<Element>,
  lookFor: Element
): number => {
  var num: number = 0;
  for (const el of Array.from(from)) {
    if (el === lookFor) return num;
    num++;
  }
  // 一致するものがなかった場合
  return -1;
};

/*
    updateHighlistIndexes()
    ____________________________

    state._ExHighlightを更新するための関数
    本家のTranscriptのハイライト要素を取得して
    それを基にExTranscriptのハイライトする要素の番号を更新する

    updaeExTranscriptHighlight()を呼び出す前に必ず呼び出すこと


    まずcurrentHighlightが取得できていない
    理由はこのセレクターだと
    動画が再生する前の状態の時(再生画面が動画の真ん中に表示されている状態)はこのセレクタはどの要素にも追加されていないからである
*/
const updateHighlightIndexes = (): void => {
  // １．本家のハイライト要素を取得して、その要素群の中での「順番」を保存する
  const nextHighlight: Element = document.querySelector<Element>(
    selectors.transcript.highlight
  );
  const list: NodeListOf<HTMLSpanElement> = document.querySelectorAll(
    selectors.transcript.transcripts
  );
  const next: number = getElementIndexOfList(list, nextHighlight);
  sStatus.setState({ highlight: next });

  // 2. 1で取得した「順番」がstate._subtitlesのindexと一致するか比較して、
  // ExTranscriptのハイライト要素の番号を保存する
  const { indexList } = sStatus.getState();
  if (indexList.includes(next)) {
    sStatus.setState({ ExHighlight: next });
  } else {
    // 一致するindexがない場合
    // currentHighlightの番号に最も近い、currentHighlightより小さいindexをsetする
    var prev: number = null;
    for (let i of indexList) {
      if (i > next) {
        sStatus.setState({ ExHighlight: prev });
        break;
      }
      prev = i;
    }
  }
};

/*

    updaeExTranscriptHighlight()
    ________________________________________

    ExTranscriptの字幕要素のハイライトを更新する
    前回のハイライト要素のハイライトを消し
    次のハイライト要素にハイライトを付ける

    どれをハイライトさせるかは`state._ExHighlight`に依存する
*/
const updateExTranscriptHighlight = (): void => {
  // 次ハイライトする要素のdata-idの番号
  const { ExHighlight } = sStatus.getState();
  const next: HTMLElement = document.querySelector(
    `${selectors.EX.dashboardTranscriptCueContainer}[data-id="${ExHighlight}"]`
  );
  // 現在のハイライト要素
  const current: HTMLElement = document.querySelector<HTMLElement>(
    `${selectors.EX.dashboardTranscriptCueContainer}${selectors.EX.highlight}`
  );
  if (!current) {
    //   初期化時
    console.log("---- INITIALIZE -----");
    next.classList.add(selectors.EX.highlight.slice(1));
    console.log(next);
  } else {
    //   更新時
    const currentIndex: number = parseInt(current.getAttribute("data-id"));

    // もしも変わらないなら何もしない
    if (currentIndex === ExHighlight) {
      console.log("--- NO UPDATE ---");
      return;
    }
    // 更新ならば、前回のハイライト要素を解除して次の要素をハイライトさせる
    else {
      console.log("--- UPDATE ---");
      current.classList.remove(selectors.EX.highlight.slice(1));
      next.classList.add(selectors.EX.highlight.slice(1));
      console.log(next);
    }
  }
};

/***
 *  set detect scroll
 * 
 * Udemyの自動スクロール機能と同じ機能をセットアップする関数
 * 
 * NOTE: Udemyの字幕はまったく同じ字幕要素が2個も3個も生成されている
 * 
 * つまりまったく同じ要素が同時に複数存在する状況が発生してしまっている
 * 多分バグだけど、同じ要素が何個も生成されてしまうとリスナが何度も
 * 反応してしまう可能性がある
 * 
 * これに伴って
 * MutationObserverのMutationRecordも複数ある要素のすべてを記録するので
 * 1度だけ行いたい処理を2回以上行わなくてはならない危険性がある
 * 
 *  これを避けるためにisItDoneで処理が既に完了しているのかどうかを
 *  確認するようにしている
 * ***/ 
const setDetectScroll = (): void => {
  const _callback = (mr: MutationRecord[]): void => {
    console.log("observed");
  //   var isItDone: boolean = false;
  //   mr.forEach((record: MutationRecord) => {
  //     if (
  //       record.type === "attributes" &&
  //       record.attributeName === "class" &&
  //       record.oldValue === "" &&
  //       !isItDone
  //     ) {
  //       // oldValueには""の時と、"ranscript--highlight-cue--1bEgq"の両方の時がある
  //       // "ranscript--highlight-cue--1bEgq"をoldValueで受け取るときは
  //       // ハイライトのclassをその要素からremoveしたときと考えて
  //       // その時は何もしない
  //       // 処理は1度だけになるように
  //       console.log("-- observer executed --");
  //       isItDone = true;
  //       updateHighlightIndexes();
  //       updateExTranscriptHighlight();
  //       scrollToHighlight();
  //     }
  //   });
  // };

  // const observer: MutationObserver = new MutationObserver(_callback);

  // const config: MutationObserverInit = {
  //   attributes: true,
  //   childList: false,
  //   subtree: false,
  //   attributeOldValue: true,
  // };

  // //   NodeListOf HTMLSpanElement
  // const transcriptList: NodeListOf<Element> = document.querySelectorAll(
  //   selectors.transcript.transcripts
  // );
  // transcriptList.forEach((ts) => {
  //   observer.observe(ts, config);
  // });

  
const moConfig: MutationObserverInit = {    
  attributes: true,
  childList: false,
  subtree: false,
  attributeOldValue: true,
}

const moCallback = function(this: MutationObserver_, mr: MutationRecord[]): void{
  console.log("observed");
  let isItDone: boolean = false;
  mr.forEach((record: MutationRecord) => {
    if(
        record.type === "attributes" &&
        record.attributeName === "class" &&
        record.oldValue === "" &&
        isItDone
    ){
      isItDone = true;
      this._observer.disconnect();
      // DOM への変更中はdisconnectで無限ループ防止できる ----
      updateHighlightIndexes();
      updateExTranscriptHighlight();
      scrollToHighlight();
      // ------------------------------------------------------
      this._observer.observe(record.target, this._config);
    }
  });
}

  // 一旦リセットしてから
  if(transcriptListObserver) {
    transcriptListObserver.disconnect();
    transcriptListObserver = null;
  }
  //   NodeListOf HTMLSpanElement
  const transcriptList: NodeListOf<Element> = document.querySelectorAll(
    selectors.transcript.transcripts
  );
  transcriptListObserver = new MutationObserver_(moCallback, moConfig, transcriptList);
};

/**
 *  Scroll to Highlight
 * ______________________________
 *
 * ExTranscriptの自動スクロールを更新内容に反映する
 *
 * */
const scrollToHighlight = (): void => {
  // そのたびにいまハイライトしている要素を取得する
  const { ExHighlight } = sStatus.getState();
  const current: HTMLElement = document.querySelector<HTMLElement>(
    `${selectors.EX.dashboardTranscriptCueContainer}[data-id="${ExHighlight}"]`
  );
  const panel: HTMLElement = document.querySelector(
    selectors.EX.dashboardTranscriptPanel
  );

  const panelRect: DOMRect = panel.getBoundingClientRect();
  const currentRect: DOMRect = current.getBoundingClientRect();

  if (currentRect.y > panelRect.y) {
    const distance: number = currentRect.y - panelRect.y;
    panel.scrollTop = distance + panel.scrollTop;
  } else {
    if (currentRect.y > 0) {
      const distance: number = panelRect.y - currentRect.y;
      panel.scrollTop = panel.scrollTop - distance;
    } else {
      const distance = panelRect.y + Math.abs(currentRect.y);
      panel.scrollTop = panel.scrollTop - distance;
    }
  }
};



//
// --- UPDATE METHODS -----------------------------------
//

/**
 *  Update subtitles rendering.
 * 
 * 常に受け取った字幕データ通りに再レンダリングさせる
 * 同時に、
 * 
 * */ 
const updateSubtitle = (prop, prev): void => {
  if (prop.subtitles === undefined) return;

  // 字幕データのアップデート
  const { position, view, isAutoscrollInitialized } = sStatus.getState();
  if (position === "sidebar") {
    renderSidebarTranscript();
    sidebarTranscriptView.updateContentHeight();
    view === "middleView"
      ? sidebarTranscriptView.updateWidth(SIGNAL.widthStatus.middleview)
      : sidebarTranscriptView.updateWidth(SIGNAL.widthStatus.wideview);
  }
  if (position === "noSidebar") {
    renderBottomTranscript();
  }
  if (!isAutoscrollInitialized) {
    // NOTE: 自動スクロール機能はここで初期化される
    setDetectScroll();
    sStatus.setState({ isAutoscrollInitialized: true });
  }
};

const updatePosition = (prop, prev): void => {
  const { position } = prop;
  if (position === undefined) return;

  if (position === "sidebar") renderSidebarTranscript();
  else if (position === "noSidebar") renderBottomTranscript();
};

const updateSidebarView = (prop, prev): void => {
  const { view } = prop;
  if (view === undefined) return;

  if (view === "middleView")
    sidebarTranscriptView.updateWidth(SIGNAL.widthStatus.middleview);
  else if (view === "wideView")
    sidebarTranscriptView.updateWidth(SIGNAL.widthStatus.wideview);
};

const updateHighlight = (prop, prev): void => {
  const { highlight } = prop;
  if (highlight === undefined) return;
};

const updateExHighlight = (prop, prev): void => {
  const { highlight } = prop;
  if (highlight === undefined) return;
};

/**
 *  MAIN
 *
 * */
(function (): void {
  console.log("[controller] Initializing...");

  const oStatus: Observable<iController> = new Observable<iController>();
  const oSubtitle: Observable<iSubtitles> = new Observable<iSubtitles>();
  sStatus = new State(statusBase, oStatus);
  sSubtitles = new State(subtitleBase, oSubtitle);

  sSubtitles.observable.register(updateSubtitle);
  sStatus.observable.register(updatePosition);
  sStatus.observable.register(updateSidebarView);
  sStatus.observable.register(updateHighlight);
  sStatus.observable.register(updateExHighlight);

  // 初期のExTranscriptの展開場所に関するステータスを取得する
  const w: number = document.documentElement.clientWidth;
  const s: keyof_positionStatus =
    w > RESIZE_BOUNDARY ? positionStatus.sidebar : positionStatus.noSidebar;
  sStatus.setState({ position: s });

  if (s === positionStatus.sidebar) {
    sStatus.setState({
      view:
        w > SIDEBAR_WIDTH_BOUNDARY
          ? viewStatusNames.wideView
          : viewStatusNames.middleView,
    });
  }

  window.removeEventListener("resize", reductionOfwindowResizeHandler);
  window.addEventListener("resize", reductionOfwindowResizeHandler);
})();

//
// ---- LEGACY ----------------------------------------
//

// const init = async (): Promise<void> => {
//   try {
//     await sendMessagePromise({
//       from: extensionNames.controller,
//       to: extensionNames.background,
//       activated: true,
//     });
//     const temporary = state.loadSubtitles();
//     console.log(temporary);
//     const w: number = document.documentElement.clientWidth;
//     const s: keyof_positionStatus =
//       w > RESIZE_BOUNDARY
//         ? positionStatus.sidebar
//         : positionStatus.noSidebar;
//     state.setState({ position: s });
//     if (s === positionStatus.sidebar) {
//       renderSidebarTranscript();
//       sidebarTranscriptView.updateContentHeight();
//       if (w > SIDEBAR_WIDTH_BOUNDARY) {
//         state.setState({ view: viewStatusNames.wideView });
//         sidebarTranscriptView.updateWidth(SIGNAL.widthStatus.wideview);
//       } else {
//         state.setState({ view: viewStatusNames.middleView });
//         sidebarTranscriptView.updateWidth(SIGNAL.widthStatus.middleview);
//       }
//     } else {
//       renderBottomTranscript();
//     }

//     window.addEventListener("resize", function () {
//       clearTimeout(timerQueue);
//       timerQueue = setTimeout(onWindowResizeHandler, RESIZE_TIMER);
//     });

//     // --- ここまでで初期化完了 ---
//     // ViewにLoading画面を表示させる

//     // subtitlesをViewに表示準備できたら
//     // ViewのLoading画面を終了させる
//   } catch (err) {
//     if (err === chrome.runtime.lastError) {
//       console.error(err.message);
//     } else {
//       console.log(err);
//     }
//   }
// };
//
// init();

// /*
//     movieContainerClickHandler
//     _____________________________________
//     Udemyの講義ページで動画が再生開始したかどうかを判断する
//     これは一時停止かどうかではなく
//     ページのリロード時などに動画の上にリプレイボタンが表示されているかどうかである

//     リプレイボタン要素がなければ再生中という判断である

//     再生が始まったら初めて自動スクロール機能をセットできる

//     ...とおもったらclickイベントでbuttonがなくなったかチェックしようと思ったら
//     clickイベントが終わってからじゃにとbuttonは消去されないので
//     clickイベント中だと確認できない

//     MutationObserverつかうしかない？

// */
// const movieReplayClickHandler = (ev: PointerEvent): void => {
//   console.log("[controller] Movie clicked");
//   const movieContainer: HTMLElement = document.querySelector<HTMLElement>(
//     selectors.movieContainer
//   );
//   movieContainer.removeEventListener("click", movieReplayClickHandler);
//   //   set up auto scroll handling
//   //   initializeDetecting();
//   setDetectScroll();
// };

// /*
//     setDetectScroll()
//     ______________________________________

//     本家のハイライトされている字幕が、
//     自動スクロール機能で移り変わるたびに反応するオブザーバを生成する

//     12/7:
//     欲しいタイミングで発火していないみたい
//     _callbackの内容をMutationRecordを精査することで条件分岐させること

//     まず、Udemyは同じ字幕を2，3回繰り返し生成してしまうみたいで
//     つまりまったく同じ要素が同時に複数存在する状況が発生されてしまっている

//     これに伴って
//     MutationObserverのMutationRecordも複数ある要素のすべてを記録するので
//     1度だけ行いたい処理を2回以上行わなくてはならない危険性がある

//     これを避けるためにisItDoneで処理が既に完了しているのかどうかを確認するようにしている

// */
// const setDetectScroll = (): void => {
//   const _callback = (mr: MutationRecord[]): void => {
//     console.log("observed");
//     var isItDone: boolean = false;
//     mr.forEach((record: MutationRecord) => {
//       if (
//         record.type === "attributes" &&
//         record.attributeName === "class" &&
//         record.oldValue === "" &&
//         !isItDone
//       ) {
//         // oldValueには""の時と、"ranscript--highlight-cue--1bEgq"の両方の時がある
//         // "ranscript--highlight-cue--1bEgq"をoldValueで受け取るときは
//         // ハイライトのclassをその要素からremoveしたときと考えて
//         // その時は何もしない
//         // 処理は1度だけになるように
//         console.log("-- observer executed --");
//         isItDone = true;
//         updateHighlightIndexes();
//         updateExTranscriptHighlight();
//         scrollToHighlight();
//       }
//     });
//   };

//   const observer: MutationObserver = new MutationObserver(_callback);

//   const config: MutationObserverInit = {
//     attributes: true,
//     childList: false,
//     subtree: false,
//     attributeOldValue: true,
//   };

//   //   NodeListOf HTMLSpanElement
//   const transcriptList: NodeListOf<Element> = document.querySelectorAll(
//     selectors.transcript.transcripts
//   );
//   transcriptList.forEach((ts) => {
//     observer.observe(ts, config);
//   });
// };

// /*
//     movieContainerClickHandler
//     _____________________________________
//     Udemyの講義ページで動画が再生開始したかどうかを判断する
//     これは一時停止かどうかではなく
//     ページのリロード時などに動画の上にリプレイボタンが表示されているかどうかである

//     リプレイボタン要素がなければ再生中という判断である

//     再生が始まったら初めて自動スクロール機能をセットできる

//     ...とおもったらclickイベントでbuttonがなくなったかチェックしようと思ったら
//     clickイベントが終わってからじゃにとbuttonは消去されないので
//     clickイベント中だと確認できない

//     MutationObserverつかうしかない？

// */
// const movieReplayClickHandler = (ev: PointerEvent): void => {
//   console.log("[controller] Movie clicked");
//   const movieContainer: HTMLElement = document.querySelector<HTMLElement>(
//     selectors.transcript.movieContainer
//   );
//   movieContainer.removeEventListener("click", movieReplayClickHandler);
//   //   set up auto scroll handling
//   //   initializeDetecting();
//   setDetectScroll();
// };