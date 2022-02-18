/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/background/annotations.ts":
/*!***************************************!*\
  !*** ./src/background/annotations.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "progressBase": () => (/* binding */ progressBase),
/* harmony export */   "modelBase": () => (/* binding */ modelBase)
/* harmony export */ });
// base object for State<iProgress>
const progressBase = {
    isContentScriptInjected: false,
    isCaptureSubtitleInjected: false,
    isControllerInjected: false,
    isSubtitleCapturing: false,
    isSubtitleCaptured: false,
    isExTranscriptStructured: false,
};
// modelBaseは新規プロパティの追加も削除もない
const modelBase = {
    isContentScriptInjected: false,
    isCaptureSubtitleInjected: false,
    isControllerInjected: false,
    isSubtitleCapturing: false,
    isSubtitleCaptured: false,
    // NOTE: ExTranscriptがONかどうか
    // RUNした後かどうか、でもある
    // 表示、非表示は関係ない
    isExTranscriptStructured: false,
    // NOTE: 本家トランスクリプトが表示されているかどうか
    // ONかどうかではなく、表示されているかどうか
    // これが非表示なら、ExTranscriptも非表示にする
    isTranscriptDisplaying: false,
    isEnglish: false,
    tabId: null,
    url: null,
    subtitles: null,
};


/***/ }),

/***/ "./src/utils/constants.ts":
/*!********************************!*\
  !*** ./src/utils/constants.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_key_of_model_state__": () => (/* binding */ _key_of_model_state__),
/* harmony export */   "urlPattern": () => (/* binding */ urlPattern),
/* harmony export */   "extensionStatus": () => (/* binding */ extensionStatus),
/* harmony export */   "extensionNames": () => (/* binding */ extensionNames),
/* harmony export */   "orderNames": () => (/* binding */ orderNames),
/* harmony export */   "RESIZE_BOUNDARY": () => (/* binding */ RESIZE_BOUNDARY),
/* harmony export */   "SIDEBAR_WIDTH_BOUNDARY": () => (/* binding */ SIDEBAR_WIDTH_BOUNDARY),
/* harmony export */   "RESIZE_TIMER": () => (/* binding */ RESIZE_TIMER),
/* harmony export */   "SIGNAL": () => (/* binding */ SIGNAL),
/* harmony export */   "positionStatus": () => (/* binding */ positionStatus),
/* harmony export */   "viewStatusNames": () => (/* binding */ viewStatusNames),
/* harmony export */   "port_names": () => (/* binding */ port_names)
/* harmony export */ });
/**************************************************
 * constants
 * ________________________________________________
 *
 * ************************************************/
