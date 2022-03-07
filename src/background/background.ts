/***************************************************************
 * background.ts
 * _____________________________________________________________
 *
 * As service worker and Application Layer.
 *
 *
 * chrome.runtime.onInstalled: Stateを初期化してstateへ保存する
 *  ***************************************************************/

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
import {
  sendMessageToTabsPromise,
  tabsQuery,
  exciseBelowHash,
} from "../utils/helpers";
import { iModel, modelBase, iStateModule } from "./annotations";

//
// --- GLOBALS -----------------------------------------------
//

const INTERVAL_TIME = 500;
const KEY_LOCALSTORAGE = "__key__of_local_storage_";

//
// --- Chrome API Listeners ---------------------------------
//

/***
 * chrome.runtime.onInstalled.addListener():
 * _________________________________________________
 *
 * Initialize State as iModel.
 * Always clear storage.
 * Set modelBase as initiali value.
 * */
chrome.runtime.onInstalled.addListener(
  async (details: chrome.runtime.InstalledDetails): Promise<void> => {
    console.log(`[background] onInstalled: ${details.reason}`);
    try {
      state.clearAll();
      state.set(modelBase);
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
 * - Incase 拡張機能が未展開であるけど、Udemy 講義ページである
 * then なにもしない
 *
 * - incase 拡張機能が展開されていて、同じタブで Udemy 講義ページだけど末尾の URL が変更されたとき
 * then 拡張機能をリセットして引き続き展開する
 *
 * - incase 拡張機能が展開されていて、同じタブで Udemy 講義ページ以外の URL になった時
 * then ExTranscriptは非表示にする
 *
 * - incase タブが切り替わった
 *  then 何もしない
 *
 * - incase 拡張機能が展開されていたタブが閉じられた
 *  then TODO: 拡張機能の後始末を実施する
 *
 * */
chrome.tabs.onUpdated.addListener(
  async (
    tabIdUpdatedOccured: number,
    changeInfo: chrome.tabs.TabChangeInfo,
    Tab: chrome.tabs.Tab
  ): Promise<void> => {
    // "https://www.udemy.com/course/*"以外のURLなら無視する
    const { url, tabId, isExTranscriptStructured } = await state.get();

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
        console.log("[background] Turn off extension because page reloaded");
        await state.set(modelBase);
      } else if (!changeInfo.url.match(urlPattern)) {
        // Udemy講義ページ以外に移動した
        console.log("[background] the page moved to invalid url");
        await state.set(modelBase);
      }

      // 展開中のtabIdである && changeInfo.urlが講義ページである
      // その上でURLが変化した
      // NOTE: Compare URL WITHOUT below hash.
      else if (
        changeInfo.url.match(urlPattern) &&
        exciseBelowHash(changeInfo.url) !== exciseBelowHash(url)
      ) {
        // ページが切り替わった
        // NOTE: MUST Update URL
        console.log("[background] page moved");
        await state.set({ url: exciseBelowHash(changeInfo.url) });

        // 動画ページ以外に切り替わったのか？
        const res: iResponse = await sendMessageToTabsPromise(tabId, {
          from: extensionNames.background,
          to: extensionNames.contentScript,
          order: [orderNames.isPageIncludingMovie],
        });

        // TODO: Fix Udemyで動画ページに切り替わったのに
        // 動画ページじゃない判定してくる...
        // これの対処
        // DEBUG:
        //
        console.log(res);

        res.isPageIncludingMovie
          ? // 次の動画に移った
            await handlerOfReset(tabIdUpdatedOccured)
          : // 動画を含まないページへ移った
            await handlerOfHide(tabIdUpdatedOccured);
      }
    }
  }
);

/**************
 *
 * When tab or window closed,
 * restore background script state as its initial state.
 *
 * NOTE: Of course there is no content script
 * No need to "turn off" content script.
 * */
chrome.tabs.onRemoved.addListener(
  async (
    _tabId: number,
    removeInfo: chrome.tabs.TabRemoveInfo
  ): Promise<void> => {
    try {
      const { tabId } = await state.get();
      if (_tabId !== tabId) return;
      await state.set(modelBase);
    } catch (err) {
      console.error(err);
    }
  }
);

/**
 * chrome.runtime.onMessage.addListener()
 * _________________________________________________
 *
 * */
chrome.runtime.onMessage.addListener(
  (
    message: iMessage,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: iResponse) => void
  ): boolean => {
    if (message.to !== extensionNames.background) return;
    sortMessage(message, sender, sendResponse);

    // NOTE: MUST RETURN TRUE
    // If you wanna use asynchronous function.
    return true;
  }
);

