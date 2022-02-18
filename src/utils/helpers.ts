import { iMessage, iResponse } from '../utils/constants';

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
                : reject('Send message to tabs went something wrong');
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
export const exciseBelowHash = (url: string): string => {
    return url.slice(0, url.indexOf('#'));
};