const _key_of_model_state__ = '_key_of_model_state__@&%8=8';
const urlPattern = /https:\/\/www.udemy.com\/course\/*/gm;
const extensionStatus = {
    working: 'working',
    notWorking: 'notWorking',
    idle: 'idle',
};
const extensionNames = {
    popup: 'popup',
    contentScript: 'contentScript',
    controller: 'controller',
    captureSubtitle: 'captureSubtitle',
    background: 'background',
};
//
// Updated
//
const orderNames = {
    // // Inject content script order
    // injectCaptureSubtitleScript: 'injectCaptureSubtitleScript',
    // injectExTranscriptScript: 'injectExTranscriptScript',
    // From background to contentScript
    sendStatus: 'sendStatus',
    // from controller to background
    sendSubtitles: 'sendSubtitles',
    // order to disconnect port
    disconnect: 'disconnect',
    // from popup inquire the url is correct
    inquireUrl: 'inquireUrl',
    // from popup, run process
    run: 'run',
    // reset content script
    reset: 'reset',
    // Turn Off ExTranscript
    turnOff: 'turnOff',
    // something succeeded
    success: 'success',
};
// --- constants for controller.js -------------------------------
// // To pass to setTimeout
// export const TEN_SEC: number = 10000;
// transcript要素はwinodwサイズが975px以下の時にdashboardへ以上でsidebarへ移動する
const RESIZE_BOUNDARY = 975;
// sidebarのwidthは2通りあって、
// 975px < w =< 1182pxだと300px, w > 1182pxで25%
const SIDEBAR_WIDTH_BOUNDARY = 1182;
// window onResize時の反応遅延速度
const RESIZE_TIMER = 100;
const SIGNAL = {
    widthStatus: {
        wideview: true,
        middleview: false,
    },
};
const positionStatus = {
    sidebar: 'sidebar',
    noSidebar: 'noSidebar',
};
const viewStatusNames = {
    wideView: 'wideView',
    middleView: 'middleView',
};
// ---- ABOUT PORT ----------------------------------
const port_names = {
    _requiring_subtitles: '_port_name_require_subtitles',
    _injected_contentScript: '_port_name_injected_contentScript',
};
// // Usage
// type _order = orderTypes[];
// const oo: _order = [
//   orderNames.sendStatus, orderNames.disconnect
// ];
// console.log(oo);
// const messageHandler = (m: iMessage): void => {
//   const { from, to, order } = m;
//   // もしもorderプロパティが含まれていて、中身があれば
//   if (order && order.length) {
//     console.log("there is order");
//     //
//     // この時点だとorderが何者かわからないみたいだからincludes()メソッドなんて使えないよ
//     // というエラーが出る
//     // でも使えた
//     // codesandboxでは
//     if (order.includes(orderNames.sendStatus)) {
//       console.log("SEND STATUS");
//     }
//     if (order.includes(orderNames.disconnect)) {
//       console.log("DISCONNECT");
//     }
//   }
// };
// messageHandler({
//   from: "background",
//   to: "content script",
//   order: [
//     orderNames.sendStatus, orderNames.disconnect
//   ]
// });
// messageHandler({
//   from: "background",
//   to: "content script",
//   order: []
// });
// messageHandler({
//   from: "background",
//   to: "content script"
// });
/*
## 変数がいくつかの特定の値を持つように強制する方法

https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types

```TypeScript

// -- example 1 --

let x: "hello" = "hello";
// OK
x = "hello";
// ...
x = "howdy";
// Type '"howdy"' is not assignable to type '"hello"'.

// -- example 2 --

function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}
printText("Hello, world", "left");
printText("G'day, mate", "centre");
Argument of type '"centre"' is not assignable to parameter of type '"left" | "right" | "center"'.
```

https://typescript-jp.gitbook.io/deep-dive/type-system/literal-types



*/


/***/ }),

/***/ "./src/utils/helpers.ts":
/*!******************************!*\
  !*** ./src/utils/helpers.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "deepCopier": () => (/* binding */ deepCopier),