/******
 *  sort message
 * ________________________________________________
 *
 *
 * */
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
 * Handler of message from POPUP
 *______________________________________________________

 * */
const handlerOfPopupMessage = async (
  message: iMessage,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: iResponse) => void
): Promise<void> => {
  console.log("[background] Message from Popup");
  const { from, order, ...rest } = message;
  let response: iResponse = {
    from: extensionNames.background,
    to: from,
  };
  if (order && order.length) {
    // SEND STATUS
    if (order.includes(orderNames.sendStatus)) {
      try {
        const { isSubtitleCapturing, isExTranscriptStructured } =
          await state.get();
        response.state = {
          isSubtitleCapturing: isSubtitleCapturing,
          isExTranscriptStructured: isExTranscriptStructured,
        };
      } catch (err) {
        // TODO: stateが取得できなかったときの挙動
      } finally {
        response.complete = true;
        sendResponse(response);
      }
    }

    // RUN
    if (order.includes(orderNames.run)) {
      console.log("[background] RUN");
      try {
        const r: boolean = await handlerOfRun(rest.tabInfo);
        response.success = r ? true : false;
      } catch (err) {
        // TODO: RUNが失敗したときの挙動
        //
        // Errorの種類による
      } finally {
        response.complete = true;
        sendResponse(response);
      }
    }

    // POPUP上のOFF操作による拡張機能のOFF命令
    if (order.includes(orderNames.turnOff)) {
      console.log("[background] TURN OFF ordered.");
      try {
        const { tabId } = await state.get();
        await turnOffEachContentScripts(tabId);
        const {
          isContentScriptInjected,
          isCaptureSubtitleInjected,
          isControllerInjected,
        } = await state.get();
        // content scriptのinject状況だけ反映させてstateを初期値に戻す
        await state.set({
          ...modelBase,
          isContentScriptInjected: isContentScriptInjected,
          isCaptureSubtitleInjected: isCaptureSubtitleInjected,
          isControllerInjected: isControllerInjected,
        });
        response.success = true;
      } catch (err) {
        // TODO: TURN OFFで例外が発生したときの挙動
        response.success = false;
      } finally {
        response.complete = true;
        sendResponse(response);
      }
    }
  }
};

/******
 * Handler of message from contentScrip.js
 * ________________________________________________________
 *
 * */
const handlerOfContentScriptMessage = async (
  message: iMessage,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: iResponse) => void
): Promise<void> => {
  console.log("[background] Message from contentScript.js");
  const { from, order, ...rest } = message;
  let response: iResponse = {
    from: extensionNames.background,
    to: from,
  };
  const { isExTranscriptStructured, isTranscriptDisplaying, isEnglish, tabId } =
    await state.get();

  if (order && order.length) {
  }

  // ExTRanscriptを表示する条件が揃わなくなったとき...
  if (!rest.isTranscriptDisplaying || !rest.language) {
    try {
      // ExTranscriptを非表示にするかする
      // もしもトランスクリプトが表示中であったならば
      if (isExTranscriptStructured && isTranscriptDisplaying) {
        console.log("[background] Hide ExTranscript...");
        await handlerOfHide(tabId);
      }
      // あとはStateを更新するだけ
      let s = {};
      if (rest.isTranscriptDisplaying !== undefined) {
        s["isTranscriptDisplaying"] = rest.isTranscriptDisplaying;
      }
      if (rest.language !== undefined) {
        s["isEnglish"] = rest.language;
      }

      await state.set(s);
    } catch (err) {
      // TODO: Hide処理中に例外が発生したときの挙動
    } finally {
      response.complete = true;
      sendResponse(response);
    }
  }

  // トランスクリプトが再表示されたとき...
  if (rest.isTranscriptDisplaying) {
    // ExTranscriptが非表示だったならば再表示させる
    if (isExTranscriptStructured && !isTranscriptDisplaying) {
      try {
        await handlerOfReset(tabId);
        await state.set({ isTranscriptDisplaying: true });
      } catch (err) {
        // TODO: Reset処理中に例外が発生したときの挙動
      } finally {
        response.complete = true;
        sendResponse(response);
      }
    }
  }

  // 字幕が英語を選択されたとき...
  if (rest.language) {
    // ExTranscriptが非表示だったならば再表示させる
    if (isExTranscriptStructured && !isEnglish) {
      try {
        await handlerOfReset(tabId);
        await state.set({
          isTranscriptDisplaying: true,
          isEnglish: true,
        });
      } catch (err) {
        // TODO: Reset処理中に例外が発生したときの挙動
      } finally {
        response.complete = true;
        sendResponse(response);
      }
    }
  }
};

