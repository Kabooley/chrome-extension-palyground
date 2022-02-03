/********************************************************
 * controller
 * ____________________________________________
 * 
 * 本家Udemy講義ページのトランスクリプト機能と同じものを生成する
 * 
 * 機能：
 * - 
 * 
 * TODO:
 * 
 * - 字幕データは受動的に取得する仕様にする
 * - RESET機能
 * - Stateの外部モジュール化
 * 
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
  positionStatusNames,
  viewStatusNames,
  iControllerStatus,
  keyof_positionStatus,
} from "../utils/constants";
import { sendMessagePromise } from "../utils/helpers";

// ----- GLOBALS -------------------------------------------------

let timerQueue: NodeJS.Timeout = null;



// --- CHROME LISTENERS -------------------

/*
    onMessage.addListener
    _______________________________________
    
    今のところ出番ないかも
*/
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
      }
      // 字幕データが送られてきたら
      if(rest.subtitles) {

      }
      return true;
    } catch (err) {
      console.error(err.message);
    }
  }
);



/*
    state
    ______________________________

*/

interface iControllerState {
  // About window status
  setState: (o: iControllerStatus) => void;
  getState: () => iControllerStatus;
  // About subtitle data
  saveSubtitles: (s: subtitle_piece[]) => void;
  loadSubtitles: () => subtitle_piece[];
  // About original Transcript auto scroll data
  setCurrentHighlight: (index: number) => void;
  getCurrentHighlight: () => number;
  // About ExTranscript auto scroll data
  setExCurrentHighlight: (index: number) => void;
  getExCurrentHighlight: () => number;
  getIndexList: () => number[];
}

const state: iControllerState = (() => {
  let _state: iControllerStatus = {};
  let _subtitles: subtitle_piece[] = [];
  // 本家の字幕のうち、ハイライトされている要素の順番
  let _highlight: number = null;
  // ExTranscriptの字幕要素のうち、いまハイライトしている要素の順番
  let _ExHighlight: number = null;
  // _subtitlesのindexプロパティからなる配列
  let _indexList: number[] = [];

  const _saveIndexList = (): void => {
    // 現在の配列の中身を消去する
    _indexList.splice(0);
    _subtitles.forEach((s: subtitle_piece) => {
      _indexList.push(s.index);
    });
  };

  return {
    setState: (o: iControllerStatus) => {
      _state = {
        ..._state,
        ...o,
      };
    },
    getState: (): iControllerStatus => {
      return _state;
    },
    // 常に古いものを消し、新しいものだけを保存する
    saveSubtitles: (s: subtitle_piece[]): void => {
      _subtitles.splice(0);
      _subtitles.push(...s);
      // _indexListを更新する
      _saveIndexList();
    },
    //
    loadSubtitles: (): subtitle_piece[] => {
      return _subtitles;
    },
    setCurrentHighlight: (index: number) => {
      _highlight = index;
    },
    getCurrentHighlight: () => {
      return _highlight;
    },
    setExCurrentHighlight: (index: number) => {
      _ExHighlight = index;
    },
    getExCurrentHighlight: () => {
      return _ExHighlight;
    },
    getIndexList: () => {
      return _indexList;
    },
  };
})();

// 
// --- REPLACE & INSERT VIEW METHODS ----------------------------
// 

const insertSidebarTranscript = (): void => {
  const s: subtitle_piece[] = state.loadSubtitles();
  bottomTranscriptView.clear();
  sidebarTranscriptView.render(s);
  // sidebarの時だけに必要
  window.addEventListener("scroll", onWindowScrollHandler);
};