/* harmony export */   "sendMessageToTabsPromise": () => (/* binding */ sendMessageToTabsPromise),
/* harmony export */   "sendMessagePromise": () => (/* binding */ sendMessagePromise),
/* harmony export */   "tabsQuery": () => (/* binding */ tabsQuery),
/* harmony export */   "exciseBelowHash": () => (/* binding */ exciseBelowHash)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
const deepCopier = (data) => {
    return JSON.parse(JSON.stringify(data));
};
const sendMessageToTabsPromise = (tabId, message) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        chrome.tabs.sendMessage(tabId, message, (response) => __awaiter(void 0, void 0, void 0, function* () {
            const { complete } = response, rest = __rest(response, ["complete"]);
            complete
                ? resolve(rest)
                : reject('Send message to tabs went something wrong');
        }));
    }));
});
const sendMessagePromise = (message) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        chrome.runtime.sendMessage(message, (response) => __awaiter(void 0, void 0, void 0, function* () {
            const { complete } = response, rest = __rest(response, ["complete"]);
            if (complete)
                resolve(rest);
            else
                reject();
        }));
    }));
});
const tabsQuery = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const w = yield chrome.windows.getCurrent();
        const tabs = yield chrome.tabs.query({
            active: true,
            windowId: w.id,
        });
        return tabs[0];
    }
    catch (err) {
        console.error(err.message);
    }
});
// # mark以下を切除した文字列を返す
const exciseBelowHash = (url) => {
    return url.slice(0, url.indexOf('#'));
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************************!*\
  !*** ./src/background/background.ts ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/constants */ "./src/utils/constants.ts");
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/helpers */ "./src/utils/helpers.ts");
/* harmony import */ var _annotations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./annotations */ "./src/background/annotations.ts");
/***************************************************************
 * background.ts
 * _____________________________________________________________
 *
 * As service worker and Application Layer.
 *
 *
 * chrome.runtime.onInstalled: Stateを初期化してstateへ保存する
 *  ***************************************************************/
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};



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
chrome.runtime.onInstalled.addListener((details) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`[background] onInstalled: ${details.reason}`);
    try {
        state.clearAll();
        state.set(_annotations__WEBPACK_IMPORTED_MODULE_2__.modelBase);
    }
    catch (err) {
        console.error(err.message);
    }
}));
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
chrome.tabs.onUpdated.addListener((tabIdUpdatedOccured, changeInfo, Tab) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(changeInfo);
    // "https://www.udemy.com/course/*"以外のURLなら無視する
    const { url, tabId, isExTranscriptStructured } = yield state.get();
    // 拡張機能が未展開、changeInfo.statusがloadingでないなら無視する
    if (changeInfo.status !== 'loading' || !isExTranscriptStructured)
        return;
    // 拡張機能が展開済だとして、tabIdが展開済のtabId以外に切り替わったなら無視する
    // return;
    if (tabIdUpdatedOccured !== tabId)
        return;
    // 展開中のtabId && chnageInfo.urlがUdemy講義ページ以外のURLならば
    // 拡張機能OFFの処理へ
    if (isExTranscriptStructured && tabIdUpdatedOccured === tabId) {
        // おなじURLでのリロードか？
        if (changeInfo.url === undefined) {
            // 拡張機能は何もしない
            return;
        }
        else if (!changeInfo.url.match(_utils_constants__WEBPACK_IMPORTED_MODULE_0__.urlPattern)) {
            // Udemy講義ページ以外に移動した
            // 拡張機能OFF処理へ
            // TODO: 拡張機能OFF処理の実装
            console.log('[background] TURN OFF this extension');
        }
        // 展開中のtabIdである && changeInfo.urlが講義ページである
        // その上でURLが変化した
        // NOTE: url比較の時にurlの#以下を比較対象としないようにしている
        else if (changeInfo.url.match(_utils_constants__WEBPACK_IMPORTED_MODULE_0__.urlPattern) &&
            (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.exciseBelowHash)(changeInfo.url) !== (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.exciseBelowHash)(url)) {
            // 動画が切り替わった
            yield handlerOfReset(tabIdUpdatedOccured, changeInfo.url);
        }
    }
}));
/**
 * chrome.runtime.onMessage.addListener()
 * _________________________________________________
 *
 * */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.to !== _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.background)
        return;
    sortMessage(message, sender, sendResponse);
    // NOTE: MUST RETURN TRUE
    // If you wanna use asynchronous function.
    return true;
});
/******
 *  sort message
 * ________________________________________________
 *
 *
 * */
const sortMessage = (message, sender, sendResponse) => {
    switch (message.from) {
        case _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.popup:
            handlerOfPopupMessage(message, sender, sendResponse);
            break;
        case _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.contentScript:
            handlerOfContentScriptMessage(message, sender, sendResponse);
            break;
        case _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.captureSubtitle:
            handlerOfCaptureSubtitleMessage(message, sender, sendResponse);
            break;
        case _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.controller:
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
const handlerOfPopupMessage = (message, sender, sendResponse) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('[background] Message from Popup');
    try {
        const { order } = message, rest = __rest(message, ["order"]);
        if (order && order.length) {
            // Popupが開かれるたびにURLが正しいか判定する
            if (order.includes(_utils_constants__WEBPACK_IMPORTED_MODULE_0__.orderNames.inquireUrl)) {
                console.log('[background] Validate URL');
                const isValidPage = yield handlerOfVerifyValidPage();
                sendResponse({ correctUrl: isValidPage, complete: true });
            }
            // 拡張機能の実行命令
            if (order.includes(_utils_constants__WEBPACK_IMPORTED_MODULE_0__.orderNames.run)) {
                console.log('[background] RUN');
                const isSuccess = yield handlerOfRun();
                if (!isSuccess) {
                    sendResponse({ complete: true, success: false });
                }
                else {
                    sendResponse({ complete: true, success: true });
                }
            }
        }
    }
    catch (err) {
        console.error(err.message);
    }
});
/******
 * Handler of message from contentScrip.js
 * ________________________________________________________
 *
 * */
