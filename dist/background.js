/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
 * ************************************************/
const extensionStatus = {
    working: 'working',
    notWorking: 'notWorking',
    idle: 'idle',
};
const extensionNames = {
    popup: 'popup',
    contentScript: 'contentScript',
    controller: 'controller',
    captureSubtitle: "captureSubtitle",
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
    inquireUrl: "inquireUrl",
    // from popup, run process
    run: "run",
    // something succeeded
    success: "success"
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
/* harmony import */ var _utils_LocalStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/LocalStorage */ "./src/utils/LocalStorage.ts");
/*******************************************************************
 * background.ts
 * ________________________________________________________________
 *
 * As service worker and Application Layer.
 *
 * *****************************************************************/
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



chrome.runtime.onInstalled.addListener((details) => {
    console.log(`[background] onInstalled: ${details.reason}`);
    const m = new Model("__key__local_storage_", modelBase);
    console.log(m);
    model.register(m);
});
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.to !== _utils_constants__WEBPACK_IMPORTED_MODULE_0__.extensionNames.background)
        return;
    const { order } = message, rest = __rest(message, ["order"]);
    if (order && order.length) {
        if (order.includes(_utils_constants__WEBPACK_IMPORTED_MODULE_0__.orderNames.run)) {
            console.log("[background] got run order:");
            const m = model._();
            m.load().then((res) => console.log(res));
        }
    }
});
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
class Model {
    constructor(key, base) {
        this._storage_key = key;
        this._local_storage = new _utils_LocalStorage__WEBPACK_IMPORTED_MODULE_2__.LocalStorage(this._storage_key);
        this._local_storage.save(base);
    }
    update(prop) {
        return __awaiter(this, void 0, void 0, function* () {
            // いちいち毎度すべていったん取得してから、引数に一致するプロパティだけ変更して
            // 変更したすべてを保存する
            // なのでひと手間ある
            let current = yield this._local_storage.load();
            current = Object.assign(Object.assign({}, current), prop);
            yield this._local_storage.save(current);
        });
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            const current = yield this._local_storage.load();
            return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.deepCopier)(current);
        });
    }
    clearAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._local_storage.clearAll();
        });
    }
}
const model = (function () {
    let instance = null;
    return {
        register: (m) => {
            instance = m;
        },
        unregister: () => {
            instance = null;
        },
        _: () => {
            return instance;
        },
    };
})();
/*
    stateList module
    ______________________________________________

    Stateのインスタンスを保存しておく場所
    インスタンスをどこからでも呼出せるようにするためと、
    インスタンスをグローバル変数にしたくないからこんな面倒をしている

    検証：service workerがアンロードされても_listの中身は消えないのか?
*/
const stateList = (function () {
    console.log("stateList module invoked");
    // Instances stored in this list.
    const _list = {};
    return {
        register: (name, instance) => {
            _list[name] = instance;
        },
        unregister: (name) => {
            // これでinstanceもさくじょしていることになるかしら
            delete _list[name];
        },
        // nameで指定するんじゃなくて、
        // 型引数で指定できるようにしたいなぁ
        caller: (name) => {
            return _list[name];
        },
        showList: () => {
            console.log("stateList::_list:");
            console.log(_list);
        },
        length: () => {
            return Object.keys(_list).length;
        },
    };
})();

})();

/******/ })()
;
//# sourceMappingURL=background.js.map