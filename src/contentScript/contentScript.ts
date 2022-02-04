/***********************************************************
static content script
___________________________________________________________

run_at: document_idle

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
    今のところ、こちらからメッセージを送信することはない

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
// import { Porter } from "../utils/Porter";

//
// --- GLOBALS ---------------------------------------------------
//

// Transcriptが消えるブラウザウィンドウX軸の境界値
const VANISH_BOUNDARY: number = 601;
// Transcriptがブラウザサイズによって消えているのかどうか
let isWindowTooSmall: boolean;
// windowのonResizeイベント発火遅延用
let timerQueue: NodeJS.Timeout = null;

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
                    const isOpen: boolean = isWindowTooSmall
                        ? false
                        : isTranscriptOpen();
                    response.language = isEnglish;
                    response.transcript = isOpen;
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
const sendToBackgroud = async (order: {
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

/**
 * ブラウザウィンドウがX軸方向に境界線をまたいだときだけ機能する
 *
 * */
const onWindowResizeHandler = (ev): void => {
    const w: number = document.documentElement.clientWidth;
    // When window shrinks less than the boundary
    // Then send status.
    if (w < VANISH_BOUNDARY && !isWindowTooSmall) {
        isWindowTooSmall = true;
        // windowサイズが小さくなりすぎると、トグルボタンのDOMは消えるから
        // イベントリスナはremoveする必要がないけど、
        // 念のため
        const toggleButton: HTMLElement = document.querySelector<HTMLElement>(
            selectors.controlBar.transcript.toggleButton
        );
        if (!toggleButton) {
            sendToBackgroud({ isOpened: false });
        }
    }
    // When window bend over vanish boundary
    // Then reset toggle button to add listener.
    if (w >= VANISH_BOUNDARY && isWindowTooSmall) {
        isWindowTooSmall = false;
        const toggleButton: HTMLElement = document.querySelector<HTMLElement>(
            selectors.controlBar.transcript.toggleButton
        );
        toggleButton.addEventListener(
            'click',
            transcriptToggleButtonHandler,
            false
        );
    }
};

/*
    transcriptToggleButtonHandler
    ________________________________________________________________

    Udemy講義ページのtranscriptトグルボタンがonClick時、
    transcriptが開かれているのかどうかを判定する

    >>NOTE<<

    このハンドラ関数はトグルボタンがクリックされたときにのみ使うこと
    トグルボタンと関係なくtranscriptが開かれているかどうか知りたいときは
    こちらの関数を使うこと: isTranscriptOpen()
*/
const transcriptToggleButtonHandler = (ev?: MouseEvent): void => {
    const latest: HTMLElement = document.querySelector<HTMLElement>(
        selectors.controlBar.transcript.toggleButton
    );

    // 動的な変更が反映される前の属性値を取得するので
    //
    latest.getAttribute('aria-expanded') === 'true'
        ? sendToBackgroud({ isOpened: false })
        : sendToBackgroud({ isOpened: true });
};

/*
    ccPopupMenuClickHandler
    __________________________________________________
    closed caption popup menu click handler

    CC Popup Menuの中をクリックされたのか否かを判断する
    このハンドラはdocumentのイベントリスナに渡される
*/
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
        sendToBackgroud({ isEnglish: r });
        document.removeEventListener('click', ccPopupMenuClickHandler, true);
    }
};

/*
    ccPopupButtonHandler
    ______________________________________________________
    CC popupメニューとdocumentにイベントリスナをつけるための関数
  */
const ccPopupButtonHandler = (ev: MouseEvent): void => {
    // popupメニューが開かれているかチェック
    // 開かれているならclickリスナをメニューラッパーとdocumentに着ける
    // とにかく
    // メニューの外側をクリックしたらすべてのリスナをremoveする
    console.log('CC popup button was clicked');
    // is it opening?
    const e: HTMLElement = document.querySelector<HTMLElement>(
        selectors.controlBar.cc.popupButton
    );

    // やっぱりaria-expanded === trueのときになぜかfalseを返すので
    // 反対の結果を送信する
    if (e.getAttribute('aria-expanded') !== 'true') {
        // CC popupメニューが表示された
        document.removeEventListener('click', ccPopupMenuClickHandler, true);
        document.addEventListener('click', ccPopupMenuClickHandler, true);
    }
};

/*
    Transcript トグルボタンのaria-expandedから
    Transcript が開かれているのかを取得する

    >>NOTE<<

    トグルボタンのonclick時のイベントハンドラとして使わないこと
    属性値はonclick時は挙動がことなるので
    transcriptToggleButtonHandlerを代わりに使うこと
*/
const isTranscriptOpen = (): boolean => {
    const toggleButton: HTMLElement = document.querySelector<HTMLElement>(
        selectors.controlBar.transcript.toggleButton
    );
    return toggleButton.getAttribute('aria-expanded') ? true : false;
};

/*
    字幕の言語が英語か否か判定する
    Return {boolean}: 英語だったらtrue そうでないならfalse
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

        const w: number = document.documentElement.clientWidth;
        if (w > VANISH_BOUNDARY) {
            const toggleButton: HTMLElement =
                document.querySelector<HTMLElement>(
                    selectors.controlBar.transcript.toggleButton
                );
            toggleButton.addEventListener(
                'click',
                transcriptToggleButtonHandler,
                false
            );
            isWindowTooSmall = false;
        } else {
            isWindowTooSmall = true;
        }

        window.addEventListener('resize', function () {
            clearTimeout(timerQueue);
            timerQueue = setTimeout(onWindowResizeHandler, RESIZE_TIMER);
        });

        const ccButton: HTMLElement = document.querySelector<HTMLElement>(
            selectors.controlBar.cc.popupButton
        );
        ccButton.addEventListener('click', ccPopupButtonHandler, true);
        console.log('content script initialize has been done');
    } catch (err) {
        console.error(err.message);
    }
};

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
//     sendToBackgroud({ isOpened: isOpen });
//     const e: HTMLElement = document.querySelector<HTMLElement>(
//         SELECTORS.controlBar.transcript.toggleButton
//     );
//     e.addEventListener('click', transcriptToggleButtonHandler, false);
//     // Set up language check
//     const isEnglish: boolean = isSubtitleEnglish();
//     sendToBackgroud({ isEnglish: isEnglish });
//     const b: HTMLElement = document.querySelector<HTMLElement>(
//         SELECTORS.controlBar.cc.popupButton
//     );
//     b.addEventListener('click', ccPopupButtonHandler, true);
//     // Send section title to background
//     sendTitle();
// };
