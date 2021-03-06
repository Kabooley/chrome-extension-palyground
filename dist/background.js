/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Error/templates.ts":
/*!********************************!*\
  !*** ./src/Error/templates.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "alertMessages": () => (/* binding */ alertMessages)
/* harmony export */ });
/*****************************************
 * 今のところ日本人向けに公開するから、
 * 本当はここ日本語にするんですけどね...
 *
 *
 * */
const alertMessages = {
    failedOnInstall: "Failed to install/update chrome extension. Please try again or contact to developer",
    pageIsNotReady: "Extensions require subtitles to be in English and transcripts to be turned on",
};


/***/ }),

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

/***/ "./src/utils/Circulater.ts":
/*!*********************************!*\
  !*** ./src/utils/Circulater.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "circulater": () => (/* binding */ circulater)
/* harmony export */ });
// NOTE: iCallbackOfCirculater<T>とiConditionOfCirculater<T>
// のGenericsのT型は共通であること
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/****************************************
 * circulater
 *
 * High order function that returns the function
 * which repeats given function until given times.
 *
 * @param {iCallbackOfCirculater} callback - Function that you want to iterate over.
 * @param {iConditionOfCirculater} conditon - Function that gives conditiobal branching to continue or terminate.
 * @param {number} until - Number how many times to repeat.
 * @return {iClosureOfCirculater<T>} - function which repeats given function until given times.
 *
 * resultが初期化されないのにreturnしているというエラーがでるかも
 * */
const circulater = function (callback, condition, until) {
    return function () {
        return __awaiter(this, void 0, void 0, function* () {
            // 予めループの外にresult変数を置いて
            let result;
            for (let i = 0; i < until; i++) {
                result = yield callback();
                if (condition(result))
                    return result;
            }
            // ループが終わってしまったら最後のresultを返せばいいのだが...
            // エラーを出すかも:
            // "TypeScriptがresultが初期化されないままなんだけど"
            //
            // 必ずresultはforループで初期化されるからってことを
            // TypeScriptへ伝えたいけど手段がわからん
            return result;
        });
    };
};
/// USAGE //////////////////////////////////////////////////////
// // 実際に実行したい関数
// const counter = async (times: number): Promise<boolean> => {
//   return new Promise((resolve, reject) => {
//     let timerId: number;
//     let num: number = 0;
//     timerId = setInterval(function () {
//       console.log(`counter: ${num}`);
//       if (num >= times) {
//         clearInterval(timerId);
//         const random_boolean = Math.random() < 0.7;
//         resolve(random_boolean ? true : false);
//       } else num++;
//     }, 1000);
//   });
// };
// // circulaterへ渡すcallback関数
// //
// // 完全にハードコーディング
// //
// // 実際に実行したい関数へ渡さなくてはならない引数はここで渡すこと
// // 戻り値は任意であるが、condition関数のgenerics型と同じにすること
// const cb: iCallbackOfCirculater<boolean> = async (): Promise<boolean> => {
//   const n: boolean = await counter(7);
//   console.log(`cb: ${n}`);
//   return n;
// };
// // circulaterへ渡すconditon関数
// //
// // 完全にハードコーディング
// //
// // circulaterへ渡す引数callbackの戻り値の型と同じ型をgenericsとして渡すこと
// const counterCondition: iConditionOfCirculater<iOp> = (
//   operand: iOp
// ): boolean => {
//   console.log(`condition: ${operand ? true : false}`);
//   return operand ? true : false;
// };
// const counterLoop = circulater<boolean>(cb, counterCondition, 3);
// (async function () {
//   const r = await counterLoop();
//   console.log(`RESULT: ${r}`);
// })();


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
const _key_of_model_state__ = "_key_of_model_state__@&%8=8";
const urlPattern = /https:\/\/www.udemy.com\/course\/*/gm;
const extensionStatus = {
    working: "working",
    notWorking: "notWorking",
    idle: "idle",
};
const extensionNames = {
    popup: "popup",
    contentScript: "contentScript",
    controller: "controller",
    captureSubtitle: "captureSubtitle",
    background: "background",
};
//
// Updated
//
const orderNames = {
    // // Inject content script order
    // injectCaptureSubtitleScript: 'injectCaptureSubtitleScript',
    // injectExTranscriptScript: 'injectExTranscriptScript',
    // From background to contentScript
    sendStatus: "sendStatus",
    // from controller to background
    sendSubtitles: "sendSubtitles",
    // order to disconnect port
    disconnect: "disconnect",
    // from popup inquire the url is correct
    inquireUrl: "inquireUrl",
    // from popup, run process
    run: "run",
    // reset content script
    reset: "reset",
    // Turn Off ExTranscript
    turnOff: "turnOff",
    // something succeeded
    success: "success",
    // NOTE: new added
    // Is the page moved to text page?
    isPageIncludingMovie: "isPageIncludingMovie",
    // NOTE: new added
    // Alert
    alert: "alert",
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
    sidebar: "sidebar",
    noSidebar: "noSidebar",
};
const viewStatusNames = {
    wideView: "wideView",
    middleView: "middleView",
};
// ---- ABOUT PORT ----------------------------------
const port_names = {
    _requiring_subtitles: "_port_name_require_subtitles",
    _injected_contentScript: "_port_name_injected_contentScript",
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
/* harmony import */ var _Error_templates__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Error/templates */ "./src/Error/templates.ts");
/* harmony import */ var _utils_Circulater__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/Circulater */ "./src/utils/Circulater.ts");
/***************************************************************
 * background.ts
 * _____________________________________________________________
 *
 * As service worker and Application Layer.
 *
 *
 * chrome.runtime.onInstalled: Stateを初期化してstateへ保存する
 *
 *
 *
 * Exception Handling
 * ***************************************************************/
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
const INTERVAL_TIME = 100;
const KEY_LOCALSTORAGE = "__key__of_local_storage_";
//
// --- Chrome API Listeners ---------------------------------
//
/**
 * Set up state module and clear previous storage information that state use.
 * Set modelBase as initial value of state module.
 *
 * @callback
 * @param {chrome.runtime.InstalledDetails} details
 * - Represents details of install or update.
 *
 * */
