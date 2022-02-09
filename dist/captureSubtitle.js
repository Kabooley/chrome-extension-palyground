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

/***/ "./src/utils/selectors.ts":
/*!********************************!*\
  !*** ./src/utils/selectors.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
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
const transcript = {
    // HTMLSpanElement which is Highlight as current subtitle on movie.
    highlight: 'span.transcript--highlight-cue--1bEgq',
    // NodeListOf<HTMLSpanElement> which are list of subtitle element.
    transcripts: 'div.transcript--cue-container--wu3UY p.transcript--underline-cue--3osdw span',
    // top element of side bar
    noSidebar: 'div.app--no-sidebar--1naXE',
    sidebar: 'div.has-sidebar',
    // High level element of Movie element
    movieContainer: 'div.app--curriculum-item--2GBGE',
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
        menuCheckButtons: 'button',
        menuList: '.udlite-block-list-item-content',
        menuListParent: "ul[role='menu'][data-purpose='captions-dropdown-menu']",
        // 上記のセレクタのラッパーボタン。
        // 属性`aria-checked`で選択されているかどうかわかる
        checkButtons: 'button.udlite-btn.udlite-btn-large.udlite-btn-ghost.udlite-text-sm.udlite-block-list-item.udlite-block-list-item-small.udlite-block-list-item-neutral',
    },
    transcript: {
        toggleButton: "button[data-purpose='transcript-toggle']",
    },
    theatre: {
        theatreToggle: "button[data-purpose='theatre-mode-toggle-button']"
    }
};
// --- Selectors related ex-transcript -----------------------
const EX = {
    // Udemy page-specific selector
    sidebarParent: '.app--content-column--HC_i1',
    noSidebarParent: '.app--dashboard-content--r2Ce9',
    movieContainer: '.app--body-container',
    // 独自selector `ex--`を接頭辞とする
    // sidebar ex-transcript selectors
    sidebarWrapper: '.ex--sidebar-column',
    sidebarSection: '.ex--sidebar--sidebar',
    sidebarHeader: '.ex--sidebar--sidebar-header',
    sidebarContent: '.ex--sidebar--content',
    sidebarContentPanel: '.ex--sidebar-content-panel',
    sidebarFooter: '.ex--sidebar-transcript--autoscroll-wrapper',
    // sidebar width in case more than SIDEBAR_WIDTH_BOUNDARY
    wideView: '.ex--sidebar--wideview',
    // sidebar width in case less than SIDEBAR_WIDTH_BOUNDARY
    middleView: '.ex--sidebar--middleview',
    // bottom ex-transcript selectors
    dashboardTranscriptWrapper: '.ex--dashboard-transcript-wrapper',
    dashboardTranscriptHeader: '.ex--dashboard-transcript--header',
    dashboardTranscriptPanel: '.ex--dashboard-transcript--transcript-panel',
    dashboardTranscriptCueContainer: '.ex--dashboard-transcript--cue-container',
    dashboardTranscriptCue: '.ex--dashboard-transcript--cue--underline',
    dashboardTranscriptCueText: "span[data-purpose='ex--dashboard-cue-text']",
    dashboardTranscriptBottom: '.ex--dashboard-transcript--autoscroll-wrapper',
    // To Highlight Transcriot Cue Container
    highlight: '.--highlight--',
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
/*!**********************************************!*\
  !*** ./src/contentScript/captureSubtitle.ts ***!
  \**********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_selectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/selectors */ "./src/utils/selectors.ts");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/constants */ "./src/utils/constants.ts");
/********************************************************
 * Capture Subtitles
 * __________________________________________________
 *
 * このcontent scriptは動的にwebページへinjectされる
 *
 * 機能：
 *  1. 要請が来るたび、字幕を取得し、整形しなおす
 *  2. 整形字幕データを送信する
 *
 * リセット処理は必要ない：
 *  order.resetに対応するときにおいて、
 *  DOM amnipulationは関数内部で実行時のみに行われるので
 *  イベントリスナなど付け替える必要がないため
 *
 *
 *********************************************************/


