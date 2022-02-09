/***********************************************************
static content script
___________________________________________________________


機能：
    1. Udemy講義ページのトランスクリプト機能がONになっているか検知する
    2. Udemy講義ページの字幕の言語が英語になっているか検知する
    3. 1, 2を調査して必要に応じてbackground scriptへ送信する

Inject:
    動的content scriptとして、
    Udemyの講義ページURLへマッチするwebページにおいて、
    POPUP上の実行ボタンが押されたらinjectされる

通信に関して：
    single message passing機能でbackground.jsと通信する

TODO:
- ブラウザサイズが小さすぎると、トランスクリプトが表示されないことへの対応
    トランスクリプトトグルボタンも、表示中だったトランスクリプトも非表示になる
    こうなると拡張機能が使えない
    つまり、
    字幕：英語
    トランスクリプト：ONになっている
        実際にONになっている
        かつ
        windowサイズが小さい
    アプリケーションのリセット機能にかかわるので結構大きな問題
************************************************************/

import * as selectors from '../utils/selectors';
import {
    iMessage,
    iResponse,
    extensionNames,
    orderNames,
    RESIZE_TIMER,
} from '../utils/constants';
import { sendMessagePromise } from '../utils/helpers';
import MutationObserver_ from '../utils/MutationObserver_';

//
// --- GLOBALS ---------------------------------------------------
//

// Transcriptが消えるブラウザウィンドウX軸の境界値
// const TOGGLE_VANISH_BOUNDARY: number = 584;
// Transcriptがブラウザサイズによって消えているのかどうか
// let isWindowTooSmall: boolean;
// windowのonResizeイベント発火遅延用
// let timerQueue: NodeJS.Timeout = null;

let moControlbar: MutationObserver;

//
// --- chrome API Listeners -------------------------------------
//

/*
    onMessage listener
    ______________________________________________
    background.jsからのメッセージを受信して応対する

    非同期sendResponse()を許可している(return trueしている)

    order:
        sendStatus
        sendSectionTitle
*/
chrome.runtime.onMessage.addListener(
    async (
        message: iMessage,
        sender,
        sendResponse: (response: iResponse) => void
    ): Promise<boolean> => {
        console.log('CONTENT SCRIPT GOT MESSAGE');
        const { from, order, to } = message;
        const response: iResponse = {
            from: extensionNames.contentScript,
            to: from,
        };
        if (
            to !== extensionNames.contentScript ||
            from !== extensionNames.background
        )
            return;

        try {
            // ORDERS:
            if (order && order.length) {
                // SEND STATUS
                if (order.includes(orderNames.sendStatus)) {
                    console.log('Order: send status');
                    const isEnglish: boolean = isSubtitleEnglish();
                    // const isOpen: boolean = isWindowTooSmall
                    //     ? false
                    //     : isTranscriptOpen();

                    // トランスクリプトボタンがコントロールバー上にある
                    // かつ
                    // トランスクリプトが表示されてる
                    let isOpen: boolean = false;
                    const toggle: HTMLElement =
                        document.querySelector<HTMLElement>(
                            selectors.controlBar.transcript.toggleButton
                        );
                    if (!toggle) isOpen = false;
                    else isOpen = isTranscriptOpen();

                    response.language = isEnglish;
                    response.isTranscriptDisplaying = isOpen;
                }
            }
            response.complete = true;

            // DEBUG:
            //
            // LOG response
            console.log('-----------------------------------');
            console.log('LOG: response object before send');
            console.log(response);
            console.log('-----------------------------------');
            sendResponse(response);
            return true;
        } catch (err) {
            console.error(err.message);
        }
    }
);

/*
    sendToBackground()
    _________________________________________
    background.tsへメッセージを送信する

*/
const sendToBackground = async (order: {
    isOpened?: boolean;
    isEnglish?: boolean;
}): Promise<void> => {
    console.log('SENDING MESSAGE TO BACKGROUND');
    const { isOpened, isEnglish } = order;
    const message: iMessage = {
        from: extensionNames.contentScript,
        to: extensionNames.background,
    };

    if (isOpened !== undefined) {
        message['transcriptExpanded'] = isOpened;
    }
    if (isEnglish !== undefined) {
        message['language'] = isEnglish;
    }

    //
    // DEBUG:
    //
    console.log('DEBUG: make sure message object');
    console.log(message);
    //
    //
    try {
        await sendMessagePromise(message);
    } catch (err) {
        console.error(err.message);
    }
};

//
// ---- Event Handlers -----------------------------------------
//

/****
 *  Handler of Click Event on Controlbar
 *
 * */
const handlerOfControlbar = function (ev: PointerEvent): void {
    console.log('[contentScript] controlbar clicked');

    // Clickイベント中にDOMを取得しておく...
    const path: EventTarget[] = ev.composedPath();
    const transcriptToggle: HTMLElement = document.querySelector<HTMLElement>(
        selectors.controlBar.transcript.toggleButton
    );
    const theaterToggle: HTMLElement = document.querySelector<HTMLElement>(
        selectors.controlBar.theatre.theatreToggle
    );
    const ccPopupButton: HTMLElement = document.querySelector<HTMLElement>(
        selectors.controlBar.cc.popupButton
    );

    // TODO: <確認>この遅延装置はclickイベントが完了した後に発火できているか？

    // clickイベント完了後に実行したい事柄
    setTimeout(function () {
        // トグルボタンが押されたら
        if (path.includes(transcriptToggle) || path.includes(theaterToggle)) {
            // トランスクリプト・トグルボタンがあるかどうかを確認し、
            // あれば開かれているか調査、
            // なければトランスクリプト非表示として判定する
            let isOpen: boolean;
            const t: HTMLElement = document.querySelector<HTMLElement>(
                selectors.controlBar.transcript.toggleButton
            );
            if (!t) isOpen = false;
            else isOpen = isTranscriptOpen();
            sendToBackground({ isOpened: isOpen });
        }

        // CC POUPボタンが押されたら
        if (path.includes(ccPopupButton)) {
            // 字幕が変更された可能性がある
            ccPopupMenuClickHandler(ev);
        }
    }, 200);
};

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
// };

