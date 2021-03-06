/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Error/Error.ts":
/*!****************************!*\
  !*** ./src/Error/Error.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ErrorBase": () => (/* binding */ ErrorBase),
/* harmony export */   "DomManipulationError": () => (/* binding */ DomManipulationError),
/* harmony export */   "PageStatusNotReadyError": () => (/* binding */ PageStatusNotReadyError)
/* harmony export */ });
class Err {
    constructor(message) {
        this.message = message;
        this.name = 'Error'; // (組み込みのエラークラスごとに異なる名前)
    }
}
class ErrorBase extends Err {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}
class DomManipulationError extends ErrorBase {
    constructor(message) {
        super(message);
        this.name = 'DomManipulationError';
    }
}
/***********
 * Among contentScript.js
 * Thrown if subtitle is not English, or Transcript is not opened
 * */
class PageStatusNotReadyError extends ErrorBase {
    constructor(message) {
        super(message);
        this.name = 'PageStatusNotReadyError';
    }
}


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


/***/ }),

/***/ "./src/utils/selectors.ts":
/*!********************************!*\
  !*** ./src/utils/selectors.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "videoContainer": () => (/* binding */ videoContainer),
/* harmony export */   "transcript": () => (/* binding */ transcript),
/* harmony export */   "controlBar": () => (/* binding */ controlBar),
/* harmony export */   "EX": () => (/* binding */ EX)
/* harmony export */ });
/***************************************************
 * SELECTORS
 * ________________________________________________
 *
 *
 *
 *
 * **************************************************/
// --- Selectors related to Transcript ---------------------------
// Udemy講義ページが動画ページならこのセレクタが一致する
// テキストページとかなら一致しない
const videoContainer = "div.video-viewer--container--23VX7";
const transcript = {
    // HTMLSpanElement which is Highlight as current subtitle on movie.
    highlight: "span.transcript--highlight-cue--1bEgq",
    // NodeListOf<HTMLSpanElement> which are list of subtitle element.
    transcripts: "div.transcript--cue-container--wu3UY p.transcript--underline-cue--3osdw span",
    // top element of side bar
    noSidebar: "div.app--no-sidebar--1naXE",
    sidebar: "div.has-sidebar",
    // High level element of Movie element
    movieContainer: "div.app--curriculum-item--2GBGE",
    // Movie Replay button
    replayButton: "button[data-purpose='video-play-button-initial']",
    // Controlbar
    controlbar: "div.control-bar--control-bar--MweER[data-purpose='video-controls']",
    //
};
// --- Selectors related to control bar. -------------------------
const controlBar = {
    // "closed captioning"
    cc: {
        // 字幕メニューpopupボタン
        popupButton: "button[data-purpose='captions-dropdown-button']",
        // textContentで取得できる言語を取得可能
        //   languageList:
        //     "button.udlite-btn.udlite-btn-large.udlite-btn-ghost.udlite-text-sm.udlite-block-list-item.udlite-block-list-item-small.udlite-block-list-item-neutral > div.udlite-block-list-item-content",
        //
        // 言語リストを取得するには一旦languageButtonsを取得してからそれからquerySelectorする
        // いらないかも
        menuCheckButtons: "button",
        menuList: ".udlite-block-list-item-content",
        menuListParent: "ul[role='menu'][data-purpose='captions-dropdown-menu']",
        // 上記のセレクタのラッパーボタン。
        // 属性`aria-checked`で選択されているかどうかわかる
        checkButtons: "button.udlite-btn.udlite-btn-large.udlite-btn-ghost.udlite-text-sm.udlite-block-list-item.udlite-block-list-item-small.udlite-block-list-item-neutral",
    },
    transcript: {
        toggleButton: "button[data-purpose='transcript-toggle']",
    },
    theatre: {
        theatreToggle: "button[data-purpose='theatre-mode-toggle-button']",
    },
};
// --- Selectors related ex-transcript -----------------------
const EX = {
    // Udemy page-specific selector
    sidebarParent: ".app--content-column--HC_i1",
    noSidebarParent: ".app--dashboard-content--r2Ce9",
    movieContainer: ".app--body-container",
    // 独自selector `ex--`を接頭辞とする
    // sidebar ex-transcript selectors
    sidebarWrapper: ".ex--sidebar-column",
    sidebarSection: ".ex--sidebar--sidebar",
    sidebarHeader: ".ex--sidebar--sidebar-header",
    sidebarContent: ".ex--sidebar--content",
    sidebarContentPanel: ".ex--sidebar-content-panel",
    sidebarCueContainer: ".ex--sidebar-transcript--cue-container",
    sidebarFooter: ".ex--sidebar-transcript--autoscroll-wrapper",
    // sidebar width in case more than SIDEBAR_WIDTH_BOUNDARY
    wideView: ".ex--sidebar--wideview",
    // sidebar width in case less than SIDEBAR_WIDTH_BOUNDARY
    middleView: ".ex--sidebar--middleview",
    // bottom ex-transcript selectors
    dashboardTranscriptWrapper: ".ex--dashboard-transcript-wrapper",
    dashboardTranscriptHeader: ".ex--dashboard-transcript--header",
    dashboardTranscriptPanel: ".ex--dashboard-transcript--transcript-panel",
    dashboardTranscriptCueContainer: ".ex--dashboard-transcript--cue-container",
    dashboardTranscriptCue: ".ex--dashboard-transcript--cue--underline",
    dashboardTranscriptCueText: "span[data-purpose='ex--dashboard-cue-text']",
    dashboardTranscriptBottom: ".ex--dashboard-transcript--autoscroll-wrapper",
    // To Highlight Transcriot Cue Container
    highlight: ".--highlight--",
};
// --- LEGACY -------------------------
// sectionTitle: 'div.udlite-text-md.video-viewer--title-overlay--OoQ6e',


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
/*!********************************************!*\
  !*** ./src/contentScript/contentScript.ts ***!
  \********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_selectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/selectors */ "./src/utils/selectors.ts");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/constants */ "./src/utils/constants.ts");
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/helpers */ "./src/utils/helpers.ts");
/* harmony import */ var _Error_Error__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Error/Error */ "./src/Error/Error.ts");
/***********************************************************
static content script
___________________________________________________________


機能：
    1. Udemy講義ページのトランスクリプト機能がONになっているか検知する
    2. Udemy講義ページの字幕の言語が英語になっているか検知する
    3. 1, 2を調査して必要に応じてbackground scriptへ送信する

Injectタイミング:
    動的content scriptとして、
    Udemyの講義ページURLへマッチするwebページにおいて、
    POPUP上の実行ボタンが押されたらinjectされる

通信に関して：
    single message passing機能でbackground.jsと通信する


handlerOfControlbar()でコントロールバー上のクリックイベントを監視する
moControlbarでコントロールバー上でトランスクリプト・トグルボタンが現れたか消えたかを監視する

************************************************************/
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