// --- chrome API Listener --------------------------------
/**
 * chrome.runtime.onMessage.addListener()
 * _______________________________________
 *
 * 次のorderに応対する
 * - captureSubtitle: 字幕を取得して送信する
 *
 * */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const { from, to, order } = message;
    if (to !== _utils_constants__WEBPACK_IMPORTED_MODULE_1__.extensionNames.captureSubtitle)
        return;
    if (order && order.length) {
        if (order.includes(_utils_constants__WEBPACK_IMPORTED_MODULE_1__.orderNames.sendSubtitles)) {
            const chunks = mainProcess();
            if (sendResponse) {
                sendResponse({
                    subtitles: chunks,
                    complete: true,
                });
            }
            else {
                throw new Error('[captureSubtitle] Cannot send response. sendResponse is nessesary but there is not the function');
            }
        }
    }
});
// -- Capture Methods -----------------------------------
const capturingSubtitle = () => {
    const spans = document.querySelectorAll(_utils_selectors__WEBPACK_IMPORTED_MODULE_0__.transcript.transcripts);
    const subtitles = Array.from(spans).map((span, index) => {
        return { index: index, subtitle: span.innerText.trim() };
    });
    return subtitles;
};
/*
  subtitlePiecesToChunks
  __________________________________________________
    @param subtitles {subtitle_piece[]}
    subtitle: Udemyの講義で流れてくる字幕一塊とその順番を表すindex

    用語の意味：
    piece: 破片  chunk: 塊
    pieceはパンくずで、chunkは1斤パンである
    chunksはスライスされた食パンのセットである

    整形処理の流れ:
    const chunks = subtitles.map( subtitle => {
    })

    subtitleの文末がピリオドまたはクエスチョンマークのsubtitleにであうまで、
    buff[]へsubtitle.subtitleをpushし続ける

    indexはbuff[]が空だった時だけ値を与える
    そうすることでbuff[]へ一番初めにpushされたsubtitleのindexだけ記憶できる

    このindex番号が後々字幕自動スクロールに必要になる

    文末がピリオドまたはハテナのsubtitleにであったらbuff[]とindexがプロパティの
    オブジェクトを生成して
    chunksへ返す

    以上が整形処理の流れ
*/
const subtitlePiecesToChunks = function (subtitles) {
    var buff = [];
    var index = null;
    const chunks = subtitles.map((subtitle) => {
        // 塊を作り始める最初だけindexに値を与える
        if (buff.length === 0) {
            index = subtitle.index;
        }
        const s = subtitle.subtitle.trim().substr(-1, 1);
        if (s === '.' || s === '?') {
            const piece = {
                index: index,
                subtitle: [...buff, subtitle.subtitle].join(' '),
            };
            // 次のchunkのためにリセットする
            buff = [];
            index = null;
            return piece;
        }
        else {
            // 文末ピリオドまたはハテナのsubtitleにであうまで
            // subtitleをpushし続ける
            buff.push(subtitle.subtitle);
        }
    });
    // undefinedを取り除いて返す
    return chunks.filter((chunk) => chunk !== undefined);
};
/**
 *  Main Process Manager
 *
 *
 * */
