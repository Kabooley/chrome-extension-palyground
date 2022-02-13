/***************************************************************
 * background.ts
 * _____________________________________________________________
 *
 * As service worker and Application Layer.
 *
 *
 * chrome.runtime.onInstalled: Stateを初期化してstateへ保存する
 *  ***************************************************************/
/**
 * 検証：
 * グローバルモジュールのmodelは、service workerがアンロードされたあとでも
 * 自身のinstanceを保持しているのか？
 *
 * 結果：
 * ぜんぜんアンロードされない
 * 10分くらい放っておいても問題ない...
 *
 * ということで雑だけれどservice workerでもわりとアンロードされないから
 * グローバル・モジュールに値を保持させるのはアリとする
 *
 *
 * TODO:
 *
 *
 * */

import {
  _key_of_model_state__,
  urlPattern,
  extensionStatus,
  orderNames,
  extensionsTypes,
  extensionNames,
  iMessage,
  subtitle_piece,
  iResponse,
} from "../utils/constants";
import { sendMessageToTabsPromise, tabsQuery } from "../utils/helpers";
import State from "../utils/background/State";
import { iModel, modelBase, iStateModule } from "./annotations";

//
// --- GLOBALS -----------------------------------------------
//
const INTERVAL_TIME = 1000;

//
// --- Chrome API Listeners ---------------------------------
//

/***
 * chrome.runtime.onInstalled.addListener():
 *
 * Initialize State as iModel.
 * Always clear storage.
 * Set modelBase as initiali value.
 * */
chrome.runtime.onInstalled.addListener(
  async (details: chrome.runtime.InstalledDetails): Promise<void> => {
    console.log(`[background] onInstalled: ${details.reason}`);
    try {
      state.unregister();
      await state.register(new State<iModel>(_key_of_model_state__));
      await state.getInstance().clearStorage();
      await state.getInstance().setState(modelBase);
    } catch (err) {
      console.error(err.message);
    }
  }
);

/**
 * chrome.tabs.onUpdated.addListener()
 * ______________________________________________
 *
 * 機能：
 * URLが変更されたかどうかを検知する機能を実装する
 *
 * chrome.tabs.onUpdatedはすべてのタブにおけるイベントを検知する
 * なので関係ないタブに関することは無視する機能を実装する必要がある
 *
 * ブラウザの挙動に対してonUpdatedが反応したときの振舞に関して：
 *
 * - 拡張機能が未展開であるけど、Udemy 講義ページである
 * なにもしない
 *
 * - 拡張機能が展開されていて、同じタブで Udemy 講義ページだけど末尾の URL が変更されたとき
 * 拡張機能をリセットして引き続き展開する
 *
 * - 拡張機能が展開されていて、同じタブで Udemy 講義ページ以外の URL になった時
 * 拡張機能は OFF にする
 *
 * - タブが切り替わった
 *  何もしない
 *
 * - 拡張機能が展開されていたタブが閉じられた
 *  拡張機能を OFF にする
 *
 * */
chrome.tabs.onUpdated.addListener(
  async (
    tabIdUpdatedOccured: number,
    changeInfo: chrome.tabs.TabChangeInfo,
    Tab: chrome.tabs.Tab
  ): Promise<void> => {
    console.log(changeInfo);
    // "https://www.udemy.com/course/*"以外のURLなら無視する
    const _state: State<iModel> = state.getInstance();
    const { url, tabId, isExTranscriptStructured } = await _state.getState();

    // 拡張機能が未展開、changeInfo.statusがloadingでないなら無視する
    if (changeInfo.status !== "loading" || !isExTranscriptStructured) return;

    // 拡張機能が展開済だとして、tabIdが展開済のtabId以外に切り替わったなら無視する
    // return;
    if (tabIdUpdatedOccured !== tabId) return;

    // 展開中のtabId && chnageInfo.urlがUdemy講義ページ以外のURLならば
    // 拡張機能OFFの処理へ
    if (isExTranscriptStructured && tabIdUpdatedOccured === tabId) {
      // おなじURLでのリロードか？
      if (changeInfo.url === undefined) {
        // 拡張機能は何もしない
        return;
      } else if (!changeInfo.url.match(urlPattern)) {
        // Udemy講義ページ以外に移動した
        // 拡張機能OFF処理へ
        // TODO: 拡張機能OFF処理の実装

        console.log("[background] OFF this extension");
      }

      // 展開中のtabIdである && changeInfo.urlが講義ページだけど末尾が変化した(#以下は無視)
      // 動画が切り替わった判定
      else if (changeInfo.url.match(urlPattern) && changeInfo.url !== url) {
        // 動画が切り替わった
        // TODO: リセット処理へ
        console.log("[background] RESET this extension");
        await handlerOfReset(tabIdUpdatedOccured, changeInfo.url);
      }
    }
  }
);

