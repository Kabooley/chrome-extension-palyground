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
;
// base object for State<iProgress>
const progressBase = {
    isContentScriptInjected: false,
    isCaptureSubtitleInjected: false,
    isControllerInjected: false,
    isSubtitleCapturing: false,
    isSubtitleCaptured: false,
    isTranscriptRestructured: false
};
;
;
;
// modelBaseは新規プロパティの追加も削除もない
const modelBase = {
    isContentScriptInjected: false,
    isCaptureSubtitleInjected: false,
    isControllerInjected: false,
    isSubtitleCapturing: false,
    isSubtitleCaptured: false,
    isTranscriptRestructured: false,
    isTranscriptON: false,
    isEnglish: false,
    isWindowTooSmall: false,
    tabId: null,
    url: null,
    subtitles: null,
};


/***/ }),

/***/ "./src/utils/LocalStorage.ts":
/*!***********************************!*\
  !*** ./src/utils/LocalStorage.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LocalStorage": () => (/* binding */ LocalStorage)
/* harmony export */ });
/*
    chrome.storage.localのclass化
    ___________________________________________

    NOTE:
        1. インスタンスにつき一つだけlocalStorageへ保存するためのkeyを登録できる
            なので一つのkeyに対するデータだけ保存できる

        2. ~loadが返すのは{_key: 保存したデータ}であることに注意~
            ~なので保存したデータだけに用がある場合がほ飛んだと思うので~
            ~利用する側はそのまま使ってしまわないように注意~
        load()のreturn する値を変更した

    
*/
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class LocalStorage {
    constructor(_key) {
        this._key = _key;
    }
    _getLocalStorage(_key) {
        return new Promise((resolve, reject) => {
            // chrome.storage.local.get()はPromiseチェーンみたいなもの
            chrome.storage.local.get(_key, (s) => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                }
                resolve(s);
            });
        });
    }
    save(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const obj = { [this._key]: data };
                yield chrome.storage.local.set(obj);
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
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this._getLocalStorage(this._key);
                // return data;
                // 保存されたデータだけを返すようにした
                return data[this._key];
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
    }
    clearAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield chrome.storage.local.remove(this._key);
        });
    }
}
// -- USAGE --------------
//
// const ls_sectionTitle = new LocalStorage<string>("key_section_title");
// await ls_sectionTitle.save(someStringdata);
// const data = await ls_sectionTitle.load();


/***/ }),

/***/ "./src/utils/background/State.ts":
/*!***************************************!*\
  !*** ./src/utils/background/State.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _LocalStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../LocalStorage */ "./src/utils/LocalStorage.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers */ "./src/utils/helpers.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/********************************************************
 * State class
 * ______________________________________________________
 *
 * NOTE:
 * 前提 : chrome.storage.localの使用
 * インスタンスには必ずオブジェクトを渡すこと
 * stringやnumberなどそのまま渡さないこと
 * 必ずkey-valueペアのオブジェクトを渡すこと
 *
 *
 * UPDATE:
 * - <TYPE extends object>でobjectだよってTypeScriptエンジンに伝えることができる
 *
 * ******************************************************/