chrome.runtime.onInstalled.addListener((details) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`[background] onInstalled: ${details.reason}`);
    try {
        state.clearAll();
        state.set(_annotations__WEBPACK_IMPORTED_MODULE_2__.modelBase);
    }
    catch (err) {
        console.error(err.message);
        alert(_Error_templates__WEBPACK_IMPORTED_MODULE_3__.alertMessages.failedOnInstall);
    }
}));
/**
 * Monitor events of interest by filtering all events on the browser.
 *
 * NOTE: chrome.tabs.onUpdated.addListenerにはfiltering機能がない
 * なのでイベントの取捨選択はすべて条件分岐を追加して対処している
 *
 * 機能：
 *
 * 1. 次のイベントを無視する
 *
 * - 指定のURL以外のページのイベントすべて
 * - 拡張機能が展開済であるが、changeInfo.statusが'loading'ではない
 * - 拡張機能が展開済であるが、展開しているタブ以外に切り替わったとき
 * - ブラウザが閉じられた、タブが閉じられたときの対処はchrome.tabs.onRemoved.addListenerが請け負う
 *
 * 2. 次のイベントは監視する
 *
 * - 拡張機能が展開中のタブでリロードが起こった
 * - 拡張機能が展開中のタブが別のURLへ移動した
 * - 拡張機能が展開中のタブでURL末尾(#含まない)が更新された(次の講義動画に切り替わった)
 * - 拡張機能が展開中のタブでURL末尾(#含まない)が更新された(講義動画がないページに切り替わった)
 *
 *
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
            //NOTE: MUST Update URL. ページが切り替わったから
            console.log("[background] page moved");
            yield state.set({ url: (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.exciseBelowHash)(changeInfo.url) });
            // 動画ページ以外に切り替わった？
            // TODO: sendMessageToTabsPromiseのスローするエラーのcatch
            const res = yield (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.sendMessageToTabsPromise)(tabId, {
                from: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.background,
                to: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.contentScript,
                order: [_utils_constants__WEBPACK_IMPORTED_MODULE_0__.orderNames.isPageIncludingMovie],
            });
            res.isPageIncludingMovie
                ? // 次の動画に移った
                    yield handlerOfReset(tabIdUpdatedOccured, yield circulateRepeatCaptureSubtitles())
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
/*********************************************
 * Handler of message from POPUP
 *
 * TODO: response.errorを送信する必要があるかは未検討
 * 私見では必要ないのでは？
 * エラーを取得してどうするか考えるのはbackground scriptの役目であるから...
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
                response.complete = true;
            }
            catch (e) {
                // TODO: stateが取得できなかったときの挙動 alertだす
                response.complete = false;
                response.error = e;
            }
            finally {
                sendResponse(response);
            }
        }
        // RUN
        /*
          - falseが返される理由
            字幕がONじゃない、トランスクリプトがONじゃない、字幕が英語じゃない
            
          - RUN処理中、起こりうる可能性がきわめて低い問題
            chrome.scripting.execute()中のエラー
            字幕が取得できない（条件がそろってから実行するから、取得できないのはおかしい）
            
          - 起こったら終了な問題(例外判定)
            DOMが取得できない（DOMの種類による）
            chrome.runtime.onInstalledが実行されていないことによる、stateの未初期化
        */
        if (order.includes(_utils_constants__WEBPACK_IMPORTED_MODULE_0__.orderNames.run)) {
            console.log("[background] RUN");
            try {
                // True as successfully done. False as page status is not ready.(Not error)
                const r = yield handlerOfRun(rest.tabInfo);
                response.success = r ? true : false;
                response.complete = true;
                // TODO: ページ環境を実行できるものにしてくれとアラート
                if (!r)
                    chrome.tabs.sendMessage(rest.tabInfo.id, {
                        from: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.background,
                        to: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.contentScript,
                        order: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.orderNames.alert,
                        alertMessage: _Error_templates__WEBPACK_IMPORTED_MODULE_3__.alertMessages.pageIsNotReady,
                    });
            }
            catch (e) {
                response.complete = false;
                response.error = e;
            }
            finally {
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
                response.complete = true;
            }
            catch (e) {
                response.complete = false;
                response.error = e;
            }
            finally {
                sendResponse(response);
            }
        }
    }
});
/**************************************
 * Handler of message from contentScrip.js
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
            response.complete = true;
        }
        catch (e) {
            response.complete = false;
        }
        finally {
            sendResponse(response);
        }
    }
    // トランスクリプトが再表示されたとき...
    if (rest.isTranscriptDisplaying) {
        // ExTranscriptが非表示だったならば再表示させる
        if (isExTranscriptStructured && !isTranscriptDisplaying) {
            try {
                yield handlerOfReset(tabId, (yield state.get()).subtitles);
                yield state.set({ isTranscriptDisplaying: true });
                response.complete = true;
            }
            catch (e) {
                response.complete = false;
            }
            finally {
                sendResponse(response);
            }
        }
    }
    // 字幕が英語を選択されたとき...
    if (rest.language) {
        // ExTranscriptが非表示だったならば再表示させる
        if (isExTranscriptStructured && !isEnglish) {
            try {
                yield handlerOfReset(tabId, (yield state.get()).subtitles);
                yield state.set({
                    isTranscriptDisplaying: true,
                    isEnglish: true,
                });
                response.complete = true;
            }
            catch (e) {
                response.complete = false;
            }
            finally {
                sendResponse(response);
            }
        }
    }
});
/**********************************************
 * Handler of message from captureSubtitle.js
 *
 *
 * */