/**
 *
 *
 * */
chrome.runtime.onMessage.addListener(
  (
    message: iMessage,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: iResponse) => void
  ) => {
    if (message.to !== extensionNames.background) return;
    sortMessage(message, sender, sendResponse);

    // NOTE: MUST RETURN TRUE
    // If you wanna use asynchronous function.
    return true;
  }
);

const sortMessage = (
  message: iMessage,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: iResponse) => void
): void => {
  switch (message.from) {
    case extensionNames.popup:
      handlerOfPopupMessage(message, sender, sendResponse);
      break;
    case extensionNames.contentScript:
      handlerOfContentScriptMessage(message, sender, sendResponse);
      break;
    case extensionNames.captureSubtitle:
      handlerOfCaptureSubtitleMessage(message, sender, sendResponse);
      break;
    case extensionNames.controller:
      handlerOfControllerMessage(message, sender, sendResponse);
      break;
  }
};

//
// --- Message Handlers ----------------------------------------
//

/**
 *
 *
 * */
const handlerOfPopupMessage = async (
  message: iMessage,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: iResponse) => void
): Promise<void> => {
  console.log("[background] Message from Popup");
  try {
    const { order, ...rest } = message;
    if (order && order.length) {
      // DEBUG: make sure what message got
      console.log("[background] Validate URL");
      //
      // popupが開かれるたびに呼び出される処理
      //
      // なのでurlが正しいかだけを返信する
      // Stateを変更しない
      if (order.includes(orderNames.inquireUrl)) {
        const isValidPage: boolean = await handlerOfVerifyValidPage();
        sendResponse({ correctUrl: isValidPage, complete: true });
      }

      // 拡張機能の実行命令
      if (order.includes(orderNames.run)) {
        // DEBUG: make sure what message got
        console.log("[background] RUN");
        //
        const isSuccess: boolean = await handlerOfRun();
        // sendResponse({ successDeployment: isSuccess, complete: true });
        if (!isSuccess) {
          // ここでエラーを出すのか
          // handlerOfRunでエラーを出すのか
          // 未定
          sendResponse({ complete: true, success: false });
        } else {
          sendResponse({ complete: true, success: true });
        }
      }
    }
  } catch (err) {
    console.error(err.message);
  }
};

/**
 *
 *
 * */
const handlerOfContentScriptMessage = async (
  message: iMessage,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: iResponse) => void
): Promise<void> => {
  console.log("[background] Message from contentScript.js");
  try {
    const { order, ...rest } = message;
    const _state: State<iModel> = state.getInstance();
    const {
      isExTranscriptStructured,
      isTranscriptDisplaying,
      isEnglish,
      tabId,
    } = await _state.getState();

    if (order && order.length) {
    }

    // ExTRanscriptを表示する条件が揃わなくなったとき...
    if (!rest.isTranscriptDisplaying || !rest.language) {
      // ExTranscriptを非表示にするかする
      // もしもトランスクリプトが表示中であったならば
      if (isExTranscriptStructured && isTranscriptDisplaying) {
        console.log("[background] Hide ExTranscript...");
        await handlerOfHide(tabId);
      }
      // Stateを更新する
      let s = {};
      if (rest.isTranscriptDisplaying !== undefined) {
        s["isTranscriptDisplaying"] = rest.isTranscriptDisplaying;
      }
      if (rest.language !== undefined) {
        s["isEnglish"] = rest.language;
      }
      await _state.setState(s);
      sendResponse({ complete: true });
    }

    // トランスクリプトが再表示されたとき...
    if (rest.isTranscriptDisplaying) {
      // ExTranscriptが非表示だったならば再表示させる
      if (isExTranscriptStructured && !isTranscriptDisplaying) {
        // 非表示だった状態から
        // 表示させる処理
        await handlerOfReset(tabId);
        await _state.setState({ isTranscriptDisplaying: true });
        sendResponse({ complete: true });
      }
    }

    // 字幕が英語を選択されたとき...
    if (rest.language) {
      // ExTranscriptが非表示だったならば再表示させる
      if (isExTranscriptStructured && !isEnglish) {
        // 非表示だった状態から
        // 表示させる処理
        await handlerOfReset(tabId);
        await _state.setState({
          isTranscriptDisplaying: true,
          isEnglish: true,
        });
        sendResponse({ complete: true });
      }
    }
  } catch (err) {
    console.error(err.message);
  }
};

