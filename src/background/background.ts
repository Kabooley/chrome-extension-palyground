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
import {} from "../utils/helpers";


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