const mainProcess = () => {
    const subtitlePieces = capturingSubtitle();
    const chunks = subtitlePiecesToChunks(subtitlePieces);
    return chunks;
};
/*
9/28:

    setTimeout(() => {}, 10000)
    chrome extensionのcontent scriptsはとっくに'load'イベントが過ぎたときにscriptをwebページに挿入するので
    発火タイミングを設定するのが無理
    なのでsetTimeout()を便宜上設定している


9/29:

    現時点でピリオド終了の文章の塊ができている
    文章の塊にインデックスをつけた（index番号はpiecesの順番ではなくてwebページから取得したときの順番のうち、塊にしたときに）
    文字列の連結を生成しているだけなので当然改行は含まれない
    'undefined'が生成されている(何かの文章は失われていないと思われるけど不安)   : 未解決


    `const piece = [...buff, string.text];`は
    string.textが空の時にpieceが[undefined]になる

    で、Array.prototype,join()は[undefined]がわたされても空の文字列を返す
    なので
    mapは空の文字列を返すはずで、undefinedにはならないはずなんだけどな～

                // temporary for debuging.
            if( piece.join(' ') === undefined) {
                console.log(piece.join(' '))
            }
    というのを追加してみたけどundefinedは検出されず

    ひとまず無視する


10/6:
    popup.jsと通信する
    popup.jsでボタンが押されてから字幕取得できるようにする

    popup.jsとcontentScript.jsとで通信する
        popup.js request to capture subtitles
        contentScript got request and begin to capture subtitles


10/17: 自動スクロールの検知


    detectScroll()
    実現すること：
            Udemyの講義ページで、
            transcriptの字幕のうち現在表示されている字幕である「ハイライトされた字幕」要素と
            そのハイライト字幕要素の含まれる要素群の中での順番を取得したい

    内容:
    - ハイライト字幕が変更になったことを示すイベントの取得
            MutationObserverを使う
            moを字幕要素すべてにつけて、classが変更になったら発火するしくみをつくった

    - どの要素がハイライトされているのかの取得
            MutationObserverが発火したら実行されるコールバック関数内部で
            ハイライトされるcssセレクタ名を付けられている要素をquerySelectorで取得する

            実はUdemyのtranscriptはなぜだか字幕要素が「ダブる」ことがあり
            querySelectorAllとかするとまったく同じ字幕要素が複数取得する場合がある

            なのでquerySelector()で取得すれば
            たとえだぶっていても初めに一致した要素だけ返してくれる

    - ハイライト要素とその番号の更新
            ハイライト要素とその番号はcurrentHighlight()モジュールで管理している
            このモジュールを先の処理で取得した要素とその番号に更新する

10/21:
自動スクロール検知の件：

            detectScroll()で取得した字幕番号と、main()で取得している整形した字幕番号は一致している
            （というのを雑に確認した。ちゃんとやりたいけどそれは後回しでいい）

字幕整形の件：(全然今のところ優先度高くない)
            1.
            subtitlePiecesToChunks()の戻り値の配列にundefinedが入り込むのを何とかしたい
            undefinedの代わりに空文字列にしたい
            undefinedのままだと何かしらのエラーでundefinedなのかどうか判断できない

            2.
            ピリオド区切りだと一つの字幕の塊が長くなりすぎる
            '?'も区切り文字の一つとして登録する

整形字幕埋め込みの件:

            CSSの出番ですね...
            - とりあえず字幕をUdemyの講義ページに埋め込めることができるのか確認する
            - 埋め込めるならばCSSで飾り付ける
            - 埋め込めるならば任意の場所に字幕windowsを表示できるようにしたい

整形字幕も自動スクロールさせる件：



10/23:

  整形字幕埋め込みの件


11/12:

    contentScript.tsでスクレイピングしたデータを保存する
    


1/11:

  自動スクロール検知機能はたぶんcontroller.jsへ移したので
  こちらでは凍結する
  （未確認）
*/
// --- LEGCAY CODE ---------------------------------
// // ---- Follow Auto-scroll Methods ------------------------------
// const currentHighlight = (function () {
//   var index: number = 0;
//   var element: Element = null;
//   return {
//     getCurrentHighlight: function () {
//       return Object.assign({}, { index, element });
//     },
//     setCurrentHighlight: function ({ i, e }: { i: number; e: Element }) {
//       index = i;
//       element = e;
//     },
//     resetCurrentHighlight: function () {
//       index = 0;
//       element = null;
//     },
//   };
// })();
/*
    本家の自動スクロール機能を追跡する
    自動スクロールで現在ハイライトされている字幕要素を追跡する

    具体的には
    トランスクリプト上の字幕要素には番号を順番に振り、
    ハイライトされている字幕が映るたびに検知して次のハイライト要素とその番号を取得する
*/
// const detectScroll = (): void => {
//   const _callback = (mr: MutationRecord[]): void => {
//     const latestHighlight = document.querySelector(selectors.highlight);
//     var latestIndex: number;
//     // Update
//     const list: NodeListOf<HTMLSpanElement> = document.querySelectorAll(
//       selectors.transcripts
//     );
//     latestIndex = getElementIndexOfList(list, latestHighlight);
//     if (latestIndex === -1) {
//       console.error(
//         "Error: [detectScroll()] No elements is matched in transcript"
//       );
//     } else {
//       currentHighlight.setCurrentHighlight({
//         i: latestIndex,
//         e: latestHighlight,
//       });
//       console.log("OBSERVED");
//       console.log(latestHighlight);
//       console.log(currentHighlight.getCurrentHighlight());
//     }
//   };
//   const observer = new MutationObserver(_callback);
//   // configuration of the observer:
//   const config = { attributes: true, childList: false, subtree: false };
//   //   target: span
//   const transcripts: NodeListOf<Element> = document.querySelectorAll(
//     selectors.transcripts
//   );
//   // set observer
//   transcripts.forEach((ts, index) => {
//     // pass in the target node, as well as the observer options
//     observer.observe(ts, config);
//   });
// };
// // いらないかも...
// const setCurrentHighlight = (): void => {
//   var count: number = 0;
//   const list: NodeListOf<Element> = document.querySelectorAll(
//     selectors.transcripts
//   );
//   const highlight: Element = document.querySelector(selectors.highlight);
//   for (const el of Array.from(list)) {
//     if (el === highlight) {
//       currentHighlight.setCurrentHighlight({ i: count, e: el });
//       break;
//     }
//     count++;
//   }
// };
// const getElementIndexOfList = (
//   from: NodeListOf<Element>,
//   lookFor: Element
// ): number => {
//   var num: number = 0;
//   for (const el of Array.from(from)) {
//     if (el === lookFor) return num;
//     num++;
//   }
//   // 一致するものがなかった場合
//   return -1;
// };
// Duplicated 2/3
//
// const state = (function () {
//   let _chunks: subtitle_piece[] = [];
//   return {
//       setChunks: (c: subtitle_piece[]): void => {
//           // 常に上書き
//           // 一旦全て配列を空にして
//           // shallow copyを渡す
//           _chunks.splice(0, _chunks.length);
//           _chunks = c.map((subtitle) => {
//               return { ...subtitle };
//           });
//       },
//       getChunks: (): subtitle_piece[] => {
//           // copyを渡すこと
//           return _chunks.map((c) => {
//               return { ...c };
//           });
//       },
//       lengthOfChunks: (): number => {
//           return _chunks.length;
//       },
//   };
// })();

})();

/******/ })()
;
//# sourceMappingURL=captureSubtitle.js.map