/**
 * Handler of message from captureSubtitle.js
 *______________________________________________________
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
 *  Handler of message from controller.js
 *______________________________________________________
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
 * handler of RUN order.
 * _______________________________________________
 *
 * 
 * */
const handlerOfRun = async (tabInfo: chrome.tabs.Tab): Promise<boolean> => {
  try {
    const { url, id } = tabInfo;
    const {
      isContentScriptInjected,
      isCaptureSubtitleInjected,
      isControllerInjected,
    } = await state.get();

    // Save valid url and current tab that extension popup opened.
    await state.set({
      url: exciseBelowHash(url),
      tabId: id,
      tabInfo: tabInfo,
    });

    //<phase 2> inject contentScript.js
    const { tabId } = await state.get();
    if (!isContentScriptInjected) {
      await chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ["contentScript.js"],
      });
      await state.set({ isContentScriptInjected: true });
    } else {
      const r: iResponse = await sendMessageToTabsPromise(tabId, {
        from: extensionNames.background,
        to: extensionNames.contentScript,
        order: [orderNames.reset],
      });
    }

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
    await state.set({
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
    if (!isCaptureSubtitleInjected) {
      await chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ["captureSubtitle.js"],
      });
      await state.set({ isCaptureSubtitleInjected: true });
    }

    // 字幕取得できるまで10回は繰り返す関数で取得する
    const subtitles: subtitle_piece[] = await repeatCaptureSubtitles(tabId);

    await state.set({ subtitles: subtitles });

    // <phase 4> inject controller.js
    if (!isControllerInjected) {
      await chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ["controller.js"],
      });
      await state.set({ isControllerInjected: true });
    } else {
      const r: iResponse = await sendMessageToTabsPromise(tabId, {
        from: extensionNames.background,
        to: extensionNames.controller,
        order: [orderNames.reset],
      });
      // TODO: FIX successの値ではなくて例外スローを受け取ること
      if (!r.success)
        throw new Error(`Error: Failed to reset controller.${r.failureReason}`);
    }

    const s: iModel = await state.get();
    await sendMessageToTabsPromise(tabId, {
      from: extensionNames.background,
      to: extensionNames.controller,
      subtitles: s.subtitles,
    });

    await state.set({ isExTranscriptStructured: true });
    return true;
  } catch (err) {
    console.error(err.message);
    // TODO: Errorの種類を確認して必要に応じて再スロー
    throw err;
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
const handlerOfReset = async (tabId: number): Promise<void> => {
  try {
    console.log("[background] RESET Begin...");
    // stateの更新：
    await state.set({
      isTranscriptDisplaying: false,
      isSubtitleCaptured: false,
      isSubtitleCapturing: true,
      subtitles: [],
    });

    // reset 処理: 各content scritpのリセットを実施する
    await resetEachContentScript(tabId);

    // 成功したとして、
    // データ再取得処理
    const newSubtitles: subtitle_piece[] = await repeatCaptureSubtitles(tabId);

    if (!newSubtitles.length)
      throw new Error("Error: Failed to capture subtitles");

    // If okay, then save subtitles data.
    await state.set({
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

    await state.set({
      isTranscriptDisplaying: true,
    });

    // ここまで何も問題なければRESET成功
    console.log("[background] RESET Complete!");
  } catch (err) {
    console.error(err.message);
  }
};

/******
 * handler of hide ExTranscript
 * ____________________________________________________________
 *
 * NOTE: これは拡張機能をOFFにするハンドラではない
 * 実際には隠すのではなくて、ExTranscriptを消す処理を実行する
 *
 * 発動条件：
 * - 本家トランスクリプトが非表示になった
 * - 英語字幕以外の字幕を選択されてしまった
 *
 *
 * */
const handlerOfHide = async (tabId: number): Promise<void> => {
  try {
    console.log("[background] handlerOfHide hides ExTranscript...");
    // stateの更新：
    await state.set({
      isTranscriptDisplaying: false,
      isSubtitleCaptured: false,
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

    const contentScript = sendMessageToTabsPromise(tabId, {
      from: extensionNames.background,
      to: extensionNames.contentScript,
      order: [orderNames.reset],
    });

    const controller = sendMessageToTabsPromise(tabId, {
      from: extensionNames.background,
      to: extensionNames.controller,
      order: [orderNames.reset],
    });

    const r: iResponse[] = await Promise.all([contentScript, controller]);

    const failureReasons: string = r
      .filter((_) => {
        if (!_.success) {
          return _.failureReason;
        }
      })
      .join(" ");

    if (failureReasons) {
      throw new Error(
        `Error: failed to reset content script. ${failureReasons}`
      );
    }

    console.log("[background] DONE resetEachContentScript()");
  } catch (err) {
    console.error(err.message);
  }
};

/**********
 *
 * 各content scriptを拡張機能OFFに合わせ初期化する
 *
 * */
const turnOffEachContentScripts = async (tabId: number): Promise<void> => {
  try {
    console.log("[background] Turning off each content scripts");

    const contentScript = sendMessageToTabsPromise(tabId, {
      from: extensionNames.background,
      to: extensionNames.contentScript,
      order: [orderNames.turnOff],
    });

    const controller = sendMessageToTabsPromise(tabId, {
      from: extensionNames.background,
      to: extensionNames.controller,
      order: [orderNames.turnOff],
    });

    const r: iResponse[] = await Promise.all([contentScript, controller]);

    const failureReasons: string = r
      .filter((_) => {
        if (!_.success) {
          return _.failureReason;
        }
      })
      .join(" ");

    if (failureReasons) {
      throw new Error(
        `Error: failed to turn off content script. ${failureReasons}`
      );
    }

    console.log("[background] Done turning off each content scripts");
  } catch (err) {
    console.error(err.message);
  }
};

//
// --- Other Methods ----------------------------------------
//

/***
 *  Repeat to capture subtitles
 * ______________________________________________________________
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
        // Failed
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
        // Succeed
        console.log("[repeatCaptureSubtitles] Succeed to capture!");
        clearInterval(intervalId);
        resolve(r.subtitles);
      } else counter++;
    }, INTERVAL_TIME);
  });
};

/*****
 * state module
 * _________________________________________________________________
 *
 * UPDATED: 2/17
 * This module never holds variables.
 * No matter background script unloaded or reloaded,
 * state never lose saved varibales.
 * */
const state: iStateModule<iModel> = (function () {
  const _getLocalStorage = async function (key): Promise<iModel> {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(key, (s: iModel): void => {
        if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
        resolve(s);
      });
    });
  };

  return {
    // 本来ローカルストレージに保存しておくデータの一部だけでも
    // 保存することを可能とする
    //
    set: async (prop: {
      [Property in keyof iModel]?: iModel[Property];
    }): Promise<void> => {
      try {
        const s: iModel = await _getLocalStorage(KEY_LOCALSTORAGE);
        const newState = {
          ...s[KEY_LOCALSTORAGE],
          ...prop,
        };
        await chrome.storage.local.set({
          [KEY_LOCALSTORAGE]: newState,
        });
      } catch (err) {
        console.error(err.message);
      }
    },

    get: async (): Promise<iModel> => {
      try {
        const s: iModel = await _getLocalStorage(KEY_LOCALSTORAGE);
        return { ...s[KEY_LOCALSTORAGE] };
      } catch (err) {
        console.error(err.message);
      }
    },

    clearAll: async (): Promise<void> => {
      try {
        await chrome.storage.local.remove(KEY_LOCALSTORAGE);
      } catch (err) {
        console.error(err.message);
      }
    },
  };
})();

//
// --- LEGACY ----------------------------
//

/*
//     state module
//     ______________________________________________
//     service workerなので、Stateを常に参照できるようにしておくため
//     モジュール化したState

//     Stateのインスタンスはここへカプセル化され、
//     getInstance()を通して参照が渡される

//     検証してみた結果、アンロード、ロードに耐えうる模様
// */
// export const state: iStateModule<iModel> = (function () {
//   let _instance: State<iModel> = null;

//   return {
//     register: (m: State<iModel>): void => {
//       _instance = m;
//     },
//     // unregisterする場面では、もはやStateは要らないから
//     // Stateを削除しちゃってもいいと思う
//     unregister: (): void => {
//       _instance = null;
//     },
//     getInstance: (): State<iModel> => {
//       return _instance;
//     },
//   };
// })();

// /*****
//  * Verify given url or current tab url
//  * ________________________________________________________
//  *
//  * */
// const handlerOfVerifyValidPage = async (_url?: string): Promise<boolean> => {
//   try {
//     let url: string = "";
//     if (_url === undefined) {
//       const tab: chrome.tabs.Tab = await tabsQuery();
//       url = tab.url;
//     } else url = _url;
//     const result: RegExpMatchArray = url.match(urlPattern);
//     return result && result.length ? true : false;
//   } catch (err) {
//     console.error(err.message);
//   }
// };