const handlerOfContentScriptMessage = (message, sender, sendResponse) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('[background] Message from contentScript.js');
    try {
        const { order } = message, rest = __rest(message, ["order"]);
        const { isExTranscriptStructured, isTranscriptDisplaying, isEnglish, tabId, } = yield state.get();
        if (order && order.length) {
        }
        // ExTRanscriptを表示する条件が揃わなくなったとき...
        if (!rest.isTranscriptDisplaying || !rest.language) {
            // ExTranscriptを非表示にするかする
            // もしもトランスクリプトが表示中であったならば
            if (isExTranscriptStructured && isTranscriptDisplaying) {
                console.log('[background] Hide ExTranscript...');
                yield handlerOfHide(tabId);
            }
            // あとはStateを更新するだけ
            let s = {};
            if (rest.isTranscriptDisplaying !== undefined) {
                s['isTranscriptDisplaying'] = rest.isTranscriptDisplaying;
            }
            if (rest.language !== undefined) {
                s['isEnglish'] = rest.language;
            }
            yield state.set(s);
            sendResponse({ complete: true });
        }
        // トランスクリプトが再表示されたとき...
        if (rest.isTranscriptDisplaying) {
            // ExTranscriptが非表示だったならば再表示させる
            if (isExTranscriptStructured && !isTranscriptDisplaying) {
                // 非表示だった状態から
                // 表示させる処理
                yield handlerOfReset(tabId);
                yield state.set({ isTranscriptDisplaying: true });
                sendResponse({ complete: true });
            }
        }
        // 字幕が英語を選択されたとき...
        if (rest.language) {
            // ExTranscriptが非表示だったならば再表示させる
            if (isExTranscriptStructured && !isEnglish) {
                // 非表示だった状態から
                // 表示させる処理
                yield handlerOfReset(tabId);
                yield state.set({
                    isTranscriptDisplaying: true,
                    isEnglish: true,
                });
                sendResponse({ complete: true });
            }
        }
    }
    catch (err) {
        console.error(err.message);
    }
});
/**
 * Handler of message from captureSubtitle.js
 *______________________________________________________
 *
 * */
const handlerOfCaptureSubtitleMessage = (message, sender, sendResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (err) {
        console.error(err.message);
    }
});
/**
 *  Handler of message from controller.js
 *______________________________________________________
 *
 * */
const handlerOfControllerMessage = (message, sender, sendResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (err) {
        console.error(err.message);
    }
});
//
// --- Order Handlers -------------------------------------------
//
/*****
 * Verify given url or current tab url
 * ________________________________________________________
 *
 * */