// @param key {string}: key for chrome.storage.local
class State {
    constructor(key) {
        this._key = key;
        this._localStorage = new _LocalStorage__WEBPACK_IMPORTED_MODULE_0__.LocalStorage(this._key);
    }
    setState(prop) {
        return __awaiter(this, void 0, void 0, function* () {
            this._state = Object.assign(Object.assign({}, this._state), prop);
            try {
                yield this._localStorage.save(this._state);
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
    }
    getState() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const s = yield this._localStorage.load();
                this._state = Object.assign(Object.assign({}, this._state), s);
                return (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.deepCopier)(this._state);
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
    }
    clearStorage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._localStorage.clearAll();
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
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (State);
// --- USAGE -------------------------------------------------
//
// もしもbackground.tsへ組み込むことになっていたらとして...
//
// chrome.runtime.onInstalled.addListener(
//   async (details: chrome.runtime.InstalledDetails) => {
//       console.log('BACKGROUND RUNNING...');
//       console.log(details.reason);
//       stateList.clearStorage("stateExtension");
//       stateList.setState<iState>("stateExtension", {
//           scripts: {
//               popup: 'notWorking',
//               contentScript: 'notWorking',
//               controller: 'notWorking',
//               option: 'notWorking',
//           },
//           pageStatus: {
//               isTranscriptOn: false,
//               isEnglish: false,
//               isWindowTooSmall: false,
//           },
//           progress: {
//               capturing: false,
//               captured: false,
//               stored: false,
//               restructured: false,
//           },
//       })
//   }
// );
// // set up
// const setupState = (): void => {
//   // state of iState
//   const key__extensionState: string = 'key__local_storage_state';
//   const stateExtension = new State<iState>(key__extensionState);
//   // state of subtitle_piece[]
//   const key__subtitles: string = 'key__local_storage_subtitle';
//   const stateSubtitles = new State<subtitle_piece[]>(key__subtitles);
//   // state of tabId
//   const key__tabId: string = 'key__tabId';
//   const stateTabId = new State<number>(key__tabId);
//   // state of sectionTitle
//   const key__sectionTitle: string = 'key__sectionTitle';
//   const stateSectionTitle = new State<string>(key__sectionTitle);
//   // Register instances.
//   stateList.register<iState>("stateExtension", stateExtension);
//   stateList.register<subtitle_piece[]>("stateSubtitles", stateSubtitles);
//   stateList.register<number>("stateTabId", stateTabId);
//   stateList.register<string>("stateSectionTitle", stateSectionTitle);
// };
// // ---- MODULES --------------------------------------------------
// interface iStateList {
//   register: <TYPE>(name: string, instance: State<TYPE>) => void;
//   unregister: (name: string) => void;
//   setState: <TYPE>(name: string, data: TYPE) => Promise<void>;
//   getState: <TYPE>(name: string)=> Promise<TYPE>;
//   clearStorage:(name: string) => Promise<void>;
// };
// // Stateのインスタンスを保存しておく場所
// // インスタンスをどこからでも呼出せるようにするためと、
// // インスタンスをグローバル変数にしたくないからこんな面倒をしている
// //
// // background scriptがアンロードされる可能性を考えて
// // 再ロードされても大丈夫にしておく
// // ということで内部でインスタンスを呼び出し、登録する
// const stateList: iStateList = (function () {
//     console.log("stateList module invoked");
//   // _list will store these properties.
//   // この場合の_listのAnnotationの仕方がわからない
//   // _list = {
//   //     stateSectionTitle: stateSectionTitle,
//   //     stateExtension: stateExtension,
//   //     stateSubtitles: stateSubtitles,
//   //     stateTabId: stateTabId,
//   // }
//   var _list = {};
//   setupState();
//   return {
//       register: <TYPE>(name: string, instance: State<TYPE>): void => {
//           _list[name] = instance;
//       },
//       unregister: (name: string): void => {
//           // これでinstanceもさくじょしていることになるかしら
//           delete _list[name];
//       },
//       setState: async <TYPE>(name: string, data: TYPE): Promise<void> => {
//           await _list[name].setState(data);
//       },
//       // Genericsは手続きが面倒かしら?
//       getState: async <TYPE>(name: string): Promise<TYPE> => {
//           return _list[name].getState();
//       },
//       clearStorage: async(name: string): Promise<void> => {
//           await _list[name].clearStorage();
//       },
//       // 以下の呼出が問題を起こさなければこっちのほうがいいんだけどね
//       // caller: <TYPE>(name: string): State<TYPE> => {
//       //     return _list[name];
//       // }
//   };
// })();
// // USAGE stateList
// const current = stateList.getState<iState>("stateExtension");


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
/* harmony export */   "tabsQuery": () => (/* binding */ tabsQuery)
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
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "state": () => (/* binding */ state)
/* harmony export */ });
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/constants */ "./src/utils/constants.ts");
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/helpers */ "./src/utils/helpers.ts");
/* harmony import */ var _utils_background_State__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/background/State */ "./src/utils/background/State.ts");
/* harmony import */ var _annotations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./annotations */ "./src/background/annotations.ts");
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
// --- Chrome API Listeners ---------------------------------
//
/***
 * chrome.runtime.onInstalled.addListener():
 *
 * Initialize State as iModel.
 * Always clear storage.
 * Set modelBase as initiali value.
 * */