//
// --- GLOBALS ---------------------------------------------------
//
const INTERVAL_TIME = 500;
let moControlbar = null;
let controlbar = null;
//
// --- chrome API Listeners -------------------------------------
//
/******************************************************
 * @param {iMessage} message
 * @param {function} sendResponse:
 * Invoke this function to response. The function is required.
 * @return {boolean} :
 * `return true` to wait for sendResponse() solved asynchronously.
 * DO NOT return Promise<boolean>.
 * It never works.
 *
 * Any asynchronous function must be solved with Promise Chain.
 * (Or use IIFE to be able to use async/await)
 * And every order should be responsed by invoking sendResponse with `{complete: true}`.
 * */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("CONTENT SCRIPT GOT MESSAGE");
    const { from, order, to } = message;
    const response = {
        from: _utils_constants__WEBPACK_IMPORTED_MODULE_1__.extensionNames.contentScript,
        to: from,
    };
    if (to !== _utils_constants__WEBPACK_IMPORTED_MODULE_1__.extensionNames.contentScript)
        return;
    // ORDERS:
    if (order && order.length) {
        // SEND STATUS
        if (order.includes(_utils_constants__WEBPACK_IMPORTED_MODULE_1__.orderNames.sendStatus)) {
            console.log("Order: SEND STATUS");
            try {
                const isEnglish = isSubtitleEnglish();
                let isOpen = false;
                const toggle = document.querySelector(_utils_selectors__WEBPACK_IMPORTED_MODULE_0__.controlBar.transcript.toggleButton);
                if (!toggle)
                    isOpen = false;
                else
                    isOpen = isTranscriptOpen();
                response.language = isEnglish;
                response.isTranscriptDisplaying = isOpen;
                // response.success = true;
                response.complete = true;
            }
            catch (err) {
                // response.success = false;
                response.error = err;
                response.complete = false;
            }
            finally {
                sendResponse(response);
            }
        }
        // RESET
        if (order.includes(_utils_constants__WEBPACK_IMPORTED_MODULE_1__.orderNames.reset)) {
            console.log("Order: RESET");
            handlerOfReset()
                .then(() => {
                response.success = true;
                response.complete = true;
            })
                .catch((e) => {
                console.error(e.message);
                response.success = false;
                response.complete = false;
                response.error = e;
            })
                .finally(() => {
                sendResponse(response);
            });
        }
        // Require to make sure the page is including movie container or not.
        if (order.includes(_utils_constants__WEBPACK_IMPORTED_MODULE_1__.orderNames.isPageIncludingMovie)) {
            console.log("Order: Is this page including movie container?");
            repeatCheckQueryAcquired(_utils_selectors__WEBPACK_IMPORTED_MODULE_0__.videoContainer, true)
                .then((r) => {
                response.isPageIncludingMovie = r;
                response.complete = true;
            })
                .catch((err) => {
                console.error(err);
                response.complete = false;
                response.error = err;
            })
                .finally(() => {
                sendResponse(response);
            });
        }
        // TURN OFF
        if (order.includes(_utils_constants__WEBPACK_IMPORTED_MODULE_1__.orderNames.turnOff)) {
            console.log("Order: Turn off");
            moControlbar.disconnect();
            controlbar.removeEventListener("click", handlerOfControlbar);
            // TODO: moControlbar, controlbarはnullにする必要があるか？
            response.complete = true;
            sendResponse(response);
        }
        //   ALERT
        if (order.includes(_utils_constants__WEBPACK_IMPORTED_MODULE_1__.orderNames.alert)) {
            displayAlert(message.alertMessage);
            response.complete = true;
            sendResponse(response);
        }
    }
    return true;
});
/*****************************************
 *  Sends status of injected page to background
 * @param order {object}
 * */