const handlerOfVerifyValidPage = (_url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let url = '';
        if (_url === undefined) {
            const tab = yield (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.tabsQuery)();
            url = tab.url;
        }
        else
            url = _url;
        const result = url.match(_utils_constants__WEBPACK_IMPORTED_MODULE_0__.urlPattern);
        return result && result.length ? true : false;
    }
    catch (err) {
        console.error(err.message);
    }
});
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
const handlerOfRun = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tabs = yield (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.tabsQuery)();
        const { url, id } = tabs;
        // <phase 1> is URL correct?
        // 拡張機能を展開するurlとtabIdを保存するため
        if (!handlerOfVerifyValidPage(url)) {
            // TODO: 失敗またはキャンセルの方法未定義...
            // ひとまずfalseを返している
            return false;
        }
        // Save valid url and current tab that extension popup opened.
        yield state.set({ url: (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.exciseBelowHash)(url), tabId: id });
        //<phase 2> inject contentScript.js
        const { tabId } = yield state.get();
        yield chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['contentScript.js'],
        });
        yield state.set({ isContentScriptInjected: true });
        // TODO: ここでcontentScript.jsが展開完了したのを確認したうえで次に行きたいのだが...実装する技術がない...
        const { language, isTranscriptDisplaying } = yield (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.sendMessageToTabsPromise)(tabId, {
            from: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.background,
            to: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.contentScript,
            order: [_utils_constants__WEBPACK_IMPORTED_MODULE_0__.orderNames.sendStatus],
        });
        // 結果がどうあれ現状の状態を保存する
        yield state.set({
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
        yield chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['captureSubtitle.js'],
        });
        yield state.set({ isCaptureSubtitleInjected: true });
        // 字幕取得できるまで10回は繰り返す関数で取得する
        const subtitles = yield repeatCaptureSubtitles(tabId);
        // const { subtitles } = await sendMessageToTabsPromise(tabId, {
        //     from: extensionNames.background,
        //     to: extensionNames.captureSubtitle,
        //     order: [orderNames.sendSubtitles],
        // });
        yield state.set({ subtitles: subtitles });
        // <phase 4> inject controller.js
        yield chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['controller.js'],
        });
        yield state.set({ isControllerInjected: true });
        const s = yield state.get();
        yield (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.sendMessageToTabsPromise)(tabId, {
            from: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.background,
            to: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.controller,
            subtitles: s.subtitles,
        });
        yield state.set({ isExTranscriptStructured: true });
        // ...ここまででエラーがなければ成功
        return true;
    }
    catch (err) {
        console.error(err.message);
    }
});
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
const handlerOfReset = (tabId, newUrl) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('[background] RESET Begin...');
        // const _state: State<iModel> = state.getInstance();
        const { url } = yield state.get();
        // stateの更新：
        // urlをtabs.onUpdatedが起こったときのURLにする
        yield state.set({
            url: (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.exciseBelowHash)(newUrl === undefined ? url : newUrl),
            isTranscriptDisplaying: false,
            isSubtitleCaptured: false,
            isSubtitleCapturing: true,
            subtitles: [],
        });
        // reset 処理: 各content scritpのリセットを実施する
        yield resetEachContentScript(tabId);
        // 成功したとして、
        // データ再取得処理
        const newSubtitles = yield repeatCaptureSubtitles(tabId);
        if (!newSubtitles.length)
            throw new Error('Error: Failed to capture subtitles');
        // If okay, then save subtitles data.
        yield state.set({
            isSubtitleCaptured: true,
            isSubtitleCapturing: false,
            subtitles: newSubtitles,
        });
        // NOTE: 一旦resetオーダーを出してから字幕を送ること
        const resetOrder = yield (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.sendMessageToTabsPromise)(tabId, {
            from: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.background,
            to: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.controller,
            order: [_utils_constants__WEBPACK_IMPORTED_MODULE_0__.orderNames.reset],
        });
        const resetSubtitle = yield (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.sendMessageToTabsPromise)(tabId, {
            from: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.background,
            to: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.controller,
            subtitles: newSubtitles,
        });
        if (!resetOrder.success || !resetSubtitle) {
            throw new Error(`Error: Failed to reset controller. ${resetOrder.success
                ? ''
                : resetOrder.failureReason + resetSubtitle.success
                    ? ''
                    : resetSubtitle.failureReason} `);
        }
        yield state.set({
            isTranscriptDisplaying: true,
        });
        // ここまで何も問題なければRESET成功
        console.log('[background] RESET Complete!');
    }
    catch (err) {
        console.error(err.message);
    }
});
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
const handlerOfHide = (tabId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('[background] handlerOfHide hides ExTranscript...');
        // stateの更新：
        yield state.set({
            isTranscriptDisplaying: false,
            isSubtitleCaptured: false,
            subtitles: [],
        });
        // reset 処理: 各content scritpのリセットを実施する
        const r = yield (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.sendMessageToTabsPromise)(tabId, {
            from: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.background,
            to: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.controller,
            order: [_utils_constants__WEBPACK_IMPORTED_MODULE_0__.orderNames.turnOff],
        });
        if (!r.success) {
            throw new Error('Failed to hide ExTranscript');
        }
    }
    catch (err) {
        console.error(err.message);
    }
});
/**
 *
 *
 * */
