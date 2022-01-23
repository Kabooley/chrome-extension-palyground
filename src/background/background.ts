/*******************************************************************
 * background.ts
 * ________________________________________________________________
 * 
 * As service worker and Application Layer.
 * 
 * *****************************************************************/ 
/*
onInstalled: 
    modelを生成する
    理由は、
    modelはビジネスロジックをつかさどるので初めからないとアプリケーションが成り立たない


*/ 

import {
    extensionStatus,
    orderNames,
    extensionsTypes,
    extensionNames,
    iMessage,
    subtitle_piece,
    port_names,
    iResponse,
} from "../utils/constants";
import { sendMessageToTabsPromise } from "../utils/helpers";


chrome.runtime.onInstalled.addListener((details: chrome.runtime.InstalledDetails): void => {
    console.log(`[background] onInstalled: ${details.reason}`);
    // 
    // TODO:
    // 
    // Initialize model
});


chrome.runtime.onMessage.addListener((
    message: iMessage, sender: chrome.runtime.MessageSender, 
    sendResponse: (response?: iResponse) => void
) => {

})


const executeRun = async (): Promise<boolean> => {
    try {
        // urlは正しいかい？
        const tabId: number = await checkTabIsCorrect();
        const progressStatus: iProgress = await state<iProgress>.getState();
        // 正しいならば初めのcontent scriptを導入しよう
        if(tabId) {
            if(progressStatus.isContentScriptInjected) {
                await chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    files: ["contentScript.js"]
                });
                const response: iResponse = await sendMessageToTabsPromise({
                    from: extensionNames.background,
                    to: extensionNames.background,
                    order: [orderNames.sendStatus]
                });
                await state<iProgress>.setState(response);
                // 
                // なんらかのstateの値変更検知機能とnotifyが働いたとして
                // 
                
            }
        }


    }
    catch(err) {
        console.error(err.message);
    }
}