import { iMessage, iResponse } from "../utils/constants";

export const deepCopier = <T>(data: T): T => {
  return JSON.parse(JSON.stringify(data));
};

export const sendMessageToTabsPromise = async (
  tabId: number,
  message: iMessage
): Promise<iResponse> => {
  return new Promise(async (resolve, reject) => {
    chrome.tabs.sendMessage(tabId, message, async (response: iResponse) => {
      const { complete, ...rest } = response;
      complete
        ? resolve(rest)
        : reject("Send message to tabs went something wrong");
    });
  });
};

export const sendMessagePromise = async (
  message: iMessage
): Promise<iResponse> => {
  return new Promise(async (resolve, reject) => {
    chrome.runtime.sendMessage(message, async (response: iResponse) => {
      const { complete, ...rest } = response;
      if (complete) resolve(rest);
      else reject();
    });
  });
};

export const tabsQuery = async (): Promise<chrome.tabs.Tab> => {
  try {
    const w: chrome.windows.Window = await chrome.windows.getCurrent();
    const tabs: chrome.tabs.Tab[] = await chrome.tabs.query({
      active: true,
      windowId: w.id,
    });
    return tabs[0];
  } catch (err) {
    console.error(err.message);
  }
};

// # mark以下を切除した文字列を返す
// なければそのまま引数のurlを返す
export const exciseBelowHash = (url: string): string => {
  return url.indexOf("#") < 0 ? url : url.slice(0, url.indexOf("#"));
};


/*********************
 * 
 * @param {action} Function: the function that will be executed repeatedly. Function must returns boolean. Function can require parameter.
 * @param {times} number: Number that how many times repeat.
 * Default to 10.
 * @param {interval} number: Microseconds that repeat interval.
 * Default to 200.
 * Return if action returns value.
 * 
 * 参考：https://stackoverflow.com/questions/61908676/convert-setinterval-to-promise
 * 
 * 参考：https://levelup.gitconnected.com/how-to-turn-settimeout-and-setinterval-into-promises-6a4977f0ace3
 * */ 
const repeatActionPromise = async (action: (p?: any) => boolean, 
param?: any, times?: number, interval?: number) : Promise<any> => {
  return new Promise((resolve, reject) => {
    let intervalId: NodeJS.Timer;
    let counter = times !== undefined ? times : 10;
    const _interval = interval !== undefined ?  interval : 200;

    intervalId = setInterval(async function() {
      // action のPromiseが解決されたら解決...とすればうまくいくかしら？
      action().then(res => resolve(res)).catch(err => {
        counter--;
      });
      counter--;
    }, _interval);

  })
}

// copy & paste
// task must return true or false
const fakeServerCheck = async () => {
  console.log('check...');
  return Math.random() > 0.8;
}
const asyncInterval = async (callback, ms, triesLeft = 5) => {
  return new Promise((resolve, reject) => {
    const interval = setInterval(async () => {
      if (await callback()) {
        resolve();
        clearInterval(interval);
      } else if (triesLeft <= 1) {
        reject();
        clearInterval(interval);
      }
      triesLeft--;
    }, ms);
  });
}
const wrapper = async () => {
  try {
    await asyncInterval(fakeServerCheck, 500);
  } catch (e) {
    console.log('error handling');
  }
  console.log("Done!");
}
// wrapper();