const sendToBackground = (order) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("SENDING MESSAGE TO BACKGROUND");
    const { isOpened, isEnglish } = order;
    const m = {
        from: _utils_constants__WEBPACK_IMPORTED_MODULE_1__.extensionNames.contentScript,
        to: _utils_constants__WEBPACK_IMPORTED_MODULE_1__.extensionNames.background,
    };
    if (isOpened !== undefined) {
        m["isTranscriptDisplaying"] = isOpened;
    }
    if (isEnglish !== undefined) {
        m["language"] = isEnglish;
    }
    yield (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.sendMessagePromise)(m);
});
//
// ---- Event Handlers -----------------------------------------
//
/*************************************************
 * Handler of RESET order.
 *
 * controlbar DOMを取得しなおす
 * 伴って、
 * controlbarについているリスナの解除、再設定
 * controlbarを監視するMutationObserverの再設定
 *
 * */
const handlerOfReset = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield initialize();
    }
    catch (e) {
        throw e;
    }
});
/**************************************************
 *  Handler of Click Event on Controlbar
 *
 * @param {PointEvent} ev
 *
 *
 * setTimeout() callback will be fired after click event has been done immediately.
 *
 * */
const handlerOfControlbar = function (ev) {
    // Clickイベント中にDOMを取得しておく...
    // イベントバブリングpath
    const path = ev.composedPath();
    // トランスクリプト・トグルボタン
    const transcriptToggle = document.querySelector(_utils_selectors__WEBPACK_IMPORTED_MODULE_0__.controlBar.transcript.toggleButton);
    // シアターモード・トグルボタン
    const theaterToggle = document.querySelector(_utils_selectors__WEBPACK_IMPORTED_MODULE_0__.controlBar.theatre.theatreToggle);
    // クローズド・キャプション・メニュー
    const ccPopupMenu = document.querySelector(_utils_selectors__WEBPACK_IMPORTED_MODULE_0__.controlBar.cc.menuListParent);
    // [動作確認済] clickイベント完了後に実行したい事柄はsetTimeoutで
    setTimeout(function () {
        // トグルボタンが押されたら
        if (path.includes(transcriptToggle) || path.includes(theaterToggle)) {
            // トランスクリプト・トグルボタンがあるかどうかを確認し、
            // あれば開かれているか調査、
            // なければトランスクリプト非表示として判定する
            let result;
            const t = document.querySelector(_utils_selectors__WEBPACK_IMPORTED_MODULE_0__.controlBar.transcript.toggleButton);
            if (!t)
                result = false;
            else
                result = isTranscriptOpen();
            sendToBackground({ isOpened: result });
        }
        // cc popup menu内部でクリックイベントが起こったら
        // 字幕が変更されたのか調べる
        if (path.includes(ccPopupMenu)) {
            const r = isSubtitleEnglish();
            sendToBackground({ isEnglish: r });
        }
    }, 200);
};
/*****************************************************
 * Check Transcript is opened or not.
 *
 * @returns {boolean}: true for open, false for not open.
 *
 * Get DOM everytime this function invoked.
 * */