/**
 *
 *
 * */
const handlerOfCaptureSubtitleMessage = async (
  message: iMessage,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: iResponse) => void
): Promise<void> => {
  try {
  } catch (err) {
    console.error(err.message);
  }
};

/**
 *
 *
 * */
const handlerOfControllerMessage = async (
  message: iMessage,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: iResponse) => void
): Promise<void> => {
  try {
  } catch (err) {
    console.error(err.message);
  }
};

//
// --- Order Handlers -------------------------------------------
//

/**
 *
 *
 * */
const handlerOfVerifyValidPage = async (_url?: string): Promise<boolean> => {
  try {
    let url: string = "";
    if (_url === undefined) {
      const tab: chrome.tabs.Tab = await tabsQuery();
      url = tab.url;
    } else url = _url;
    const result: RegExpMatchArray = url.match(urlPattern);
    return result && result.length ? true : false;
  } catch (err) {
    console.error(err.message);
  }
};

/**
 * handler of RUN order.
 * _______________________________________________
 *
 * TODO:
 * - 処理中の失敗を段階ごとに理由と一緒に返せるようにしたい
 *  失敗理由によってはエラーじゃない場合もある
 *  あと各段階でおこるエラースローは各段階のcatchへキャッチさせたほうがいいのかな？
 *
 *
 * - injectしたコンテントスクリプトからのinject成功信号を受信したら、こっちに処理が戻ってくるようにしたい
 *  いまのワイの腕では無理
 *
 * - controller.jsへの字幕データの渡し方を変更したい
 *
 *
 * 例：
 * contentScriptのステータスを確認してみたら、字幕が英語じゃなかった
 * ならば「英語字幕じゃなかったからキャンセルしたよ」をpopupへ送信できる
 * */
const handlerOfRun = async (): Promise<boolean> => {
  try {
    const _state: State<iModel> = state.getInstance();
    const tabs: chrome.tabs.Tab = await tabsQuery();
    const { url, id } = tabs;
    // <phase 1> is URL correct?
    // 拡張機能を展開するurlとtabIdを保存するため
    if (!handlerOfVerifyValidPage(url)) {
      // TODO: 失敗またはキャンセルの方法未定義...
      // ひとまずfalseを返している
      return false;
    }
    // Save valid url and current tab that extension popup opened.
    await _state.setState({ url: url, tabId: id });

    //<phase 2> inject contentScript.js
    const { tabId } = await _state.getState();
    await chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["contentScript.js"],
    });
    await _state.setState({ isContentScriptInjected: true });

    // TODO: ここでcontentScript.jsが展開完了したのを確認したうえで次に行きたいのだが...実装する技術がない...
    const { language, isTranscriptDisplaying } = await sendMessageToTabsPromise(
      tabId,
      {
        from: extensionNames.background,
        to: extensionNames.contentScript,
        order: [orderNames.sendStatus],
      }
    );
    // 結果がどうあれ現状の状態を保存する
    await _state.setState({
      isEnglish: language,
      isTranscriptDisplaying: isTranscriptDisplaying,
    });
    // 字幕が英語じゃない、またはトランスクリプトがONでないならば
    // キャンセル
    if (!language || !isTranscriptDisplaying) {
      // TODO: 失敗またはキャンセルの方法未定義...
      // ひとまずfalseを返している
      return false;
    }

    // <phase 3> inject captureSubtitle.js
    // 字幕データを取得する
    await chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["captureSubtitle.js"],
    });
    await _state.setState({ isCaptureSubtitleInjected: true });

    // TODO: ここでcontent scriptが展開完了したのを確認したうえで次に行きたいのだが...

    const { subtitles } = await sendMessageToTabsPromise(tabId, {
      from: extensionNames.background,
      to: extensionNames.captureSubtitle,
      order: [orderNames.sendSubtitles],
    });

    // TODO: subtitlesのデータがおかしくないか検査したい
    // 条件分岐で検査に合格したら字幕データを保存
    // 不合格でエラー
    await _state.setState({ subtitles: subtitles });

    // <phase 4> inject controller.js
    await chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["controller.js"],
    });
    await _state.setState({ isControllerInjected: true });

    // const { success } = await sendMessageToTabsPromise(tabId, {
    //     from: extensionNames.background,
    //     to: extensionNames.controller,
    //     order: [orderNames.sendStatus],
    // });
    // // TODO: 字幕データの渡し方が未定義
    // // 今のところ、controller側から要求して渡している
    // // これをこちらから渡すようにしたい...
    // if (!success) {
    //     // TODO: 失敗またはキャンセルの方法未定義...
    //     // ひとまずfalseを返している
    //     return false;
    // }
    const s: iModel = await _state.getState();
    await sendMessageToTabsPromise(tabId, {
      from: extensionNames.background,
      to: extensionNames.controller,
      subtitles: s.subtitles,
    });

    await _state.setState({ isExTranscriptStructured: true });
    // ...ここまででエラーがなければ成功
    return true;
  } catch (err) {
    console.error(err.message);
  }
};

