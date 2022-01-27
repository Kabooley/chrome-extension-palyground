/**************************************************
 * constants
 * ________________________________________________
 * 
 * ************************************************/



// Subtitle object interface
export interface subtitle_piece {
    index: number;
    subtitle: string;
}


export const extensionStatus = {
    working: 'working',
    notWorking: 'notWorking',
    idle: 'idle',
} as const;

export const extensionNames = {
    popup: 'popup',
    contentScript: 'contentScript',
    controller: 'controller',
    captureSubtitle: "captureSubtitle",
    background: 'background',
} as const;

//
// Updated
//
export const orderNames = {
    // // Inject content script order
    // injectCaptureSubtitleScript: 'injectCaptureSubtitleScript',
    // injectExTranscriptScript: 'injectExTranscriptScript',
    // From background to contentScript
    sendStatus: 'sendStatus',
    // from controller to background
    sendSubtitles: 'sendSubtitles',
    // order to disconnect port
    disconnect: 'disconnect',
    
    // from popup inquire the url is correct
    inquireUrl: "inquireUrl",
    // from popup, run process
    run: "run",
    // something succeeded
    success: "success"
} as const;

type et = typeof extensionNames;
type on = typeof orderNames;

export type extensionsTypes = keyof et;
export type orderTypes = keyof on;

//
// Updated
//
export interface iMessage {
    // from, to propertyは必須とする
    from: extensionsTypes;
    to: extensionsTypes;
    subtitles?: subtitle_piece[];
    activated?: boolean;
    //
    // 複数のorderをorderプロパティに対して送信できるようにした
    // Objectの場合...
    //
    order?: orderTypes[];
    //   true: English, false: Not English
    language?: boolean;
    //   section title
    title?: string;
    //   Is message passing done?
    complete?: boolean;


    //   ADDED
    //
    loading?: boolean;
    loaded?: boolean;
    correctUrl?: boolean;

    //   DELETED
    //
    //   completed?: boolean;
    //   disconnect?: boolean;
    //   message?: any;
}

// sendResponse()に渡す引数の型
// from, toが必須でないだけ
export interface iResponse {
    // from: extensionsTypes;
    from?: extensionsTypes;
    to?: extensionsTypes;
    message?: any;
    //   取得した字幕など
    subtitles?: subtitle_piece[];
    order?: orderTypes[];
    activated?: boolean;
    completed?: boolean;
    language?: boolean;
    title?: string;
    disconnect?: boolean;
    complete?: boolean;
    correctUrl?: boolean;

}

// ---- ABOUT PORT ----------------------------------
export const port_names = {
    _requiring_subtitles: '_port_name_require_subtitles',
    _injected_contentScript: '_port_name_injected_contentScript',
};

// // Usage
// type _order = orderTypes[];

// const oo: _order = [
//   orderNames.sendStatus, orderNames.disconnect
// ];

// console.log(oo);


// const messageHandler = (m: iMessage): void => {
//   const { from, to, order } = m;
//   // もしもorderプロパティが含まれていて、中身があれば
//   if (order && order.length) {
//     console.log("there is order");
//     // 
//     // この時点だとorderが何者かわからないみたいだからincludes()メソッドなんて使えないよ
//     // というエラーが出る
//     // でも使えた
//     // codesandboxでは
//     if (order.includes(orderNames.sendStatus)) {
//       console.log("SEND STATUS");
//     }
//     if (order.includes(orderNames.disconnect)) {
//       console.log("DISCONNECT");
//     }
//   }
// };


// messageHandler({
//   from: "background",
//   to: "content script",
//   order: [
//     orderNames.sendStatus, orderNames.disconnect
//   ]
// });

// messageHandler({
//   from: "background",
//   to: "content script",
//   order: []
// });

// messageHandler({
//   from: "background",
//   to: "content script"
// });


/*
## 変数がいくつかの特定の値を持つように強制する方法

https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types

```TypeScript

// -- example 1 --

let x: "hello" = "hello";
// OK
x = "hello";
// ...
x = "howdy";
// Type '"howdy"' is not assignable to type '"hello"'.

// -- example 2 --

function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}
printText("Hello, world", "left");
printText("G'day, mate", "centre");
Argument of type '"centre"' is not assignable to parameter of type '"left" | "right" | "center"'.
```

https://typescript-jp.gitbook.io/deep-dive/type-system/literal-types



*/