const isTranscriptOpen = () => {
    const toggleButton = document.querySelector(_utils_selectors__WEBPACK_IMPORTED_MODULE_0__.controlBar.transcript.toggleButton);
    return toggleButton.getAttribute("aria-expanded") === "true" ? true : false;
};
/****************************************************
 * Check Subtitle language is English or not.
 *
 * @returns {boolean}: true if it's English, false if not.
 * @throws {DomManipulationError} : When dom acquisition failes.
 * Exception might be happen when selector is not matches.
 *
 * Get DOM everytime this function invoked.
 */
const isSubtitleEnglish = () => {
    const listParent = document.querySelector(_utils_selectors__WEBPACK_IMPORTED_MODULE_0__.controlBar.cc.menuListParent);
    const checkButtons = listParent.querySelectorAll(_utils_selectors__WEBPACK_IMPORTED_MODULE_0__.controlBar.cc.menuCheckButtons);
    const menuList = listParent.querySelectorAll(_utils_selectors__WEBPACK_IMPORTED_MODULE_0__.controlBar.cc.menuList);
    if (!listParent || !checkButtons || !menuList)
        throw new _Error_Error__WEBPACK_IMPORTED_MODULE_3__.DomManipulationError("Failed to manipulate DOM");
    let counter = 0;
    let i = null;
    const els = Array.from(checkButtons);
    for (const btn of els) {
        if (btn.getAttribute("aria-checked") === "true") {
            i = counter;
            break;
        }
        counter++;
    }
    // NOTE: 字幕リストで何も選択されていないというのは起こりえないはず
    // なのでこのチェック自体が無意味かも
    if (i === null) {
        throw new Error("Error: [isSubtitleEnglish()] Something went wrong but No language is selected");
    }
    const currentLanguage = Array.from(menuList)[i].innerText;
    if (currentLanguage.includes("English") || currentLanguage.includes("英語"))
        return true;
    else
        return false;
};
//
// --- MutationObserver -----------------------------------------
//
// コントロールバーの子要素だけ追加されたのか削除されたのか知りたいので
// childListだけtrueにする
const config = {
    attributes: false,
    childList: true,
    subtree: false,
};
/*
    NOTE: JavaScript Tips: NodeからElementを取得して、datasetを取得する方法

    record.removedNodes.forEach((node) => {
        console.log(node);
        console.log(node.childNodes[0]);
        console.log(node.childNodes[0].parentElement);
        console.log(
            node.childNodes[0].parentElement.firstElementChild
        );
        console.log(
            node.childNodes[0].parentElement.firstElementChild
                .attributes
        );
        console.log(
            node.childNodes[0].parentElement.firstElementChild.getAttribute(
                'data-purpose'
            )
        );
*/
const moCallback = (mr) => {
    let guard = false;
    mr.forEach((record) => {
        if (record.type === "childList" && !guard) {
            // NOTE: MutationRecord[0]だけしらべればいいので1週目だけでループを止める
            // じゃぁforEach()を使うなという話ではあるけど...
            guard = true;
            // Added Nodes
            record.addedNodes.forEach((node) => {
                const dataPurpose = node.childNodes[0].parentElement.firstElementChild.getAttribute("data-purpose");
                if (dataPurpose && dataPurpose === "transcript-toggle") {
                    console.log("[contentScript] Appeared Transcript Toggle Button");
                    sendToBackground({ isOpened: isTranscriptOpen() });
                }
            });
            // Removed Nodes
            record.removedNodes.forEach((node) => {
                // これで取得できた！！！
                const dataPurpose = node.childNodes[0].parentElement.firstElementChild.getAttribute("data-purpose");
                if (dataPurpose && dataPurpose === "transcript-toggle") {
                    console.log("[contentScript] Disappeared Transcript Toggle Button");
                    sendToBackground({ isOpened: false });
                }
            });
        }
    });
};
//
// ---- Other Methods -------------------------------------------
//
/************************************************
 *
 * 与えられたselectorからDOMが存在するかしらべて
 * 真偽値を返す
 */
