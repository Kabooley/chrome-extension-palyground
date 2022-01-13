import { iMessage, iResponse } from "../utils/constants";

export const deepCopier = <T>(data: T): T => {
    return JSON.parse(JSON.stringify(data));
  }
  

export const sendMessageToTabsPromise = async (
  tabId: number,
  message: iMessage,
  callback?
): Promise<iResponse | void> => {
  return new Promise(async (resolve, reject) => {
      chrome.tabs.sendMessage(tabId, message, async (response: iResponse) => {
        // 
        // NOTE:
        // 
        // responseが返されることが前提になっている
        // なのでsendResponse()実行する側が引数を渡さなかった
        // 
        // もしくはsendResponse()をそもそも実行しなかったら
        // 以下でエラーが起こる可能性がある
          const {complete, ...rest} = response;
          if (complete) {
              if (callback && typeof callback === 'function'){
                  await callback(rest);
                  resolve();
              } 
              else {
                  resolve(rest);
              }
          } else reject('Send message to tabs went something wrong');
      });
  });
};

export const sendMessagePromise = async (
  message: iMessage,
  callback?
): Promise<iResponse | void> => {
  return new Promise(async (resolve, reject) => {
      chrome.runtime.sendMessage(message, async (response: iResponse) => {
          const {complete, ...rest} = response;
          if (complete) {
              if (callback && typeof callback === 'function'){
                  await callback(rest);
                  resolve();
              } 
              else {
                  resolve(rest);
              }
          } else reject('Send message to extension went something wrong');
      });
  });
};