chrome.runtime.onInstalled.addListener((details) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`[background] onInstalled: ${details.reason}`);
    try {
        state.unregister();
        yield state.register(new _utils_background_State__WEBPACK_IMPORTED_MODULE_2__["default"](_utils_constants__WEBPACK_IMPORTED_MODULE_0__._key_of_model_state__));
        yield state.getInstance().clearStorage();
        yield state.getInstance().setState(_annotations__WEBPACK_IMPORTED_MODULE_3__.modelBase);
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
chrome.tabs.onUpdated.addListener((tabIdUpdatedOccured, changeInfo, Tab) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(changeInfo);
    // "https://www.udemy.com/course/*"以外のURLなら無視する
    const _state = state.getInstance();
    const { url, tabId, isTranscriptRestructured } = yield _state.getState();
    // 拡張機能が未展開、changeInfo.statusがloadingでないなら無視する
    if (changeInfo.status !== "loading" || !isTranscriptRestructured)
        return;
    // 拡張機能が展開済だとして、tabIdが展開済のtabId以外に切り替わったなら無視する
    // return;
    if (tabIdUpdatedOccured !== tabId)
        return;
    // 展開中のtabId && chnageInfo.urlがUdemy講義ページ以外のURLならば
    // 拡張機能OFFの処理へ
    if (isTranscriptRestructured && tabIdUpdatedOccured === tabId) {
        // おなじURLでのリロードか？
        if (changeInfo.url === undefined) {
            // 拡張機能は何もしない
            return;
        }
        else if (!changeInfo.url.match(_utils_constants__WEBPACK_IMPORTED_MODULE_0__.urlPattern)) {
            // Udemy講義ページ以外に移動した
            // TODO: 拡張機能OFF処理へ
            console.log("[background] OFF this extension");
        }
        // 展開中のtabIdである && changeInfo.urlが講義ページだけど末尾が変化した(#以下は無視)
        // 動画が切り替わった判定
        else if (changeInfo.url.match(_utils_constants__WEBPACK_IMPORTED_MODULE_0__.urlPattern) && changeInfo.url !== url) {
            // 動画が切り替わった
            // TODO: リセット処理へ
            console.log("[background] RESET this extension");
            const result = yield handlerOfReset(tabIdUpdatedOccured, changeInfo.url);
        }
    }
}));
/**
 *
 *
 * */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.to !== _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.background)
        return;
    sortMessage(message, sender, sendResponse);
    // NOTE: YOU SHOULD RETURN TRUE
    // If you wanna use asynchronous function.
    return true;
});
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
 *
 *
 * */
const handlerOfPopupMessage = (message, sender, sendResponse) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("[background] Message from Popup");
    try {
        const { order } = message, rest = __rest(message, ["order"]);
        if (order && order.length) {
            // DEBUG: make sure what message got
            console.log("[background] Validate URL");
            //
            // popupが開かれるたびに呼び出される処理
            //
            // なのでurlが正しいかだけを返信する
            // Stateを変更しない
            if (order.includes(_utils_constants__WEBPACK_IMPORTED_MODULE_0__.orderNames.inquireUrl)) {
                const isValidPage = yield handlerOfVerifyValidPage();
                sendResponse({ correctUrl: isValidPage, complete: true });
            }
            // 拡張機能の実行命令
            if (order.includes(_utils_constants__WEBPACK_IMPORTED_MODULE_0__.orderNames.run)) {
                // DEBUG: make sure what message got
                console.log("[background] RUN");
                //
                const isSuccess = yield handlerOfRun();
                // sendResponse({ successDeployment: isSuccess, complete: true });
                if (!isSuccess) {
                    // ここでエラーを出すのか
                    // handlerOfRunでエラーを出すのか
                    // 未定
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
/**
 *
 *
 * */
const handlerOfContentScriptMessage = (message, sender, sendResponse) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("[background] Message from contentScript.js");
    try {
        const { order } = message, rest = __rest(message, ["order"]);
        if (order && order.length) {
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
const handlerOfCaptureSubtitleMessage = (message, sender, sendResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (err) {
        console.error(err.message);
    }
});
/**
 *
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
 *
 *
 * */
const handlerOfVerifyValidPage = (_url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let url = "";
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
const handlerOfRun = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _state = state.getInstance();
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
        yield _state.setState({ url: url, tabId: id });
        //<phase 2> inject contentScript.js
        const { tabId } = yield _state.getState();
        yield chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["contentScript.js"],
        });
        yield _state.setState({ isContentScriptInjected: true });
        // TODO: ここでcontentScript.jsが展開完了したのを確認したうえで次に行きたいのだが...実装する技術がない...
        const { language, transcript } = yield (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.sendMessageToTabsPromise)(tabId, {
            from: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.background,
            to: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.contentScript,
            order: [_utils_constants__WEBPACK_IMPORTED_MODULE_0__.orderNames.sendStatus],
        });
        // 結果がどうあれ現状の状態を保存する
        yield _state.setState({
            isEnglish: language,
            isTranscriptON: transcript,
        });
        // 字幕が英語じゃない、またはトランスクリプトがONでないならば
        // キャンセル
        if (!language || !transcript) {
            // TODO: 失敗またはキャンセルの方法未定義...
            // ひとまずfalseを返している
            return false;
        }
        // <phase 3> inject captureSubtitle.js
        // 字幕データを取得する
        yield chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["captureSubtitle.js"],
        });
        yield _state.setState({ isCaptureSubtitleInjected: true });
        // TODO: ここでcontent scriptが展開完了したのを確認したうえで次に行きたいのだが...
        const { subtitles } = yield (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.sendMessageToTabsPromise)(tabId, {
            from: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.background,
            to: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.captureSubtitle,
            order: [_utils_constants__WEBPACK_IMPORTED_MODULE_0__.orderNames.sendSubtitles],
        });
        // TODO: subtitlesのデータがおかしくないか検査したい
        // 条件分岐で検査に合格したら字幕データを保存
        // 不合格でエラー
        yield _state.setState({ subtitles: subtitles });
        // <phase 4> inject controller.js
        yield chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["controller.js"],
        });
        yield _state.setState({ isControllerInjected: true });
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
        const s = yield _state.getState();
        yield (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.sendMessageToTabsPromise)(tabId, {
            from: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.background,
            to: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.controller,
            subtitles: s.subtitles,
        });
        yield _state.setState({ isTranscriptRestructured: true });
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
        console.log("[background] RESET Begin...");
        const _state = state.getInstance();
        // stateの更新：
        // urlをtabs.onUpdatedが起こったときのURLにする
        yield _state.setState({
            url: newUrl,
            isTranscriptRestructured: false,
            isSubtitleCaptured: false,
            isSubtitleCapturing: true,
            // TODO: 既存配列変数を再度空にするのはこの方法で大丈夫なのか?
            //
            subtitles: [],
        });
        // reset 処理:
        // 各content scritpのリセットを実施する
        const isResetSuccess = yield resetEachContentScript(tabId);
        if (!isResetSuccess) {
            throw new Error("Failed to reset");
        }
        // 成功したとして、
        // データ再取得処理
        const resFromCaptureSubtitle = yield (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.sendMessageToTabsPromise)(tabId, {
            from: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.background,
            to: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.captureSubtitle,
            order: [_utils_constants__WEBPACK_IMPORTED_MODULE_0__.orderNames.sendSubtitles],
        });
        // TODO: Validate subtitles data.
        //
        // If okay, then save subtitles data.
        yield _state.setState({
            isSubtitleCaptured: true,
            isSubtitleCapturing: false,
            subtitles: resFromCaptureSubtitle.subtitles,
        });
        const isRestructured = yield (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.sendMessageToTabsPromise)(tabId, {
            from: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.background,
            to: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.controller,
            subtitles: resFromCaptureSubtitle.subtitles,
        });
        if (!isRestructured.success) {
            throw new Error("Error: Failed to restructure ExTranscript");
        }
        yield _state.setState({
            isTranscriptRestructured: true,
        });
        // ここまで何も問題なければRESET成功
        console.log("[background] RESET Complete!");
        return true;
    }
    catch (err) {
        console.error(err.message);
    }
});
/**
 * handler of Turn Off function of this extension
 * ________________________________________
 *
 *
 * */