const investTheElementIncluded = (selector) => {
    const e = document.querySelector(selector);
    return e ? true : false;
};
/**************************************************
 * Repeat checking if DOM has been acquired.
 * @param {string} selector : selector for dom about to acquire.
 * @param {boolean} timeoutAsResolve: If true, then timeout will not occure error.
 * @return {boolean} : Return boolean result. True as dom acquired. False as not.
 *
 * */
const repeatCheckQueryAcquired = (selector, timeoutAsResolve = false) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.repeatActionPromise)(function () {
            return investTheElementIncluded(selector);
        }, timeoutAsResolve, 100, 10);
    }
    catch (e) {
        throw e;
    }
});
/*************************************************
 * Repeat to try query dom by given selector.
 * @param {string} selector: Selector for dom about to acquire.
 * @return {promise} represents HTMLElement as success.
 * @throws {DomManipulationError}
 *
 * repeatCheckQueryAcquired()でDOMが現れるまで待つ
 * 現れたらDOMを取得して返す
 *
 * 現れないでタイムアウトなら例外を投げる
 * */
const repeatQuerySelector = (selector) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield repeatCheckQueryAcquired(selector);
        return document.querySelector(selector);
    }
    catch (err) {
        throw new _Error_Error__WEBPACK_IMPORTED_MODULE_3__.DomManipulationError(`DomManipulationError: Could not get DOM by selector ${selector}`);
    }
});
/************************************************
 * alert() on injected page.
 *
 * */
const displayAlert = (message) => {
    alert(message);
};
/*****************************************
 *  Initialize for detecting injected page status.
 *
 *  set up controlbar click event listener.
 *  set up MutationObserver of controlbar.
 * */
const initialize = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("CONTENT SCRIPT INITIALIZING...");
    try {
        // いったんMutationObserverを停止してから...
        if (moControlbar)
            moControlbar.disconnect();
        moControlbar = null;
        moControlbar = new MutationObserver(moCallback);
        // controlbarのDOMを再取得
        if (controlbar)
            controlbar.removeEventListener("click", handlerOfControlbar);
        controlbar = null;
        controlbar = yield repeatQuerySelector(_utils_selectors__WEBPACK_IMPORTED_MODULE_0__.transcript.controlbar);
        controlbar.addEventListener("click", handlerOfControlbar);
        // 再度、更新済のDOMに対してMutationObserverを設置する
        moControlbar.observe(controlbar, config);
        console.log("content script initialize has been done");
    }
    catch (err) {
        if (err instanceof _Error_Error__WEBPACK_IMPORTED_MODULE_3__.DomManipulationError)
            console.error(`DomManipulationError: ${err.message}`);
        throw err;
    }
});
/**********************************************
 * Entry Point
 *
 * */
