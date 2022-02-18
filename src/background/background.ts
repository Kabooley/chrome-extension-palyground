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
} from '../utils/constants';
import { sendMessageToTabsPromise, tabsQuery, exciseBelowHash } from '../utils/helpers';
import { iModel, modelBase, iStateModule } from './annotations';
// import State from '../utils/background/State';

//
// --- GLOBALS -----------------------------------------------
//

const INTERVAL_TIME = 500;
const KEY_LOCALSTORAGE = '__key__of_local_storage_';

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
        console.log(changeInfo);
        // "https://www.udemy.com/course/*"以外のURLなら無視する
        const { url, tabId, isExTranscriptStructured } = await state.get();

        // 拡張機能が未展開、changeInfo.statusがloadingでないなら無視する
        if (changeInfo.status !== 'loading' || !isExTranscriptStructured)
            return;

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

                console.log('[background] TURN OFF this extension');
            }

            // 展開中のtabIdである && changeInfo.urlが講義ページである
            // その上でURLが変化した
            // NOTE: url比較の時にurlの#以下を比較対象としないようにしている
            else if (
                changeInfo.url.match(urlPattern) &&
                exciseBelowHash(changeInfo.url) !== exciseBelowHash(url)
            ) {
                // 動画が切り替わった
                await handlerOfReset(tabIdUpdatedOccured, changeInfo.url);
            }
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
    ) => {
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
    console.log('[background] Message from Popup');
    try {
        const { order, ...rest } = message;
        if (order && order.length) {
            // Popupが開かれるたびにURLが正しいか判定する
            if (order.includes(orderNames.inquireUrl)) {
                console.log('[background] Validate URL');
                const isValidPage: boolean = await handlerOfVerifyValidPage();
                sendResponse({ correctUrl: isValidPage, complete: true });
            }

            // 拡張機能の実行命令
            if (order.includes(orderNames.run)) {
                console.log('[background] RUN');
                const isSuccess: boolean = await handlerOfRun();
                if (!isSuccess) {
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
    console.log('[background] Message from contentScript.js');
    try {
        const { order, ...rest } = message;
        const {
            isExTranscriptStructured,
            isTranscriptDisplaying,
            isEnglish,
            tabId,
        } = await state.get();

        if (order && order.length) {
        }

        // ExTRanscriptを表示する条件が揃わなくなったとき...
        if (!rest.isTranscriptDisplaying || !rest.language) {
            // ExTranscriptを非表示にするかする
            // もしもトランスクリプトが表示中であったならば
            if (isExTranscriptStructured && isTranscriptDisplaying) {
                console.log('[background] Hide ExTranscript...');
                await handlerOfHide(tabId);
            }
            // あとはStateを更新するだけ
            let s = {};
            if (rest.isTranscriptDisplaying !== undefined) {
                s['isTranscriptDisplaying'] = rest.isTranscriptDisplaying;
            }
            if (rest.language !== undefined) {
                s['isEnglish'] = rest.language;
            }

            await state.set(s);
            sendResponse({ complete: true });
        }

        // トランスクリプトが再表示されたとき...
        if (rest.isTranscriptDisplaying) {
            // ExTranscriptが非表示だったならば再表示させる
            if (isExTranscriptStructured && !isTranscriptDisplaying) {
                // 非表示だった状態から
                // 表示させる処理
                await handlerOfReset(tabId);
                await state.set({ isTranscriptDisplaying: true });
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
                await state.set({
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

/*****
 * Verify given url or current tab url
 * ________________________________________________________
 *
 * */
const handlerOfVerifyValidPage = async (_url?: string): Promise<boolean> => {
    try {
        let url: string = '';
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
 * TODO: エラーハンドリングの改善
 * - 処理中の失敗を段階ごとに理由と一緒に返せるようにしたい
 *  失敗理由によってはエラーじゃない場合もある
 *
 * - injectしたコンテントスクリプトからのinject成功信号を受信したら、こっちに処理が戻ってくるようにしたい
 *
 *
 * 例：
 * contentScriptのステータスを確認してみたら、字幕が英語じゃなかった
 * ならば「英語字幕じゃなかったからキャンセルしたよ」をpopupへ送信できる
 * */
const handlerOfRun = async (): Promise<boolean> => {
    try {
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
        await state.set({ url: exciseBelowHash(url), tabId: id });

        //<phase 2> inject contentScript.js
        const { tabId } = await state.get();
        await chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['contentScript.js'],
        });
        await state.set({ isContentScriptInjected: true });

        // TODO: ここでcontentScript.jsが展開完了したのを確認したうえで次に行きたいのだが...実装する技術がない...
        const { language, isTranscriptDisplaying } =
            await sendMessageToTabsPromise(tabId, {
                from: extensionNames.background,
                to: extensionNames.contentScript,
                order: [orderNames.sendStatus],
            });
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
        await chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['captureSubtitle.js'],
        });
        await state.set({ isCaptureSubtitleInjected: true });

        // 字幕取得できるまで10回は繰り返す関数で取得する
        const subtitles: subtitle_piece[] = await repeatCaptureSubtitles(tabId);

        // const { subtitles } = await sendMessageToTabsPromise(tabId, {
        //     from: extensionNames.background,
        //     to: extensionNames.captureSubtitle,
        //     order: [orderNames.sendSubtitles],
        // });

        await state.set({ subtitles: subtitles });

        // <phase 4> inject controller.js
        await chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['controller.js'],
        });
        await state.set({ isControllerInjected: true });

        const s: iModel = await state.get();
        await sendMessageToTabsPromise(tabId, {
            from: extensionNames.background,
            to: extensionNames.controller,
            subtitles: s.subtitles,
        });

        await state.set({ isExTranscriptStructured: true });
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
        console.log('[background] RESET Begin...');
        // const _state: State<iModel> = state.getInstance();
        const { url } = await state.get();
        // stateの更新：
        // urlをtabs.onUpdatedが起こったときのURLにする
        await state.set({
            url: exciseBelowHash(newUrl === undefined ? url : newUrl),
            isTranscriptDisplaying: false,
            isSubtitleCaptured: false,
            isSubtitleCapturing: true,
            subtitles: [],
        });

        // reset 処理: 各content scritpのリセットを実施する
        await resetEachContentScript(tabId);

        // 成功したとして、
        // データ再取得処理
        const newSubtitles: subtitle_piece[] = await repeatCaptureSubtitles(
            tabId
        );

        if (!newSubtitles.length)
            throw new Error('Error: Failed to capture subtitles');

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
                        ? ''
                        : resetOrder.failureReason + resetSubtitle.success
                        ? ''
                        : resetSubtitle.failureReason
                } `
            );
        }

        await state.set({
            isTranscriptDisplaying: true,
        });

        // ここまで何も問題なければRESET成功
        console.log('[background] RESET Complete!');
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
        console.log('[background] handlerOfHide hides ExTranscript...');
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
            throw new Error('Failed to hide ExTranscript');
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
        console.log('[background] BEGIN resetEachContentScript()');

        // NOTE: sendMessageToTabsPromise使うと必ずruntime.lastError.
        // 一時的な措置として返信非必須のなまAPIつかう
        chrome.tabs.sendMessage(tabId, {
            from: extensionNames.background,
            to: extensionNames.contentScript,
            order: [orderNames.reset],
        });

        const controller: iResponse = await sendMessageToTabsPromise(tabId, {
            from: extensionNames.background,
            to: extensionNames.controller,
            order: [orderNames.reset],
        });

        console.log(controller);

        if (!controller.success)
            throw new Error(
                `Error: failed to reset controller.js. ${controller.failureReason}`
            );

        console.log('[background] DONE resetEachContentScript()');
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

        console.log('[repeatCaptureSubtitles]Begin to capture subtitles... ');

        intervalId = setInterval(async function () {
            if (counter >= 10) {
                // Failed
                console.log(
                    "[repeatCaptureSubtitles] Time out! It's over 10 times"
                );
                clearInterval(intervalId);
                reject([]);
            }

            console.log('[repeatCaptureSubtitles] capture again...');
            const r: iResponse = await sendMessageToTabsPromise(tabId, {
                from: extensionNames.background,
                to: extensionNames.captureSubtitle,
                order: [orderNames.sendSubtitles],
            });
            if (r.subtitles !== undefined && r.subtitles.length) {
                // Succeed
                console.log('[repeatCaptureSubtitles] Succeed to capture!');
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
