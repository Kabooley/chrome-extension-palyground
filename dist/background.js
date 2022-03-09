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
    // ExTranscriptがONかどうか
    // RUNした後かどうか、でもある
    // 表示、非表示は関係ない
    isExTranscriptStructured: false,
    // 本家トランスクリプトが表示されているかどうか
    // ONかどうかではなく、表示されているかどうか
    // これが非表示なら、ExTranscriptも非表示にする
    isTranscriptDisplaying: false,
    isEnglish: false,
    tabId: null,
    url: null,
    subtitles: null,
    tabInfo: null
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
    // NOTE: new added
    // Is the page moved to text page?
    isPageIncludingMovie: 'isPageIncludingMovie'
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
/* harmony export */   "exciseBelowHash": () => (/* binding */ exciseBelowHash),
/* harmony export */   "repeatActionPromise": () => (/* binding */ repeatActionPromise),
/* harmony export */   "delay": () => (/* binding */ delay)
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
                : reject("Send message to tabs went something wrong");
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
// なければそのまま引数のurlを返す
const exciseBelowHash = (url) => {
    return url.indexOf("#") < 0 ? url : url.slice(0, url.indexOf("#"));
};
/*********************
 * Repeat given async callback function.
 *
 * @param {action} Function:
 * the function that will be executed repeatedly.
 * NOTE: Function must returns boolean.
 * @param {timesoutResolve} boolean: true to allow this function to return false.
 * @param {times} number: Number that how many times repeat.
 * Default to 10.
 * @param {interval} number: Microseconds that repeat interval.
 * Default to 200.
 * @return {Promise} Promise objects represents boolean. True as matched, false as no-matched.
 * @throws
 *
 * 参考：https://stackoverflow.com/questions/61908676/convert-setinterval-to-promise
 *
 * 参考：https://levelup.gitconnected.com/how-to-turn-settimeout-and-setinterval-into-promises-6a4977f0ace3
 * */
const repeatActionPromise = (action, timeoutAsResolve = false, interval = 200, times = 10) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        let intervalId;
        let triesLeft = times;
        intervalId = setInterval(function () {
            return __awaiter(this, void 0, void 0, function* () {
                console.log(`loop tries left...${triesLeft}`);
                if (yield action()) {
                    clearInterval(intervalId);
                    // 正常な終了としてtrueを返す
                    resolve(true);
                }
                else if (triesLeft <= 1 && timeoutAsResolve) {
                    clearInterval(intervalId);
                    // 正常な終了でfalseを返す
                    resolve(false);
                }
                else if (triesLeft <= 1 && !timeoutAsResolve) {
                    clearInterval(intervalId);
                    // 例外エラーとしてcatchされる
                    reject();
                }
                triesLeft--;
            });
        }, interval);
    });
});
// --- USAGE EXAMPLE --------------------------------------
// const randomMath = (): boolean => {
//   return Math.random() * 0.8 > 400 ? true : false;
// }
// const repeatQuerySelector = async (): Promise<boolean> => {
//   try {
//     // 第二引数をfalseにすると、ループで一度もマッチしなかった場合、例外エラーになる
//     // なので例外エラーにしたくなくて、falseも受け取りたいときは
//     // 第二引数をtrueにすること
//       const r: boolean = await repeatActionPromise(
//           function(): boolean {return randomMath()}, true
//       );
//       return r;
//   }
//   catch(err) {
//     console.log("caught error");
//       // console.error(`Error: Could not query dom. ${err.message}`)
//       throw err;
//   }
// }
// (async function() {
//   const res = await repeatQuerySelector();
//   console.log("RESULT:");
//   console.log(res);
// })();
/****************
 * Wrapper of setTimeout with given function.
 *
 *
 * */