/**
 * handler of RESET
 * ________________________________________________
 *
 * ExTranscriptを再生成する
 * 本家トランスくリプトが表示されているかどうか、
 * 字幕が英語かどうかはこの関数内でチェックしない
 *
 * 処理内容：
 *
 * - 各 content scriptのリセット：
 * content scriptはinjectされたまま（というか除去する手段はない）
 * なのでcontent scriptの状態を変化させないといかん
 * contentScript.js リセット不要
 * captureSubtitle.js 要リセット
 * controller.js 要リセット
 *
 * - captureSubtitle.jsから字幕データを取得する
 *
 * - controller.jsへ字幕データを渡す
 *
 * */
const handlerOfReset = async (
  tabId: number,
  newUrl?: string
): Promise<void> => {
  try {
    console.log("[background] RESET Begin...");
    const _state: State<iModel> = state.getInstance();
    const { url } = await _state.getState();
    // stateの更新：
    // urlをtabs.onUpdatedが起こったときのURLにする
    await _state.setState({
      url: newUrl === undefined ? url : newUrl,
      isTranscriptDisplaying: false,
      isSubtitleCaptured: false,
      isSubtitleCapturing: true,
      // TODO: 既存配列変数を再度空にするのはこの方法で大丈夫なのか?
      //
      subtitles: [],
    });
    // reset 処理: 各content scritpのリセットを実施する
    await resetEachContentScript(tabId);
    // 成功したとして、
    // データ再取得処理
    //
    // TODO: 字幕データがUdemyのページでロード完了されるまで時間を置く
    //
    // ロード完了を検知する仕組みはないので
    // 無辺ループで長さが1以上の配列を取得できるまで取得を繰り返すか
    // 予め決めた時間で取得させるか...
    // const resFromCaptureSubtitle: iResponse =
    //     await sendMessageToTabsPromise(tabId, {
    //         from: extensionNames.background,
    //         to: extensionNames.captureSubtitle,
    //         order: [orderNames.sendSubtitles],
    //     });

    // console.log(resFromCaptureSubtitle.subtitles);

    const newSubtitles: subtitle_piece[] = await repeatCaptureSubtitles(tabId);

    if (!newSubtitles.length)
      throw new Error("Error: Failed to capture subtitles");

    // If okay, then save subtitles data.
    await _state.setState({
      isSubtitleCaptured: true,
      isSubtitleCapturing: false,
      subtitles: newSubtitles,
    });

    // NOTE: 一旦resetオーダーを出してから字幕を送ること
    const resetOrder: iResponse = await sendMessageToTabsPromise(tabId, {
      from: extensionNames.background,
      to: extensionNames.controller,
      order: [orderNames.reset],
    });

    const resetSubtitle: iResponse = await sendMessageToTabsPromise(tabId, {
      from: extensionNames.background,
      to: extensionNames.controller,
      subtitles: newSubtitles,
    });

    if (!resetOrder.success || !resetSubtitle) {
      throw new Error(
        `Error: Failed to reset controller. ${
          resetOrder.success
            ? ""
            : resetOrder.failureReason + resetSubtitle.success
            ? ""
            : resetSubtitle.failureReason
        } `
      );
    }

    await _state.setState({
      isTranscriptDisplaying: true,
    });

    // ここまで何も問題なければRESET成功
    console.log("[background] RESET Complete!");
  } catch (err) {
    console.error(err.message);
  }
};

/**
 * handler of hide ExTranscript
 * ________________________________________
 *
 * 実際には隠すのではなくて、ExTranscriptを消す
 *
 * 発動条件：
 *
 * - 本家トランスクリプトが非表示になった
 * - 英語字幕以外の字幕を選択されてしまった
 *
 *
 * */
