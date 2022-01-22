import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
    iMessage,
    iResponse,
    extensionNames,
    orderNames,
} from '../utils/constants';
import { sendMessagePromise } from '../utils/helpers';

const Popup = (): JSX.Element => {
    // popupが開かれたときのURLが、拡張機能が有効になるべきURLなのか
    const [correctUrl, setCorrectUrl] = useState<boolean>(false);
    // RUNボタンが押されて、結果待ちの状態ならばtrue それ以外はfalse
    const [running, setRunning] = useState<boolean>(false);
    // 正常に拡張機能が実行されたらtrue
    const [complete, setComplete] = useState<boolean>(false);

    useEffect(() => {
        console.log('[popup] Set onMessage listener');
        chrome.runtime.onMessage.addListener(messageHandler);
        return () => {
            console.log('[popup] Removed onMessage listener');
            chrome.runtime.onMessage.removeListener(messageHandler);
        };
    }, []);

    useEffect(() => {
        // popupが開かれるたびに開かれたタブのURLが
        // 指定のURLと一致するのかbackgroundと通信する
        sendInquire();
    });

    const messageHandler = (): void => {};

    const sendInquire = (): void => {
        sendMessagePromise({
            from: extensionNames.popup,
            to: extensionNames.background,
            order: [orderNames.inquireUrl],
        })
            .then((res: iResponse) => {
                const { correctUrl } = res;
                setCorrectUrl(correctUrl);
            })
            .catch((err) => console.error(err.message));
    };

    const buttonClickHandler = (): void => {
        setRunning(true);
        sendMessagePromise({
            from: extensionNames.popup,
            to: extensionNames.background,
            order: [orderNames.run],
        })
            .then((res) => {
                const { complete } = res;
                setComplete(complete);
                setRunning(false);
                if (!complete) {
                    throw new Error(
                        'Error: something went wrong to run extension'
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
        return (
            <div>
                This is correct page
                <button onClick={buttonClickHandler}>RUN</button>
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