const delay = (action, timer) => {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            const r = action();
            resolve(r);
        }, timer);
    });
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
    // "https://www.udemy.com/course/*"以外のURLなら無視する
    const { url, tabId, isExTranscriptStructured } = yield state.get();
    // 拡張機能が未展開、changeInfo.statusがloadingでないなら無視する
    if (changeInfo.status !== "loading" || !isExTranscriptStructured)
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
            console.log("[background] Turn off extension because page reloaded");
            yield state.set(_annotations__WEBPACK_IMPORTED_MODULE_2__.modelBase);
        }
        else if (!changeInfo.url.match(_utils_constants__WEBPACK_IMPORTED_MODULE_0__.urlPattern)) {
            // Udemy講義ページ以外に移動した
            console.log("[background] the page moved to invalid url");
            yield state.set(_annotations__WEBPACK_IMPORTED_MODULE_2__.modelBase);
        }
        // 展開中のtabIdである && changeInfo.urlが講義ページである
        // その上でURLが変化した
        // NOTE: Compare URL WITHOUT below hash.
        else if (changeInfo.url.match(_utils_constants__WEBPACK_IMPORTED_MODULE_0__.urlPattern) &&
            (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.exciseBelowHash)(changeInfo.url) !== (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.exciseBelowHash)(url)) {
            // ページが切り替わった
            // NOTE: MUST Update URL
            console.log("[background] page moved");
            yield state.set({ url: (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.exciseBelowHash)(changeInfo.url) });
            // 動画ページ以外に切り替わったのか？
            const res = yield (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.sendMessageToTabsPromise)(tabId, {
                from: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.background,
                to: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.contentScript,
                order: [_utils_constants__WEBPACK_IMPORTED_MODULE_0__.orderNames.isPageIncludingMovie],
            });
            // TODO: Fix Udemyで動画ページに切り替わったのに
            // 動画ページじゃない判定してくる...
            // これの対処
            // DEBUG:
            //
            console.log(res);
            res.isPageIncludingMovie
                ? // 次の動画に移った
                    yield handlerOfReset(tabIdUpdatedOccured)
                : // 動画を含まないページへ移った
                    yield handlerOfHide(tabIdUpdatedOccured);
        }
    }
}));
/**************
 *
 * When tab or window closed,
 * restore background script state as its initial state.
 *
 * NOTE: Of course there is no content script
 * No need to "turn off" content script.
 * */
chrome.tabs.onRemoved.addListener((_tabId, removeInfo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tabId } = yield state.get();
        if (_tabId !== tabId)
            return;
        yield state.set(_annotations__WEBPACK_IMPORTED_MODULE_2__.modelBase);
    }
    catch (err) {
        console.error(err);
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
    console.log("[background] Message from Popup");
    const { from, order } = message, rest = __rest(message, ["from", "order"]);
    let response = {
        from: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.background,
        to: from,
    };
    if (order && order.length) {
        // SEND STATUS
        if (order.includes(_utils_constants__WEBPACK_IMPORTED_MODULE_0__.orderNames.sendStatus)) {
            try {
                const { isSubtitleCapturing, isExTranscriptStructured } = yield state.get();
                response.state = {
                    isSubtitleCapturing: isSubtitleCapturing,
                    isExTranscriptStructured: isExTranscriptStructured,
                };
            }
            catch (err) {
                // TODO: stateが取得できなかったときの挙動
            }
            finally {
                response.complete = true;
                sendResponse(response);
            }
        }
        // RUN
        if (order.includes(_utils_constants__WEBPACK_IMPORTED_MODULE_0__.orderNames.run)) {
            console.log("[background] RUN");
            try {
                // - falseが返される理由
                // 字幕がONじゃない、トランスクリプトがONじゃない、字幕が英語じゃない
                // 
                // - RUN処理中、起こりうる可能性がきわめて低い問題
                // chrome.scripting.execute()中のエラー
                // 字幕が取得できない（条件がそろってから実行するから、取得できないのはおかしい）
                // 
                // - 起こったら終了な問題(例外判定)
                // DOMが取得できない（DOMの種類による）
                // chrome.runtime.onInstalledが実行されていないことによる、stateの未初期化
                const r = yield handlerOfRun(rest.tabInfo);
                response.success = r ? true : false;
                // TODO: 失敗理由を追加しないとアラート出せない
            }
            catch (err) {
                // 起こったら終了な代物
                // RUNプロセスの状況によっていろいろリセットが必要か？
                response.success = false;
                response.error = err;
            }
            finally {
                response.complete = true;
                sendResponse(response);
            }
        }
        // POPUP上のOFF操作による拡張機能のOFF命令
        if (order.includes(_utils_constants__WEBPACK_IMPORTED_MODULE_0__.orderNames.turnOff)) {
            console.log("[background] TURN OFF ordered.");
            try {
                const { tabId } = yield state.get();
                yield turnOffEachContentScripts(tabId);
                const { isContentScriptInjected, isCaptureSubtitleInjected, isControllerInjected, } = yield state.get();
                // content scriptのinject状況だけ反映させてstateを初期値に戻す
                yield state.set(Object.assign(Object.assign({}, _annotations__WEBPACK_IMPORTED_MODULE_2__.modelBase), { isContentScriptInjected: isContentScriptInjected, isCaptureSubtitleInjected: isCaptureSubtitleInjected, isControllerInjected: isControllerInjected }));
                response.success = true;
            }
            catch (err) {
                // TODO: TURN OFFで例外が発生したときの挙動
                response.success = false;
            }
            finally {
                response.complete = true;
                sendResponse(response);
            }
        }
    }
});
/******
 * Handler of message from contentScrip.js
 * ________________________________________________________
 *
 * */
