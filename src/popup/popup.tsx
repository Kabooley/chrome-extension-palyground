/*******************************************************
 *  POPUP
 * _____________________________________________________
 *
 *  NOTE:  state never retain its value!!
 * Popup refreshes itself everytime opened same as html page reloaded.
 * So state must be stored background script and
 * everytime opened, popup must require background script to send state.
 ****************************************************** */
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  iMessage,
  iResponse,
  extensionNames,
  orderNames,
  urlPattern,
} from "../utils/constants";
import { sendMessagePromise } from "../utils/helpers";
import "./popup.css";
import Switch from "./switch";

const Popup = (): JSX.Element => {
  // popupが開かれたときのURLが、拡張機能が有効になるべきURLなのか
  const [correctUrl, setCorrectUrl] = useState<boolean>(false);
  // RUNボタンが押されて、結果待ちの状態ならばtrue それ以外はfalse
  const [building, setBuilding] = useState<boolean>(false);
  // 正常に拡張機能が実行されたらtrue
  const [complete, setComplete] = useState<boolean>(false);
  // Saves Tab いらないかも...
  const [tabInfo, setTabInfo] = useState<chrome.tabs.Tab>(null);
  //   NOTE: new added. スライダーをONにしたらtrue
  const [turningOn, setTurningOn] = useState<boolean>(false);

  //   useEffect(() => {
  //     chrome.runtime.onMessage.removeListener(messageHandler);
  //     chrome.runtime.onMessage.addListener(messageHandler);
  //     return () => {
  //       chrome.runtime.onMessage.removeListener(messageHandler);
  //     };
  //   }, []);

  useEffect(() => {
    // NOTE: DON'T USE AWAIT inside of useEffect().
    console.log("[popup] OPENED");
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
      setBuilding(isSubtitleCapturing);
      setComplete(isExTranscriptStructured);
    });
  }, []);

  //   const messageHandler = (): void => {};

  const verifyValidPage = (): void => {
    chrome.windows
      .getCurrent()
      .then((res) => {
        return chrome.tabs.query({ active: true, windowId: res.id });
      })
      .then((tabs: chrome.tabs.Tab[]) => {
        console.log(tabs);
        const r: RegExpMatchArray = tabs[0].url.match(urlPattern);
        console.log(`Is this page valid?: ${r && r.length ? true : false}`);
        if (r && r.length) {
          setCorrectUrl(true);
          setTabInfo(tabs[0]);
        } else {
          setCorrectUrl(false);
        }
      })
      .catch((err) => console.error(err.message));
  };

  //   const buttonClickHandler = (): void => {
  //     if (!tabInfo) throw new Error("Error: tabInfo is null");
  //     setBuilding(true);
  //     console.log("[popup] RUNNING...");

  //     sendMessagePromise({
  //       from: extensionNames.popup,
  //       to: extensionNames.background,
  //       order: [orderNames.run],
  //       tabInfo: tabInfo,
  //     })
  //       .then((res) => {
  //         const { success } = res;
  //         console.log("[popup] Successfully Complete!");
  //         setComplete(success);
  //         setBuilding(false);
  //         if (!success) {
  //           throw new Error(
  //             "Error: something went wrong while extension building"
  //           );
  //         }
  //       })
  //       .catch((err) => {
  //         setComplete(false);
  //         setBuilding(false);
  //         console.error(err.message);
  //         // alert出した方がいいかな？
  //       });
  //   };

  const handlerOfRun = (): void => {
    if (!tabInfo) throw new Error("Error: tabInfo is null");
    setBuilding(true);
    console.log("[popup] Rebuilding...");

    sendMessagePromise({
      from: extensionNames.popup,
      to: extensionNames.background,
      order: [orderNames.run],
      tabInfo: tabInfo,
    })
      .then((res) => {
        const { success } = res;
        console.log("[popup] Rebuilding Successfully Complete!");
        setComplete(success);
        setBuilding(false);
        if (!success) {
          throw new Error(
            "Error: something went wrong while extension building"
          );
        }
      })
      .catch((err) => {
        setComplete(false);
        setBuilding(false);
        setTurningOn(false);
        console.error(err.message);
        // alert出した方がいいかな？
      });
  };

  const handlerOfToggle = (): void => {
    turningOn
      ? (function () {
          console.log("[popup] Turning off...");
          setTurningOn(false);
          //   TODO: invoke and implement handler of turn off
        })()
      : (function () {
          console.log("[popup] Turning on...");
          setTurningOn(true);
          handlerOfRun();
        })();
  };

  const generateCorrect = (): JSX.Element => {
    return (
      <div className="footer">
        {/* <button onClick={buttonClickHandler} disabled={complete}>
          RUN
        </button> */}
        <Switch isOn={turningOn} handlerOfToggle={handlerOfToggle} />
      </div>
    );
  };

  //   const generateIncorrect = (): JSX.Element => {
  //     return <div>This is INCORRECT page</div>;
  //   };

  const generateRunning = (): JSX.Element => {
    return building ? <div> Rebuilding... </div> : null;
  };

  //   5秒だけ表示するようにする
  const generateComplete = (): JSX.Element => {
    return complete ? <div> Complete!</div> : null;
  };
  return (
    <div className="container">
      <div className="header">
        <div className="container-image">
          <img className="image-icon" src="udemy-re-transcript-512.svg" />
        </div>
        <div className="extension-title-container">
          <span>Udemy Re</span>
          <br />
          <span> Transcript</span>
        </div>
      </div>
      <div className="middle">
        {generateRunning()}
        {generateComplete()}
      </div>
      {correctUrl ? generateCorrect() : null}
    </div>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<Popup />, root);
