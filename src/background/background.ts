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
import {
    extensionNames,
    orderNames,
    iMessage,
    iResponse,
} from '../utils/constants';
import { sendMessageToTabsPromise, sendMessagePromise } from '../utils/helpers';

// --- CLASSES -------------------------------------

// Commandのインスタンスをthis.ordersに格納する

class CommandManager {
    private commands;
    constructor() {
      this.commands = [];
    }
};
  
  // 実際に処理する関数をexecuteに格納する
class Command {
    private execute;
    constructor(execute) {
        this.execute = execute;
    }
};
  
  


// --- LISTENERS -----------------------------------

chrome.runtime.onInstalled.addListener(() => {
    console.log('BACKGROUND RUNNING...');
});


chrome.tabs.onUpdated.addListener(
    async (
        tabId: number,
        changeInfo: chrome.tabs.TabChangeInfo,
        Tab: chrome.tabs.Tab
    ): Promise<void> => {
        console.log('TAB UPDATED...');
        // const _tabId: number = await checkTabIsCorrect(
        //     /https:\/\/developer.mozilla.org\/ja\//);
        // if(_tabId)messageSender(_tabId);
    }
);

chrome.runtime.onMessage.addListener(
    async (
        message: iMessage,
        sender: chrome.runtime.MessageSender,
        sendResponse: (response: iResponse) => void
    ): Promise<boolean> => {

        const { from, to, order, ...rest } = message;
        if(to !== extensionNames.background) return;
        try {

            // IDEAL FUNCTION: 中身は未定
            // とにかくorder, restを渡したらそれぞれに必要な処理を行ったpromiseの配列を返す
            const result: Promise<any>[] = synchronizer(order, rest);
            await Promise.all(result);
            // resultに「返事」となる変数が含まれていたら、
            // これもsendResponse()に含めないといけない...
            // そこも考えていない...
            sendResponse({complete: true})
        } 
        catch (e) {
            console.error(e.message);
        }
        
        // sendResponse()を非同期に実行できるように
        // return trueする
        return true;
});

const synchronizer = 


// 外部化された処理
const setLanguageEnglish = async(): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        console.log("It's English");
        try {
            // 処理をして、それが無事に完了したとして
            console.log("status isEnglish turned to true.");
            resolve();
        }
        catch(err) {
            console.error(err.message);
            reject();
        };
    })
};

const setLanguageNotEnglish = async(): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        console.log("It's Not English");
        try {
            // 処理をして、それが無事に完了したとして
            console.log("status isEnglish turned to false.");
            resolve();
        }
        catch(err) {
            console.error(err.message);
            reject();
        };
    })
};

// 戻り値が必要ない
const setSectionTitle = async(): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        console.log("section title has been sent");
        try {
            // 処理をして、それが無事に完了したとして
            console.log("status isEnglish turned to false.");
            resolve();
        }
        catch(err) {
            console.error(err.message);
            reject();
        };
    })
}


const checkTabIsCorrect = async (pattern: RegExp): Promise<number> => {
    // https://www.udemy.com/course/*
    try {
        const w: chrome.windows.Window = await chrome.windows.getCurrent();
        const tabs: chrome.tabs.Tab[] = await chrome.tabs.query({
            active: true,
            windowId: w.id,
        });
        const tab: chrome.tabs.Tab = tabs[0];
        const result: RegExpMatchArray = tab.url.match(pattern);
        if (result) {
            return tab.id;
        } else {
            return null;
        }
    } catch (err) {
        if (err === chrome.runtime.lastError) {
            console.error(err.message);
        } else {
            console.log(err);
        }
    }
};

const messageSender = async (tabId: number): Promise<void> => {
    try {
        const response: iResponse | void = await sendMessageToTabsPromise(
            tabId,
            {
                to: extensionNames.contentScript,
                from: extensionNames.background,
                activated: true,
            }
        );
        if (response) console.log(response);

        const response2: iResponse | void = await sendMessageToTabsPromise(
            tabId,
            {
                to: extensionNames.contentScript,
                from: extensionNames.background,
                order: [orderNames.sendStatus, orderNames.disconnect],
            }
        );
        if (response2) console.log(response2);

        const response3: iResponse | void = await sendMessageToTabsPromise(
            tabId,
            {
                to: extensionNames.contentScript,
                from: extensionNames.background,
                language: true,
                order: [
                    orderNames.injectCaptureSubtitleScript,
                    orderNames.injectExTranscriptScript,
                ],
            }
        );
        if (response3) console.log(response3);

        const response4: iResponse | void = await sendMessageToTabsPromise(
            tabId,
            {
                to: extensionNames.contentScript,
                from: extensionNames.background,
                title: 'Awesome title',
                complete: true,
            }
        );
        if (response4) console.log(response4);
    } catch (err) {
        console.error(err.message);
    }
};



// chrome.runtime.onMessage.addListener(
//     async (
//         message: iMessage,
//         sender: chrome.runtime.MessageSender,
//         sendResponse: (response: iResponse) => void
//     ): Promise<boolean> => {
//         console.log('[background] ONMESSAGE');
//         console.log(message);
//         const { from, to, order, ...rest } = message;
//         console.log(rest);
//         if (to !== extensionNames.background) return;

//         if (order && order.length) {
//             //
//             // DEBUG:
//             //
//             // 検証１：sendResponse()を実行しなかったら
//             // 呼び出し側はどうなるか
//             //
//             console.log('[background] GOT ORDER');
//             if (order.includes(orderNames.sendStatus)) {
//                 console.log('SEND STATUS');
//                 sendResponse({ complete: true });
//             }
//             if (order.includes(orderNames.disconnect)) {
//                 console.log('DISCONNECT');
//                 sendResponse({ complete: true });
//             }
//             if (order.includes(orderNames.injectCaptureSubtitleScript)) {
//                 console.log('injectCaptureSubtitleScript');
//                 sendResponse({ complete: true });
//             }
//             if (order.includes(orderNames.injectExTranscriptScript)) {
//                 console.log('injectExTranscriptScript');
//                 sendResponse({ complete: true });
//             }
//         }

//         if (rest.activated) {
//             console.log('[background] content script has been activated');
//             sendResponse({ complete: true });
//         }
//         if (rest.language) {
//             console.log('[background] correct language');
//             sendResponse({ complete: true });
//         }

//         return true;
//     }
// );