// const handlerOfTrunOff = async (): Promise<boolean> => {
//   try {
//   } catch (err) {
//     console.error(err.message);
//   }
// };
/**
 *
 *
 * TODO:
 * - 処理中の失敗を段階ごとに理由と一緒に返せるようにしたい
 * */
const resetEachContentScript = (tabId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // すべてリセット成功したとして...
        const captureSubtitle = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.sendMessageToTabsPromise)(tabId, {
            from: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.background,
            to: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.captureSubtitle,
            order: [_utils_constants__WEBPACK_IMPORTED_MODULE_0__.orderNames.reset],
        });
        const controller = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.sendMessageToTabsPromise)(tabId, {
            from: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.background,
            to: _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.controller,
            order: [_utils_constants__WEBPACK_IMPORTED_MODULE_0__.orderNames.reset],
        });
        const results = yield Promise.all([
            captureSubtitle,
            controller,
        ]);
        // TODO: 以下、もっとわかりやすくして
        //
        const failures = results.filter((r) => {
            if (!r.success)
                return r;
        });
        if (failures.length) {
            throw new Error(`Failed to reset content script. ${failures.join(" ")}`);
        }
        else
            return true;
    }
    catch (err) {
        throw new Error(`Error: Failed to restructure ExTranscript after sent subtitles data. ${err.message}`);
    }
});
//
// --- Other Methods ----------------------------------------
//
/*
    state module
    ______________________________________________
    service workerなので、Stateを常に参照できるようにしておくため
    モジュール化したState

    Stateのインスタンスはここへカプセル化され、
    getInstance()を通して参照が渡される

    検証してみた結果、アンロード、ロードに耐えうる模様
*/
const state = (function () {
    let _instance = null;
    return {
        register: (m) => {
            _instance = m;
        },
        // unregisterする場面では、もはやStateは要らないから
        // Stateを削除しちゃってもいいと思う
        unregister: () => {
            _instance = null;
        },
        getInstance: () => {
            return _instance;
        },
    };
})();
//
// --- LEGACY ----------------------------
//

})();

/******/ })()
;
//# sourceMappingURL=background.js.map