/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/utils/constants.ts":
/*!********************************!*\
  !*** ./src/utils/constants.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "extensionStatus": () => (/* binding */ extensionStatus),
/* harmony export */   "extensionNames": () => (/* binding */ extensionNames),
/* harmony export */   "orderNames": () => (/* binding */ orderNames),
/* harmony export */   "port_names": () => (/* binding */ port_names)
/* harmony export */ });
/**************************************************
 * constants
 * ________________________________________________
 *
 * iMessageがぐちゃぐちゃだったので次のようにまとめた
 *
 * - orderNamesは拡張機能にやってほしいことを示す命令だけにした
 * - 命令に対する返答ややり取りするデータなどはすべてiMessageのプロパティとした
 *
 * >>検証内容<<
 *
 * 正常に機能するのかテスト
 * iMessage.orderをオブジェクトにするか配列にするか検証
 *
 *
 *
 * ************************************************/
//
// Changed Name
//
const extensionStatus = {
    working: 'working',
    notWorking: 'notWorking',
    idle: 'idle',
};
const extensionNames = {
    popup: 'popup',
    contentScript: 'contentScript',
    controller: 'controller',
    option: 'option',
    background: 'background',
};
//
// Updated
//
const orderNames = {
    // Inject content script order
    injectCaptureSubtitleScript: 'injectCaptureSubtitleScript',
    injectExTranscriptScript: 'injectExTranscriptScript',
    // From background to contentScript
    sendStatus: 'sendStatus',
    // from controller to background
    sendSubtitles: 'sendSubtitles',
    // from contentScript to background
    sendSectionTitle: 'sendSectionTitle',
    // order to disconnect port
    disconnect: 'disconnect',
    // DELETED
    //
    // transcriptOpened: 'transcriptOpened',
    // transcriptClosed: 'transcriptClosed',
    // languageIsEnglish: 'languageIsEnglish',
    // languageIsNotEnglish: 'languageIsNotEnglish',
    // loading: 'loading',
    // loaded: 'loaded',
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
/* harmony export */   "sendMessagePromise": () => (/* binding */ sendMessagePromise)
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
const sendMessageToTabsPromise = (tabId, message, callback) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        chrome.tabs.sendMessage(tabId, message, (response) => __awaiter(void 0, void 0, void 0, function* () {
            // 
            // NOTE:
            // 
            // responseが返されることが前提になっている
            // なのでsendResponse()実行する側が引数を渡さなかった
            // 
            // もしくはsendResponse()をそもそも実行しなかったら
            // 以下でエラーが起こる可能性がある
            const { complete } = response, rest = __rest(response, ["complete"]);
            if (complete) {
                if (callback && typeof callback === 'function') {
                    yield callback(rest);
                    resolve();
                }
                else {
                    resolve(rest);
                }
            }
            else
                reject('Send message to tabs went something wrong');
        }));
    }));
});
const sendMessagePromise = (message, callback) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        chrome.runtime.sendMessage(message, (response) => __awaiter(void 0, void 0, void 0, function* () {
            const { complete } = response, rest = __rest(response, ["complete"]);
            if (complete) {
                if (callback && typeof callback === 'function') {
                    yield callback(rest);
                    resolve();
                }
                else {
                    resolve(rest);
                }
            }
            else
                reject('Send message to extension went something wrong');
        }));
    }));
});


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
/****************************************************
 * sendMessageのPromise化関数が機能するか、
 * また使い方に制限があるのかの確認
 *________________________________________________
 *  "../utils/helpers"::sendMessagePromiseの
 * 使い方を確認する
 *
 * 検証内容：
 * 1. sendResponse()を返さなかったどうなるか
 * 2. sendResponse()を引数なしで実行したらどうなるか
 * 3. 正しい使い方の模索
 *
 *************************************************/


