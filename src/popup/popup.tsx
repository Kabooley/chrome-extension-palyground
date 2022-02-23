/*******************************************************
 *  POPUP
 * _____________________________________________________
 *
 *  NOTE:  state never retain its value!!
 * Popup refreshes itself everytime opened same as html page reloaded.
 * So state must be stored background script and
 * everytime opened, popup must require background script to send state.
 ****************************************************** */
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
    iMessage,
    iResponse,
    extensionNames,
    orderNames,
    urlPattern,
} from '../utils/constants';
import { sendMessagePromise } from '../utils/helpers';

const Popup = (): JSX.Element => {
    // popupが開かれたときのURLが、拡張機能が有効になるべきURLなのか
    const [correctUrl, setCorrectUrl] = useState<boolean>(false);
    // RUNボタンが押されて、結果待ちの状態ならばtrue それ以外はfalse
    const [running, setRunning] = useState<boolean>(false);
    // 正常に拡張機能が実行されたらtrue
    const [complete, setComplete] = useState<boolean>(false);
    // Saves Tab いらないかも...
    const [tabInfo, setTabInfo] = useState<chrome.tabs.Tab>(null);

    useEffect(() => {
        chrome.runtime.onMessage.removeListener(messageHandler);
        chrome.runtime.onMessage.addListener(messageHandler);
        return () => {
            chrome.runtime.onMessage.removeListener(messageHandler);
        };
    }, []);

    useEffect(() => {
        // NOTE: DON'T USE AWAIT inside of useEffect().
        console.log('[popup] OPENED');
        verifyValidPage();
    }, []);

    // Get current state from background script.
    useEffect(() => {
        sendMessagePromise({
            from: extensionNames.popup,
            to: extensionNames.background,
            order: [orderNames.sendStatus],
        }).then((res: iResponse) => {
            const { isSubtitleCapturing, isExTranscriptStructured } = res.state;
            setRunning(isSubtitleCapturing);
            setComplete(isExTranscriptStructured);
        });
    }, []);

    const messageHandler = (): void => {};

    const verifyValidPage = (): void => {
        chrome.windows
            .getCurrent()
            .then((res) => {
                return chrome.tabs.query({ active: true, windowId: res.id });
            })
            .then((tabs: chrome.tabs.Tab[]) => {
                console.log(tabs);
                const r: RegExpMatchArray = tabs[0].url.match(urlPattern);
                console.log(
                    `Is this page valid?: ${r && r.length ? true : false}`
                );
                if (r && r.length) {
                    setCorrectUrl(true);
                    setTabInfo(tabs[0]);
                } else {
                    setCorrectUrl(false);
                }
            })
            .catch((err) => console.error(err.message));
    };

    const buttonClickHandler = (): void => {
        if (!tabInfo) throw new Error('Error: tabInfo is null');
        setRunning(true);
        console.log('[popup] RUNNING...');

        sendMessagePromise({
            from: extensionNames.popup,
            to: extensionNames.background,
            order: [orderNames.run],
            tabInfo: tabInfo,
        })
            .then((res) => {
                const { success } = res;
                console.log('[popup] Successfully Complete!');
                setComplete(success);
                setRunning(false);
                if (!success) {
                    throw new Error(
                        'Error: something went wrong while extension running'
                    );
                }
            })
            .catch((err) => {
                setComplete(false);
                setRunning(false);
                console.error(err.message);
                // alert出した方がいいかな？
            });
    };

    const generateCorrect = (): JSX.Element => {
        console.log(running);
        return (
            <div>
                This is correct page
                <button onClick={buttonClickHandler} disabled={running}>
                    RUN
                </button>
            </div>
        );
    };

    const generateIncorrect = (): JSX.Element => {
        return <div>This is INCORRECT page</div>;
    };

    const generateRunning = (): JSX.Element => {
        return running ? <div> RUNNING...</div> : null;
    };

    const generateComplete = (): JSX.Element => {
        return complete ? <div> Complete!</div> : null;
    };
    return (
        <div className="container">
            POPUP
            {correctUrl ? generateCorrect() : generateIncorrect()}
            {generateRunning()}
            {generateComplete()}
        </div>
    );
};

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(<Popup />, root);

// --- LEGACY -----------------------
// const sendInquire = (): void => {
//     sendMessagePromise({
//       from: extensionNames.popup,
//       to: extensionNames.background,
//       order: [orderNames.inquireUrl],
//     })
//       .then((res: iResponse) => {
//         const { correctUrl } = res;
//         // DEBUG:
//         console.log(`[popup] is valid page?: ${correctUrl}`);
//         setCorrectUrl(correctUrl);
//       })
//       .catch((err) => console.error(err.message));
//   };