(function () {
    initialize().catch((e) => {
        chrome.runtime.sendMessage({
            from: _utils_constants__WEBPACK_IMPORTED_MODULE_1__.extensionNames.contentScript,
            to: _utils_constants__WEBPACK_IMPORTED_MODULE_1__.extensionNames.background,
            success: false,
            error: e,
        });
    });
})();
//
// --- LEGACY CODE ---------------------------------------------
//
// const initialize = async (): Promise<void> => {
//   console.log("CONTENT SCRIPT INITIALIZING...");
//   try {
//     // Set up listeners
//     const w: number = document.documentElement.clientWidth;
//     if (w > TOGGLE_VANISH_BOUNDARY) {
//       const toggleButton: HTMLElement = document.querySelector<HTMLElement>(
//         selectors.controlBar.transcript.toggleButton
//       );
//       toggleButton.addEventListener(
//         "click",
//         transcriptToggleButtonHandler,
//         false
//       );
//       isWindowTooSmall = false;
//     } else {
//       isWindowTooSmall = true;
//     }
//     window.addEventListener("resize", function () {
//       clearTimeout(timerQueue);
//       timerQueue = setTimeout(onWindowResizeHandler, RESIZE_TIMER);
//     });
//     const ccButton: HTMLElement = document.querySelector<HTMLElement>(
//       selectors.controlBar.cc.popupButton
//     );
//     ccButton.addEventListener("click", ccPopupButtonHandler, true);
//     console.log("content script initialize has been done");
//   } catch (err) {
//     console.error(err.message);
//   }
// };
// -- LEGACY CODE -----------------------------------------------
// THESE selectors MOVED TO './constansInContentScrip/ts'
// 12/28
//
// const _selectors = {
//     controlBar: {
//         // "closed captioning"
//         cc: {
//             // 字幕メニューpopupボタン
//             popupButton: "button[data-purpose='captions-dropdown-button']",
//             // textContentで取得できる言語を取得可能
//             //   languageList:
//             //     "button.udlite-btn.udlite-btn-large.udlite-btn-ghost.udlite-text-sm.udlite-block-list-item.udlite-block-list-item-small.udlite-block-list-item-neutral > div.udlite-block-list-item-content",
//             //
//             // 言語リストを取得するには一旦languageButtonsを取得してからそれからquerySelectorする
//             // いらないかも
//             menuCheckButtons: 'button',
//             menuList: '.udlite-block-list-item-content',
//             menuListParent:
//                 "ul[role='menu'][data-purpose='captions-dropdown-menu']",
//             // 上記のセレクタのラッパーボタン。
//             // 属性`aria-checked`で選択されているかどうかわかる
//             checkButtons:
//                 'button.udlite-btn.udlite-btn-large.udlite-btn-ghost.udlite-text-sm.udlite-block-list-item.udlite-block-list-item-small.udlite-block-list-item-neutral',
//         },
//         transcript: {
//             toggleButton: "button[data-purpose='transcript-toggle']",
//         },
//     },
//     sectionTitle: 'div.udlite-text-md.video-viewer--title-overlay--OoQ6e',
// };
// const initialize = (): void => {
//     // Set up transcript check
//     const isOpen: boolean = isTranscriptOpen();
//     sendToBackground({ isOpened: isOpen });
//     const e: HTMLElement = document.querySelector<HTMLElement>(
//         SELECTORS.controlBar.transcript.toggleButton
//     );
//     e.addEventListener('click', transcriptToggleButtonHandler, false);
//     // Set up language check
//     const isEnglish: boolean = isSubtitleEnglish();
//     sendToBackground({ isEnglish: isEnglish });
//     const b: HTMLElement = document.querySelector<HTMLElement>(
//         SELECTORS.controlBar.cc.popupButton
//     );
//     b.addEventListener('click', ccPopupButtonHandler, true);
//     // Send section title to background
//     sendTitle();
// };
/**
 * Callback of ClickEvent on CC Popup BUTTON
 *
 * Check if ClosedCaption Popup menu is opened.
 * If it's opened, then add onClick event listener to document
 * to detect subtitle change.
 *
 * NOTE: 変化タイミングの誤差のため"aria-expanded"がfalseの時にイベントリスナを取り付ける
 * */
// const ccPopupButtonHandler = (ev: MouseEvent): void => {
//     // popupメニューが開かれているかチェック
//     // 開かれているならclickリスナをメニューラッパーとdocumentに着ける
//     // とにかく
//     // メニューの外側をクリックしたらすべてのリスナをremoveする
//     console.log('CC popup button was clicked');
//     // is it opening?
//     const e: HTMLElement = document.querySelector<HTMLElement>(
//         selectors.controlBar.cc.popupButton
//     );
//     // aria-expanded === trueのときになぜかfalseを返すので
//     // 反対の結果を送信する
//     if (e.getAttribute('aria-expanded') !== 'true') {
//         // CC popupメニューが表示された
//         document.removeEventListener('click', ccPopupMenuClickHandler, true);
//         document.addEventListener('click', ccPopupMenuClickHandler, true);
//     }
// };
/**
 * ブラウザウィンドウがX軸方向に境界線をまたいだときだけ機能する
 *
 * */