const handlerOfContentScriptMessage = (message, sender, sendResponse) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("[background] Message from contentScript.js");
    const { from, order } = message, rest = __rest(message, ["from", "order"]);
    let response = {
        from: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.background,
        to: from,
    };
    const { isExTranscriptStructured, isTranscriptDisplaying, isEnglish, tabId } = yield state.get();
    if (order && order.length) {
    }
    // ExTRanscriptを表示する条件が揃わなくなったとき...
    if (!rest.isTranscriptDisplaying || !rest.language) {
        try {
            // ExTranscriptを非表示にするかする
            // もしもトランスクリプトが表示中であったならば
            if (isExTranscriptStructured && isTranscriptDisplaying) {
                console.log("[background] Hide ExTranscript...");
                yield handlerOfHide(tabId);
            }
            // あとはStateを更新するだけ
            let s = {};
            if (rest.isTranscriptDisplaying !== undefined) {
                s["isTranscriptDisplaying"] = rest.isTranscriptDisplaying;
            }
            if (rest.language !== undefined) {
                s["isEnglish"] = rest.language;
            }
            yield state.set(s);
        }
        catch (err) {
            // TODO: Hide処理中に例外が発生したときの挙動
        }
        finally {
            response.complete = true;
            sendResponse(response);
        }
    }
    // トランスクリプトが再表示されたとき...
    if (rest.isTranscriptDisplaying) {
        // ExTranscriptが非表示だったならば再表示させる
        if (isExTranscriptStructured && !isTranscriptDisplaying) {
            try {
                yield handlerOfReset(tabId);
                yield state.set({ isTranscriptDisplaying: true });
            }
            catch (err) {
                // TODO: Reset処理中に例外が発生したときの挙動
            }
            finally {
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
                yield handlerOfReset(tabId);
                yield state.set({
                    isTranscriptDisplaying: true,
                    isEnglish: true,
                });
            }
            catch (err) {
                // TODO: Reset処理中に例外が発生したときの挙動
            }
            finally {
                response.complete = true;
                sendResponse(response);
            }
        }
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
/**
 * handler of RUN order.
 * _______________________________________________
 *
 *
 * */
const handlerOfRun = (tabInfo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { url, id } = tabInfo;
        const { isContentScriptInjected, isCaptureSubtitleInjected, isControllerInjected, } = yield state.get();
        // Save valid url and current tab that extension popup opened.
        yield state.set({
            url: (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.exciseBelowHash)(url),
            tabId: id,
            tabInfo: tabInfo,
        });
        //<phase 2> inject contentScript.js
        const { tabId } = yield state.get();
        if (!isContentScriptInjected) {
            yield chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: ["contentScript.js"],
            });
            yield state.set({ isContentScriptInjected: true });
        }
        else {
            const r = yield (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.sendMessageToTabsPromise)(tabId, {
                from: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.background,
                to: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.contentScript,
                order: [_utils_constants__WEBPACK_IMPORTED_MODULE_0__.orderNames.reset],
            });
            if (!r.success) {
                throw r.error;
            }
        }
        const currentPageStatus = yield (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.sendMessageToTabsPromise)(tabId, {
            from: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.background,
            to: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.contentScript,
            order: [_utils_constants__WEBPACK_IMPORTED_MODULE_0__.orderNames.sendStatus],
        });
        if (currentPageStatus.success) {
            // 結果がどうあれ現状の状態を保存する
            yield state.set({
                isEnglish: currentPageStatus.language,
                isTranscriptDisplaying: currentPageStatus.isTranscriptDisplaying,
            });
            // 字幕が英語じゃない、またはトランスクリプトがONでないならば
            // キャンセル
            if (!currentPageStatus.language || !currentPageStatus.isTranscriptDisplaying) {
                // TODO: 失敗またはキャンセルの方法未定義...
                // ひとまずfalseを返している
                return false;
            }
        }
        else
            throw currentPageStatus.error;
        // <phase 3> inject captureSubtitle.js
        // 字幕データを取得する
        if (!isCaptureSubtitleInjected) {
            yield chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: ["captureSubtitle.js"],
            });
            yield state.set({ isCaptureSubtitleInjected: true });
        }
        // 字幕取得できるまで10回は繰り返す関数で取得する
        // NOTE: 戻り値が空の配列でも受け入れることにする
        // TODO: セレクタが一致するかどうか検査する関数を設ける
        const subtitles = yield repeatCaptureSubtitles(tabId);
        yield state.set({ subtitles: subtitles });
        // <phase 4> inject controller.js
        if (!isControllerInjected) {
            yield chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: ["controller.js"],
            });
            yield state.set({ isControllerInjected: true });
        }
        else {
            const r = yield (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.sendMessageToTabsPromise)(tabId, {
                from: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.background,
                to: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.controller,
                order: [_utils_constants__WEBPACK_IMPORTED_MODULE_0__.orderNames.reset],
            });
            // TODO: FIX successの値ではなくて例外スローを受け取ること
            if (!r.success)
                throw new Error(`Error: Failed to reset controller.${r.failureReason}`);
        }
        const s = yield state.get();
        yield (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.sendMessageToTabsPromise)(tabId, {
            from: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.background,
            to: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.controller,
            subtitles: s.subtitles,
        });
        yield state.set({ isExTranscriptStructured: true });
        return true;
    }
    catch (err) {
        console.error(err.message);
        // TODO: Errorの種類を確認して必要に応じて再スロー
        throw err;
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
const handlerOfReset = (tabId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("[background] RESET Begin...");
        // stateの更新：
        yield state.set({
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
            throw new Error("Error: Failed to capture subtitles");
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
                ? ""
                : resetOrder.failureReason + resetSubtitle.success
                    ? ""
                    : resetSubtitle.failureReason} `);
        }
        yield state.set({
            isTranscriptDisplaying: true,
        });
        // ここまで何も問題なければRESET成功
        console.log("[background] RESET Complete!");
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
        console.log("[background] handlerOfHide hides ExTranscript...");
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
            throw new Error("Failed to hide ExTranscript");
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
        console.log("[background] BEGIN resetEachContentScript()");
        const contentScript = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.sendMessageToTabsPromise)(tabId, {
            from: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.background,
            to: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.contentScript,
            order: [_utils_constants__WEBPACK_IMPORTED_MODULE_0__.orderNames.reset],
        });
        const controller = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.sendMessageToTabsPromise)(tabId, {
            from: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.background,
            to: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.controller,
            order: [_utils_constants__WEBPACK_IMPORTED_MODULE_0__.orderNames.reset],
        });
        const r = yield Promise.all([contentScript, controller]);
        const failureReasons = r
            .filter((_) => {
            if (!_.success) {
                return _.failureReason;
            }
        })
            .join(" ");
        if (failureReasons) {
            throw new Error(`Error: failed to reset content script. ${failureReasons}`);
        }
        console.log("[background] DONE resetEachContentScript()");
    }
    catch (err) {
        console.error(err.message);
    }
});
/**********
 *
 * 各content scriptを拡張機能OFFに合わせ初期化する
 *
 * */
const turnOffEachContentScripts = (tabId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("[background] Turning off each content scripts");
        const contentScript = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.sendMessageToTabsPromise)(tabId, {
            from: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.background,
            to: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.contentScript,
            order: [_utils_constants__WEBPACK_IMPORTED_MODULE_0__.orderNames.turnOff],
        });
        const controller = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.sendMessageToTabsPromise)(tabId, {
            from: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.background,
            to: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.controller,
            order: [_utils_constants__WEBPACK_IMPORTED_MODULE_0__.orderNames.turnOff],
        });
        const r = yield Promise.all([contentScript, controller]);
        const failureReasons = r
            .filter((_) => {
            if (!_.success) {
                return _.failureReason;
            }
        })
            .join(" ");
        if (failureReasons) {
            throw new Error(`Error: failed to turn off content script. ${failureReasons}`);
        }
        console.log("[background] Done turning off each content scripts");
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
            console.log("[repeatCaptureSubtitles]Begin to capture subtitles... ");
            intervalId = setInterval(function () {
                return __awaiter(this, void 0, void 0, function* () {
                    if (counter >= 10) {
                        // Failed
                        console.log("[repeatCaptureSubtitles] Time out! It's over 10 times");
                        clearInterval(intervalId);
                        reject([]);
                    }
                    console.log("[repeatCaptureSubtitles] capture again...");
                    const r = yield (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.sendMessageToTabsPromise)(tabId, {
                        from: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.background,
                        to: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.captureSubtitle,
                        order: [_utils_constants__WEBPACK_IMPORTED_MODULE_0__.orderNames.sendSubtitles],
                    });
                    if (r.subtitles !== undefined && r.subtitles.length) {
                        // Succeed
                        console.log("[repeatCaptureSubtitles] Succeed to capture!");
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

})();

/******/ })()
;
//# sourceMappingURL=background.js.map