const handlerOfHide = async (tabId: number): Promise<void> => {
  try {
    console.log("[background] handlerOfHide hides ExTranscript...");
    const _state: State<iModel> = state.getInstance();
    // stateの更新：
    await _state.setState({
      isTranscriptDisplaying: false,
      isSubtitleCaptured: false,
      // TODO: <確認>既存配列変数を再度空にするのはこの方法で大丈夫なのか?
      subtitles: [],
    });
    // reset 処理: 各content scritpのリセットを実施する
    const r: iResponse = await sendMessageToTabsPromise(tabId, {
      from: extensionNames.background,
      to: extensionNames.controller,
      order: [orderNames.turnOff],
    });
    if (!r.success) {
      throw new Error("Failed to hide ExTranscript");
    }
  } catch (err) {
    console.error(err.message);
  }
};

/**
 *
 * 
 * */
const resetEachContentScript = async (tabId: number): Promise<void> => {
  try {
    console.log("[background] BEGIN resetEachContentScript()");

    // TODO: contentScript.jsへメッセージ送信するとruntime.lastErrorが発生する問題の解決
    // controller.jsに対しても同じ処理を行っているのに問題ないのになぜかcontentScriptでは起こる不思議...
    //
    // const contentScript: iResponse = await sendMessageToTabsPromise(tabId, {
    //   from: extensionNames.background,
    //   to: extensionNames.contentScript,
    //   order: [orderNames.reset],
    // });

    // console.log(contentScript);

    // NOTE: 一時的な措置として返信非必須のなまAPIつかう
    chrome.tabs.sendMessage(
      tabId,
      {
        from: extensionNames.background,
        to: extensionNames.contentScript,
        order: [orderNames.reset],
      }
    );

    const controller: iResponse = await sendMessageToTabsPromise(tabId, {
      from: extensionNames.background,
      to: extensionNames.controller,
      order: [orderNames.reset],
    });

    console.log(controller);

    // if (!contentScript.success || !controller.success) {
    //   throw new Error(
    //     `Error: Failed to reset content script. ${
    //       contentScript.failureReason !== undefined
    //         ? contentScript.failureReason
    //         : ""
    //     } ${
    //       controller.failureReason !== undefined
    //         ? contentScript.failureReason
    //         : ""
    //     }`
    //   );
    // }
    if (!controller.success)
      throw new Error(
        `Error: failed to reset controller.js. ${controller.failureReason}`
      );

    console.log("[background] DONE resetEachContentScript()");
  } catch (err) {
    console.error(err.message);
  }
};

//
// --- Other Methods ----------------------------------------
//

/***
 *  Repeat to capture subtitles
 *
 *  Repeats 10 times so far.
 * */
const repeatCaptureSubtitles = async function (
  tabId: number
): Promise<subtitle_piece[]> {
  return new Promise(async (resolve, reject): Promise<void> => {
    let intervalId: NodeJS.Timer;
    let counter: number = 0;

    console.log("[repeatCaptureSubtitles]Begin to capture subtitles... ");

    intervalId = setInterval(async function () {
      if (counter >= 10) {
        // Failed to capture subtitles

        console.log("[repeatCaptureSubtitles] Time out! It's over 10 times");

        clearInterval(intervalId);
        reject([]);
      }

      console.log("[repeatCaptureSubtitles] capture again...");
      const r: iResponse = await sendMessageToTabsPromise(tabId, {
        from: extensionNames.background,
        to: extensionNames.captureSubtitle,
        order: [orderNames.sendSubtitles],
      });
      if (r.subtitles !== undefined && r.subtitles.length) {
        // Succeed to capture subtitles
        console.log("[repeatCaptureSubtitles] Succeed to capture!");
        clearInterval(intervalId);
        resolve(r.subtitles);
      } else counter++;
    }, INTERVAL_TIME);
  });
};

/*
    state module
    ______________________________________________
    service workerなので、Stateを常に参照できるようにしておくため
    モジュール化したState

    Stateのインスタンスはここへカプセル化され、
    getInstance()を通して参照が渡される

    検証してみた結果、アンロード、ロードに耐えうる模様
*/
export const state: iStateModule<iModel> = (function () {
  let _instance: State<iModel> = null;

  return {
    register: (m: State<iModel>): void => {
      _instance = m;
    },
    // unregisterする場面では、もはやStateは要らないから
    // Stateを削除しちゃってもいいと思う
    unregister: (): void => {
      _instance = null;
    },
    getInstance: (): State<iModel> => {
      return _instance;
    },
  };
})();

//
// --- LEGACY ----------------------------
//