// --- LISTENERS -----------------------------------
chrome.runtime.onInstalled.addListener(() => {
    console.log('BACKGROUND RUNNING...');
});
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('[background] ONMESSAGE');
    console.log(message);
    const { from, to, order } = message, rest = __rest(message, ["from", "to", "order"]);
    console.log(rest);
    if (to !== _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.background)
        return;
    if (order && order.length) {
        //
        // DEBUG:
        //
        // 検証１：sendResponse()を実行しなかったら
        // 呼び出し側はどうなるか
        //
        console.log('[background] GOT ORDER');
        if (order.includes(_utils_constants__WEBPACK_IMPORTED_MODULE_0__.orderNames.sendStatus)) {
            console.log('SEND STATUS');
            sendResponse({ complete: true });
        }
        if (order.includes(_utils_constants__WEBPACK_IMPORTED_MODULE_0__.orderNames.disconnect)) {
            console.log('DISCONNECT');
            sendResponse({ complete: true });
        }
        if (order.includes(_utils_constants__WEBPACK_IMPORTED_MODULE_0__.orderNames.injectCaptureSubtitleScript)) {
            console.log('injectCaptureSubtitleScript');
            sendResponse({ complete: true });
        }
        if (order.includes(_utils_constants__WEBPACK_IMPORTED_MODULE_0__.orderNames.injectExTranscriptScript)) {
            console.log('injectExTranscriptScript');
            sendResponse({ complete: true });
        }
    }
    if (rest.activated) {
        console.log('[background] content script has been activated');
        sendResponse({ complete: true });
    }
    if (rest.language) {
        console.log('[background] correct language');
        sendResponse({ complete: true });
    }
    return true;
}));
chrome.tabs.onUpdated.addListener((tabId, changeInfo, Tab) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('TAB UPDATED...');
    // const _tabId: number = await checkTabIsCorrect(
    //     /https:\/\/developer.mozilla.org\/ja\//);
    // if(_tabId)messageSender(_tabId);
}));
const checkTabIsCorrect = (pattern) => __awaiter(void 0, void 0, void 0, function* () {
    // https://www.udemy.com/course/*
    try {
        const w = yield chrome.windows.getCurrent();
        const tabs = yield chrome.tabs.query({
            active: true,
            windowId: w.id,
        });
        const tab = tabs[0];
        const result = tab.url.match(pattern);
        if (result) {
            return tab.id;
        }
        else {
            return null;
        }
    }
    catch (err) {
        if (err === chrome.runtime.lastError) {
            console.error(err.message);
        }
        else {
            console.log(err);
        }
    }
});
const messageSender = (tabId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.sendMessageToTabsPromise)(tabId, {
            to: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.contentScript,
            from: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.background,
            activated: true,
        });
        if (response)
            console.log(response);
        const response2 = yield (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.sendMessageToTabsPromise)(tabId, {
            to: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.contentScript,
            from: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.background,
            order: [_utils_constants__WEBPACK_IMPORTED_MODULE_0__.orderNames.sendStatus, _utils_constants__WEBPACK_IMPORTED_MODULE_0__.orderNames.disconnect],
        });
        if (response2)
            console.log(response2);
        const response3 = yield (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.sendMessageToTabsPromise)(tabId, {
            to: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.contentScript,
            from: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.background,
            language: true,
            order: [
                _utils_constants__WEBPACK_IMPORTED_MODULE_0__.orderNames.injectCaptureSubtitleScript,
                _utils_constants__WEBPACK_IMPORTED_MODULE_0__.orderNames.injectExTranscriptScript,
            ],
        });
        if (response3)
            console.log(response3);
        const response4 = yield (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.sendMessageToTabsPromise)(tabId, {
            to: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.contentScript,
            from: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.background,
            title: 'Awesome title',
            complete: true,
        });
        if (response4)
            console.log(response4);
    }
    catch (err) {
        console.error(err.message);
    }
});

})();

/******/ })()
;
//# sourceMappingURL=background.js.map