/**
 * Callback of ClickEvent on CC Popup MENU
 *
 * If user click outside of menu,
 * check subtitle has been changed.
 * If so, notify to background and remove listener from document.
 * Click inside do nothing.
 * */
const ccPopupMenuClickHandler = (ev: PointerEvent): void => {
    const menu: HTMLElement = document.querySelector<HTMLElement>(
        selectors.controlBar.cc.menuListParent
    );

    const path: EventTarget[] = ev.composedPath();
    if (path.includes(menu)) {
        // menuの内側でclickが発生した
        // 何もしない
        console.log('clicked inside');
    } else {
        // menuの外側でclickが発生した
        const r: boolean = isSubtitleEnglish();
        sendToBackground({ isEnglish: r });
        document.removeEventListener('click', ccPopupMenuClickHandler, true);
    }
};

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
 * Check Transcript is open or not.
 *
 * @returns {boolean}: true for open, false for not open.
 *
 * Get DOM everytime this function invoked.
 * */
const isTranscriptOpen = (): boolean => {
    const toggleButton: HTMLElement = document.querySelector<HTMLElement>(
        selectors.controlBar.transcript.toggleButton
    );
    return toggleButton.getAttribute('aria-expanded') === 'true' ? true : false;
};

/**
 * Check Subtitle language is English or not.
 *
 * @returns {boolean}: true if it's English, false if not.
 *
 * Get DOM everytime this function invoked.
 */
const isSubtitleEnglish = (): boolean => {
    const listParent: HTMLElement = document.querySelector<HTMLElement>(
        selectors.controlBar.cc.menuListParent
    );
    const checkButtons: NodeListOf<HTMLElement> =
        listParent.querySelectorAll<HTMLElement>(
            selectors.controlBar.cc.menuCheckButtons
        );
    const menuList: NodeListOf<HTMLElement> =
        listParent.querySelectorAll<HTMLElement>(
            selectors.controlBar.cc.menuList
        );

    let counter: number = 0;
    let i: number = null;
    const els: HTMLElement[] = Array.from<HTMLElement>(checkButtons);
    for (const btn of els) {
        if (btn.getAttribute('aria-checked') === 'true') {
            i = counter;
            break;
        }
        counter++;
    }

    if (i === null) {
        throw new Error(
            'Error: [isSubtitleEnglish()] Something went wrong but No language is selected'
        );
    }
    const currentLanguage: string = Array.from(menuList)[i].innerText;
    if (currentLanguage.includes('English') || currentLanguage.includes('英語'))
        return true;
    else return false;
};

/*
    initialize()
    _____________________________________________

    Inject時に実行する処理
*/
const initialize = async (): Promise<void> => {
    console.log('CONTENT SCRIPT INITIALIZING...');
    try {
        // Set up listeners

        // click event on cotrolbar
        const controlbar: HTMLElement = document.querySelector<HTMLElement>(
            selectors.transcript.controlbar
        );
        controlbar.addEventListener('click', handlerOfControlbar);

        // MutationObserver for controlbar

        // コントロールバーの子要素だけ追加されたのか削除されたのか知りたいので
        // childListだけtrueにする
        const config: MutationObserverInit = {
            attributes: false,
            childList: true,
            subtree: false,
        };

        const moCallback = (mr: MutationRecord[]): void => {
            let guard: boolean = false;
            mr.forEach((record) => {
                if (record.type === 'childList' && !guard) {
                    // 子要素の何が追加されたのか、削除されたのか調査する
                    guard = true;
                    console.log('Added nodes');
                    console.log(record.addedNodes);
                    console.log('Removed nodes');
                    console.log(record.removedNodes);

                    // if(/* record.addedNodes の子要素にトランスクリプト・トグルボタンが含まれているならば */) {
                    //   // トランスクリプトが再表示された可能性がある
                    //   if(/* もしもトランスクリプトDOMが取得で来たら*/){
                    //     sendToBackground({ isOpened: true });
                    //   }
                    // }
                    // if(/*record.removedNodesの子要素にトランスクリプト・トグルボタンが含まれているならば*/){
                    //   // トランスクリプトが非表示になった可能性がある
                    //   // いずれにしろ送信する
                    //     sendToBackground({ isOpened: false });
                    // }
                    // if(record.addedNodes === ccPopupMenu){
                    //   // いまのところ出番がない...
                    // }
                    // if(record.addedNodes === toggleTheatre){
                    //   // いまのところ出番がない...
                    // }
                }
            });
        };
        moControlbar = new MutationObserver(moCallback);
        moControlbar.observe(controlbar, config);

        console.log('content script initialize has been done');
    } catch (err) {
        console.error(err.message);
    }
};

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

/*
    main process
    _________________________________________________
*/
(function () {
    initialize();
})();

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
