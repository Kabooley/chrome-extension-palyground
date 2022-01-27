import {
  extensionNames,
  orderNames,
  iMessage,
  iResponse,
} from "../utils/constants";
import { sendMessageToTabsPromise, sendMessagePromise } from "../utils/helpers";

chrome.runtime.onMessage.addListener(
  (
    message: iMessage,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response: iMessage) => void
  ): boolean => {
    console.log("[content script] ONMESSAGE");
    const { from, to, order } = message;
    if (to !== extensionNames.contentScript) return;

    if (order && order.length) {
      //
      // DEBUG:
      //
      // 検証１：sendResponse()を実行しなかったら
      // 呼び出し側はどうなるか
      //
      console.log("[content script] GOT ORDER");
      if (order.includes(orderNames.sendStatus)) {
        console.log("[content script] SEND STATUS");
      }
      if (order.includes(orderNames.disconnect)) {
        console.log("[content script] DISCONNECT");
      }
      // if (order.includes(orderNames.injectCaptureSubtitleScript)) {
      //     console.log('[content script] injectCaptureSubtitleScript');
      // }
      // if (order.includes(orderNames.injectExTranscriptScript)) {
      //     console.log('[content script] injectExTranscriptScript');
      // }
    }
    return true;
  }
);

(function () {
  try {
    setTimeout(async function () {
      console.log("content script injected");
      const response: iResponse | void = await sendMessagePromise({
        from: extensionNames.contentScript,
        to: extensionNames.background,
        activated: true,
      });
      if (response) console.log(response);

      const response2: iResponse | void = await sendMessagePromise({
        from: extensionNames.contentScript,
        to: extensionNames.background,
        order: [orderNames.sendStatus, orderNames.disconnect],
      });
      if (response2) console.log(response2);

      const response3: iResponse | void = await sendMessagePromise({
        from: extensionNames.contentScript,
        to: extensionNames.background,
        language: true,
        order: [
          // orderNames.injectCaptureSubtitleScript,
          // orderNames.injectExTranscriptScript,
        ],
      });
      if (response3) console.log(response3);

      const response4: iResponse | void = await sendMessagePromise({
        from: extensionNames.contentScript,
        to: extensionNames.background,
        title: "Awesome title",
        complete: true,
      });
      if (response4) console.log(response4);
    }, 3000);
  } catch (err) {
    console.error(err.message);
  }
})();