const resetEachContentScript = (tabId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('[background] BEGIN resetEachContentScript()');
        // NOTE: sendMessageToTabsPromise使うと必ずruntime.lastError.
        // 一時的な措置として返信非必須のなまAPIつかう
        chrome.tabs.sendMessage(tabId, {
            from: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.background,
            to: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.contentScript,
            order: [_utils_constants__WEBPACK_IMPORTED_MODULE_0__.orderNames.reset],
        });
        const controller = yield (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.sendMessageToTabsPromise)(tabId, {
            from: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.background,
            to: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.controller,
            order: [_utils_constants__WEBPACK_IMPORTED_MODULE_0__.orderNames.reset],
        });
        console.log(controller);
        if (!controller.success)
            throw new Error(`Error: failed to reset controller.js. ${controller.failureReason}`);
        console.log('[background] DONE resetEachContentScript()');
    }
    catch (err) {
        console.error(err.message);
    }
});
//
// --- Other Methods ----------------------------------------
//
/***
 *  Repeat to capture subtitles
 * ______________________________________________________________
 *
 *  Repeats 10 times so far.
 * */
const repeatCaptureSubtitles = function (tabId) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let intervalId;
            let counter = 0;
            console.log('[repeatCaptureSubtitles]Begin to capture subtitles... ');
            intervalId = setInterval(function () {
                return __awaiter(this, void 0, void 0, function* () {
                    if (counter >= 10) {
                        // Failed
                        console.log("[repeatCaptureSubtitles] Time out! It's over 10 times");
                        clearInterval(intervalId);
                        reject([]);
                    }
                    console.log('[repeatCaptureSubtitles] capture again...');
                    const r = yield (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.sendMessageToTabsPromise)(tabId, {
                        from: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.background,
                        to: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.captureSubtitle,
                        order: [_utils_constants__WEBPACK_IMPORTED_MODULE_0__.orderNames.sendSubtitles],
                    });
                    if (r.subtitles !== undefined && r.subtitles.length) {
                        // Succeed
                        console.log('[repeatCaptureSubtitles] Succeed to capture!');
                        clearInterval(intervalId);
                        resolve(r.subtitles);
                    }
                    else
                        counter++;
                });
            }, INTERVAL_TIME);
        }));
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
const state = (function () {
    const _getLocalStorage = function (key) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                chrome.storage.local.get(key, (s) => {
                    if (chrome.runtime.lastError)
                        reject(chrome.runtime.lastError);
                    resolve(s);
                });
            });
        });
    };
    return {
        // 本来ローカルストレージに保存しておくデータの一部だけでも
        // 保存することを可能とする
        //
        set: (prop) => __awaiter(this, void 0, void 0, function* () {
            try {
                const s = yield _getLocalStorage(KEY_LOCALSTORAGE);
                const newState = Object.assign(Object.assign({}, s[KEY_LOCALSTORAGE]), prop);
                yield chrome.storage.local.set({
                    [KEY_LOCALSTORAGE]: newState,
                });
            }
            catch (err) {
                console.error(err.message);
            }
        }),
        get: () => __awaiter(this, void 0, void 0, function* () {
            try {
                const s = yield _getLocalStorage(KEY_LOCALSTORAGE);
                return Object.assign({}, s[KEY_LOCALSTORAGE]);
            }
            catch (err) {
                console.error(err.message);
            }
        }),
        clearAll: () => __awaiter(this, void 0, void 0, function* () {
            try {
                yield chrome.storage.local.remove(KEY_LOCALSTORAGE);
            }
            catch (err) {
                console.error(err.message);
            }
        }),
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

})();

/******/ })()
;
//# sourceMappingURL=background.js.map