const insertBottomTranscript = (): void => {
  const s: subtitle_piece[] = state.loadSubtitles();
  sidebarTranscriptView.clear();
  bottomTranscriptView.render(s);
  window.removeEventListener("scroll", onWindowScrollHandler);
};

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
  // const s: iControllerStatus = state.getState();
  const { position, view } = state.getState();

  // ブラウザの幅がRESIZE_BOUNDARYを上回るとき
  // Transcriptをsidebarに設置する
  if (w > RESIZE_BOUNDARY && position !== positionStatusNames.sidebar) {
    state.setState({ position: positionStatusNames.sidebar });
    insertSidebarTranscript();
    state.setState({ view: viewStatusNames.middleView });
    sidebarTranscriptView.updateContentHeight();

    // 同時にsidebar時のTranscriptの表示方法の変更
    // 2通りある
    if (w > SIDEBAR_WIDTH_BOUNDARY) {
      state.setState({ view: viewStatusNames.wideView });
      sidebarTranscriptView.updateWidth(SIGNAL.widthStatus.wideview);
    } else {
      state.setState({ view: viewStatusNames.middleView });
      sidebarTranscriptView.updateWidth(SIGNAL.widthStatus.middleview);
    }
  }

  // ブラウザの幅がRESIZE＿BOUNDARYを下回るとき
  // Transcriptを動画下部に表示する
  if (w < RESIZE_BOUNDARY && position !== positionStatusNames.noSidebar) {
    state.setState({ position: positionStatusNames.noSidebar });
    insertBottomTranscript();
  }

  // Transcriptがsidebarの時、
  // 2通りある表示方法を決定する
  if (position === positionStatusNames.sidebar) {
    sidebarTranscriptView.updateContentHeight();
    if (view === viewStatusNames.middleView && w > SIDEBAR_WIDTH_BOUNDARY) {
      // sidebar widthを300pxから25%へ
      state.setState({ view: viewStatusNames.wideView });
      sidebarTranscriptView.updateWidth(SIGNAL.widthStatus.wideview);
    }
    if (view === viewStatusNames.wideView && w < SIDEBAR_WIDTH_BOUNDARY) {
      // sideba widthを25%から300pxへ
      state.setState({ view: viewStatusNames.middleView });
      sidebarTranscriptView.updateWidth(SIGNAL.widthStatus.middleview);
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
  const nextHighlight = document.querySelector(selectors.transcript.highlight);
  var nextIndex: number;

  const list: NodeListOf<HTMLSpanElement> = document.querySelectorAll(
    selectors.transcript.transcripts
  );
  nextIndex = getElementIndexOfList(list, nextHighlight);
  state.setCurrentHighlight(nextIndex);
  //
  // DEBUG
  //
  console.log(`Highlight: ${nextIndex}`);

  // 2. 1で取得した「順番」がstate._subtitlesのindexと一致するか比較して、
  // ExTranscriptのハイライト要素の番号を保存する
  const indexes: number[] = state.getIndexList();
  if (indexes.includes(nextIndex)) {
    state.setExCurrentHighlight(nextIndex);
    console.log(`ExTranscript Highlight ${nextIndex}`);
  } else {
    // 一致するindexがない場合
    // currentHighlightの番号に最も近い、currentHighlightより小さいindexをsetする
    var prev: number = null;
    for (let i of indexes) {
      if (i > nextIndex) {
        state.setExCurrentHighlight(prev);
        //
        // DEBUG
        //
        console.log(`ExTranscript Highlight ${prev}`);
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
  const nextIndex: number = state.getExCurrentHighlight();
  const next: HTMLElement = document.querySelector(
    `${selectors.EX.dashboardTranscriptCueContainer}[data-id="${nextIndex}"]`
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
    if (currentIndex === nextIndex) {
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


/**
 *  Scroll to Highlight
 * ______________________________
 * 
 * ExTranscriptの自動スクロールを更新内容に反映する
 * 
 * */ 
const scrollToHighlight = (): void => {
  // そのたびにいまハイライトしている要素を取得する
  const currentIndex: number = state.getExCurrentHighlight();
  const current: HTMLElement = document.querySelector<HTMLElement>(
    `${selectors.EX.dashboardTranscriptCueContainer}[data-id="${currentIndex}"]`
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


/**
 *  MAIN
 * ___________________________________
 * 
 * */ 
(async (): Promise<void> => {
  try {
    console.log("[controller] Initializing...");

    const w: number = document.documentElement.clientWidth;
    const s: keyof_positionStatus =
      w > RESIZE_BOUNDARY
        ? positionStatusNames.sidebar
        : positionStatusNames.noSidebar;
    state.setState({ position: s });
    if (s === positionStatusNames.sidebar) {
      insertSidebarTranscript();
      sidebarTranscriptView.updateContentHeight();
      if (w > SIDEBAR_WIDTH_BOUNDARY) {
        state.setState({ view: viewStatusNames.wideView });
        sidebarTranscriptView.updateWidth(SIGNAL.widthStatus.wideview);
      } else {
        state.setState({ view: viewStatusNames.middleView });
        sidebarTranscriptView.updateWidth(SIGNAL.widthStatus.middleview);
      }
    } else {
      insertBottomTranscript();
    }

    window.addEventListener("resize", function () {
      clearTimeout(timerQueue);
      timerQueue = setTimeout(onWindowResizeHandler, RESIZE_TIMER);
    });

    // --- ここまでで初期化前半完了 ---

    const response: iResponse = await sendMessagePromise({
      from: extensionNames.controller,
      to: extensionNames.background,
      order: [orderNames.sendSubtitles],
    });
    if (response && response.subtitles) {
      state.saveSubtitles(response.subtitles);
      // Rerender
      if (state.getState().position === positionStatusNames.sidebar) {
        sidebarTranscriptView.clear();
        sidebarTranscriptView.render(response.subtitles);
      } else {
        bottomTranscriptView.clear();
        bottomTranscriptView.render(response.subtitles);
      }
    }
  } catch (err) {
    if (err === chrome.runtime.lastError) {
      console.error(err.message);
    } else {
      console.log(err);
    }
  }
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
//         ? positionStatusNames.sidebar
//         : positionStatusNames.noSidebar;
//     state.setState({ position: s });
//     if (s === positionStatusNames.sidebar) {
//       insertSidebarTranscript();
//       sidebarTranscriptView.updateContentHeight();
//       if (w > SIDEBAR_WIDTH_BOUNDARY) {
//         state.setState({ view: viewStatusNames.wideView });
//         sidebarTranscriptView.updateWidth(SIGNAL.widthStatus.wideview);
//       } else {
//         state.setState({ view: viewStatusNames.middleView });
//         sidebarTranscriptView.updateWidth(SIGNAL.widthStatus.middleview);
//       }
//     } else {
//       insertBottomTranscript();
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
//   detectScroll();
// };


// /*
//     detectScroll()
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
// const detectScroll = (): void => {
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


/*
    initializeDetecting()
    ____________________________

    controller.jsがロードされたときに実行される初期化関数
    必ずdetectScroll()を呼び出す前に呼び出すこと

*/
// const initializeDetecting = (): void => {
//   console.log("[controller] Initialize Detecting...");
//   updateHighlightIndexes();
//   updateExTranscriptHighlight();
// };