// const onWindowResizeHandler = (ev): void => {
//     const w: number = document.documentElement.clientWidth;
//     console.log(w);
//     // When window shrinks less than the boundary
//     // Then send status.
//     if (w < TOGGLE_VANISH_BOUNDARY && !isWindowTooSmall) {
//         console.log('window is too small');
//         isWindowTooSmall = true;
//         // windowサイズが小さくなりすぎると、トグルボタンのDOMは消えるから
//         // イベントリスナはremoveする必要がないけど、
//         // 念のため
//         const toggleButton: HTMLElement = document.querySelector<HTMLElement>(
//             selectors.controlBar.transcript.toggleButton
//         );
//         if (!toggleButton) {
//             sendToBackground({ isOpened: false });
//         }
//     }
//     // When window bend over vanish boundary
//     // Then reset toggle button to add listener.
//     if (w >= TOGGLE_VANISH_BOUNDARY && isWindowTooSmall) {
//         console.log('window is not small');
//         isWindowTooSmall = false;
//         const toggleButton: HTMLElement = document.querySelector<HTMLElement>(
//             selectors.controlBar.transcript.toggleButton
//         );
//         toggleButton.addEventListener(
//             'click',
//             transcriptToggleButtonHandler,
//             false
//         );
//     }
// };
/**
 * Callback of ClickEvent on toggle button of Transcript.
 *
 * NOTE: When click event fired, "aria-expanded" is not change its value yet.
 * So if this get true, then take that as "aria-expanded" about to be false.
 * */
// const transcriptToggleButtonHandler = (ev?: MouseEvent): void => {
//     const latest: HTMLElement = document.querySelector<HTMLElement>(
//         selectors.controlBar.transcript.toggleButton
//     );
//     // "aria-expanded"変更直前の値なので反対を返す
//     latest.getAttribute('aria-expanded') === 'true'
//         ? sendToBackground({ isOpened: false })
//         : sendToBackground({ isOpened: true });
// Transcriptが消えるブラウザウィンドウX軸の境界値
// const TOGGLE_VANISH_BOUNDARY: number = 584;
// Transcriptがブラウザサイズによって消えているのかどうか
// let isWindowTooSmall: boolean;
// windowのonResizeイベント発火遅延用
// let timerQueue: NodeJS.Timeout = null;
// /**
//  * Callback of ClickEvent on CC Popup MENU
//  *
//  * If user click outside of menu,
//  * check subtitle has been changed.
//  * If so, notify to background and remove listener from document.
//  * Click inside do nothing.
//  * */
//  const ccPopupMenuClickHandler = (ev: PointerEvent): void => {
//   console.log('[contentScript] ccPopupMenuClickHandler()...');
//   const menu: HTMLElement = document.querySelector<HTMLElement>(
//       selectors.controlBar.cc.menuListParent
//   );
//   const path: EventTarget[] = ev.composedPath();
//   if (path.includes(menu)) {
//       // menuの内側でclickが発生した
//       // 何もしない
//       console.log('[ccPopupMenuClickHandler()] clicked inside');
//   } else {
//       console.log('[ccPopupMenuClickHandler()] clicked outside');
//       // menuの外側でclickが発生した
//       // 字幕が変更されたかチェックして結果を送信する
//       const r: boolean = isSubtitleEnglish();
//       sendToBackground({ isEnglish: r });
//       document.removeEventListener('click', ccPopupMenuClickHandler, true);
//   }
// };
// /****
//  * @param {selector} string : Selector for DOM about to capture.
//  * @return {promise} HTMLElement : Resolved when matched, rejected when times out or not matched.
//  *
//  * 取得元のwebページがローディング中などでなかなかすぐにDOMがロードされないときとかに使う
//  * 指定のDOMが取得できるまで、繰り返し取得を試みる
//  * １０回取得を試みても取得できなかったらnullを返す
//  * */
//  const repeatQueryDom = async (selector: string): Promise<HTMLElement> => {
//     return new Promise((resolve, reject): void => {
//         let intervalId: NodeJS.Timer;
//         let counter: number = 10;
//         intervalId = setInterval(function () {
//             if (counter <= 0) {
//                 // Failed
//                 console.log("[repeatQueryDom] Time out! It's over 10 times");
//                 clearInterval(intervalId);
//                 reject(null);
//             }
//             console.log('[repeatQueryDom] query dom');
//             const e: HTMLElement = document.querySelector(selector);
//             if (e) {
//                 // Succeed
//                 console.log('[repeatQueryDom] Succeeed to query dom!');
//                 clearInterval(intervalId);
//                 resolve(e);
//             } else counter--;
//         }, INTERVAL_TIME);
//     });
// };

})();

/******/ })()
;
//# sourceMappingURL=contentScript.js.map