const handlerOfCaptureSubtitleMessage = (message, sender, sendResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (e) {
        console.error(e.message);
    }
});
/**********************************************
 *  Handler of message from controller.js
 *
 * */
const handlerOfControllerMessage = (message, sender, sendResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (e) {
        console.error(e.message);
    }
});
//
// --- Order Handlers -------------------------------------------
//
/*****************************************************
 * Handler of RUN order.
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
            yield (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.sendMessageToTabsPromise)(tabId, {
                from: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.background,
                to: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.contentScript,
                order: [_utils_constants__WEBPACK_IMPORTED_MODULE_0__.orderNames.reset],
            });
        }
        const currentPageStatus = yield (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.sendMessageToTabsPromise)(tabId, {
            from: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.background,
            to: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.contentScript,
            order: [_utils_constants__WEBPACK_IMPORTED_MODULE_0__.orderNames.sendStatus],
        });
        yield state.set({
            isEnglish: currentPageStatus.language,
            isTranscriptDisplaying: currentPageStatus.isTranscriptDisplaying,
        });
        if (!currentPageStatus.language ||
            !currentPageStatus.isTranscriptDisplaying) {
            // TODO: RUNしたけどページステータスのせいで実行できないときの挙動の実装...alert()する
            return false;
        }
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
        // NOTE: 戻り値が空の配列でも受け入れる
        const subtitles = yield circulateRepeatCaptureSubtitles();
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
            yield (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.sendMessageToTabsPromise)(tabId, {
                from: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.background,
                to: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.controller,
                order: [_utils_constants__WEBPACK_IMPORTED_MODULE_0__.orderNames.reset],
            });
        }
        const s = yield state.get();
        yield (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.sendMessageToTabsPromise)(tabId, {
            from: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.background,
            to: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.controller,
            subtitles: s.subtitles,
        });
        yield state.set({ isExTranscriptStructured: true });
        // NOTE: MUST RETURN TRUE
        return true;
    }
    catch (e) {
        console.error(e.message);
        // TODO: Errorの種類を確認して必要に応じて再スロー
        // TODO: stack traceを追跡できるならば、どこの段階でエラーが起こったのか取得できるので、
        // 段階に合わせてstateを初期化する
        // またはそんな面倒はすっ飛ばして、ページのリロードを強制させるか？
        throw e;
    }
});
/**************************************************
 * Handler of RESET
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
// const handlerOfReset = async (tabId: number): Promise<void> => {
//   try {
//     console.log("[background] RESET Begin...");
//     // stateの更新：
//     await state.set({
//       isTranscriptDisplaying: false,
//       isSubtitleCaptured: false,
//       isSubtitleCapturing: true,
//       subtitles: [],
//     });
//     // reset 処理: 各content scritpのリセットを実施する
//     await resetEachContentScript(tabId);
//     const newSubtitles: subtitle_piece[] = await repeatCaptureSubtitles(tabId);
//     // If okay, then save subtitles data.
//     await state.set({
//       isSubtitleCaptured: true,
//       isSubtitleCapturing: false,
//       subtitles: newSubtitles,
//     });
//     // NOTE: 必ずresetオーダーを出してから字幕を送ること
//     const resetOrder: iResponse = await sendMessageToTabsPromise(tabId, {
//       from: extensionNames.background,
//       to: extensionNames.controller,
//       order: [orderNames.reset],
//     });
//     const resetSubtitle: iResponse = await sendMessageToTabsPromise(tabId, {
//       from: extensionNames.background,
//       to: extensionNames.controller,
//       subtitles: newSubtitles,
//     });
//     await state.set({
//       isTranscriptDisplaying: true,
//     });
//     console.log("[background] RESET Complete!");
//   } catch (e) {
//     throw e;
//   }
// };
const handlerOfReset = (tabId, 
// NOTE: 修正： 字幕は予め取得して渡されることとする
subtitles) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("[background] RESET Begin...");
        yield state.set({
            isTranscriptDisplaying: false,
            isSubtitleCaptured: false,
            isSubtitleCapturing: true,
            //   NOTE: 修正: ここではsubtitlesを消去しない
            //   subtitles: [],
        });
        yield resetEachContentScript(tabId);
        // NOTE: 修正: 字幕データはこの関数の外で取得することにする
        // const newSubtitles: subtitle_piece[] = await repeatCaptureSubtitles(tabId);
        yield state.set({
            isSubtitleCaptured: true,
            isSubtitleCapturing: false,
            subtitles: subtitles,
        });
        const resetOrder = yield (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.sendMessageToTabsPromise)(tabId, {
            from: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.background,
            to: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.controller,
            order: [_utils_constants__WEBPACK_IMPORTED_MODULE_0__.orderNames.reset],
        });
        const resetSubtitle = yield (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.sendMessageToTabsPromise)(tabId, {
            from: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.background,
            to: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.controller,
            subtitles: subtitles,
        });
        yield state.set({
            isTranscriptDisplaying: true,
        });
        console.log("[background] RESET Complete!");
    }
    catch (e) {
        throw e;
    }
});
/*****************************************************
 * Handler of hide ExTranscript
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
            // subtitles: [],
        });
        // reset 処理: 各content scritpのリセットを実施する
        yield (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.sendMessageToTabsPromise)(tabId, {
            from: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.background,
            to: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.controller,
            order: [_utils_constants__WEBPACK_IMPORTED_MODULE_0__.orderNames.turnOff],
        });
    }
    catch (e) {
        console.error(e.message);
        throw e;
    }
});
// ---- OTHERS METHODS ----------------------------------------
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
        // const r: iResponse[] = await Promise.all([contentScript, controller]);
        yield Promise.all([contentScript, controller]);
        // const failureReasons: string = r
        //     .filter((_) => {
        //         if (!_.success) {
        //             return _.failureReason;
        //         }
        //     })
        //     .join(' ');
        // if (failureReasons) {
        //     throw new Error(
        //         `Error: While reset content script. ${failureReasons}`
        //     );
        // }
        console.log("[background] DONE resetEachContentScript()");
    }
    catch (e) {
        throw e;
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
        // const r: iResponse[] = await Promise.all([contentScript, controller]);
        yield Promise.all([contentScript, controller]);
        // const failureReasons: string = r
        //     .filter((_) => {
        //         if (!_.success) {
        //             return _.failureReason;
        //         }
        //     })
        //     .join(' ');
        // if (failureReasons) {
        //     throw new Error(
        //         `Error: failed to turn off content script. ${failureReasons}`
        //     );
        // }
        console.log("[background] Done turning off each content scripts");
    }
    catch (e) {
        throw e;
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
// circulaterへ渡すcallback関数
//
// 完全にハードコーディング
// 利用場面に応じて個別に作って
//
// 実際に実行したい関数へ渡さなくてはならない引数はここで渡すこと
// 戻り値は任意であるが、condition関数のgenerics型と同じにすること
const cb = () => __awaiter(void 0, void 0, void 0, function* () {
    const { tabId } = yield state.get();
    const s = yield repeatCaptureSubtitles(tabId);
    return s;
});
// circulaterへ渡すconditon関数
//
// 完全にハードコーディング
// 利用場面に応じて個別に作って
//
// circulaterへ渡す引数callbackの戻り値の型と同じ型をgenericsとして渡すこと
const condition = (operand) => {
    return operand.length ? true : false;
};
/**********************************************
 * circulateRepeatCaptureSubtitles
 *
 *
 * description:
 * repeactCaptureSubtitles()を3回繰り返す関数
 * condition()の条件を満たせば即終了し、
 * repeactCaptureSubtitles()が取得した最後の戻り値を返す
 *
 * UdemyのDOMローディングの時間がかかりすぎる場合に対処するための関数
 * */
const circulateRepeatCaptureSubtitles = (0,_utils_Circulater__WEBPACK_IMPORTED_MODULE_4__.circulater)(cb, condition, 2);
/*****
 * state module
 * _________________________________________________________________
 *
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
            catch (e) {
                console.error(`Error: Problem ocurreud while chrome.storage`);
                throw e;
            }
        }),
        get: () => __awaiter(this, void 0, void 0, function* () {
            try {
                const s = yield _getLocalStorage(KEY_LOCALSTORAGE);
                return Object.assign({}, s[KEY_LOCALSTORAGE]);
            }
            catch (e) {
                console.error(`Error: Problem ocurreud while chrome.storage`);
                throw e;
            }
        }),
        clearAll: () => __awaiter(this, void 0, void 0, function* () {
            try {
                yield chrome.storage.local.remove(KEY_LOCALSTORAGE);
            }
            catch (e) {
                console.error(`Error: Problem ocurreud while chrome.storage`);
                throw e;
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