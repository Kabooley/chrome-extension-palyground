# Applying Architecture

MVC と DDD の設計思想を取り入れたい

でも参考とする書籍は一切に読んでいない

それでは実現できないので自分なりに「綺麗」にする

## 目次

[1/25:処理についておさらい](#1/25:処理についておさらい)

## DDD 設計思想の導入に関するメモ

聞きかじりでしかない

考えまとめ

#### ユーザの操作

起こりえるユーザ操作と、拡張機能に関わりそうな部分

@popup

-   popup を開く
-   popup 上の RUN ボタンを押す

@Udemy-page

-   ブラウザのサイズを変更する
-   字幕を変更する
-   トランスクリプトを ON/OFF にする
-   URL が変わる(動画が切り替わる)
-   tab を閉じる（ブラウザを閉じる）

-   ExTranscript を閉じる

#### 一般的な処理の流れ

ユーザの操作

リスナの反応

メッセージ・パッシングで background(アプリケーション・レイヤ)へ信号送信

background で信号受信

background で信号に応じて必要な処理単位をキューに詰める

キューを実行する

処理単位の成功で状態更新

処理単位の失敗でエラー送信、または呼び出し元へもどって表示、キューを空にする

すべての処理単位の成功でキューが空になる

~キューが空になったら必要に応じて信号送信元へ処理結果を返す~

(アプリケーションがなにをビジネスロジックにかかわっているので処理結果を返すのは
ドメイン層の指示に依る)

#### タスク管理の State とビジネスロジック管理の State を区別すること

microsoft の DDD の説明によれば
アプリケーション層が、タスク管理のための状態保持をしてもいいらしい

しかし
ビジネスロジックの管理はドメイン層の仕事なので、アプリケーション層から独立していないといかん

#### 単一責任の原則を守ること

責任とは：正常動作に対して責任を持つこと

正常動作に責任を持つクラスの設計方法

> オブジェクト指向におけるクラスは、
>
> -   インスタンス変数
> -   インスタンス変数 を正常に制御するメソッド
>     から構成されるのが基本です

つまり単一責任とはある変数を変更できるクラスは一つだけで
そのクラスが負う責任は変数の正常動作にたいして責任を負うのである

その変数はビジネスロジック上必要不可欠で
その変数が仕様に反しない値をもつように管理されないといけない

例：popup で RUN を押したら

ユーザ操作：popup で RUN を押した

popup: background へ RUN が押された信号を送信

background: chrome.runtime.onMessage で受信

background: 信号内容を振り分け信号ごとのハンドラへ処理を移す

background: その信号に対するハンドラ内部でキューを生成する(必要な処理単位をキューにプッシュする)

    queue中身は以下の通り(今のところ思いつき)
    - URLは正しいか確認
    - contentScriptのinject: ビジネスロジック状態を更新
    - contentScriptからのステータス送信要請
    - contentScriptからのステータス内容確認: ビジネスロジック状態を更新
    - captureSubtitlesのinject：ビジネスロジック状態を更新
    - captureSubtitlesへ字幕データ送信要請
    - captureSubtitlesからの字幕データ内容確認：ビジネスロジック状態を更新
    - controllerのinject：ビジネスロジック状態を更新
    - controllerへExTranscriptの正常展開ができたのか確認要請
    - controllerからの状況送信確認：ビジネスロジック状態を更新

NOTE: 思い付きだけれど、各ビジネスロジックの状態変化を notify されるようオブザーバをつけるといいことあるのかな？
queueu のタスクが空になったら queue の正常終了
途中でエラーまたは中断の理由が発生したら queue の異常終了

background: キューの中身を実行させる

NOTE: RUN におけるタスクの詳細を詰めればほぼアプリの構成が定まるのでは？

#### State 更新の流れ

処理単位という名の関数 task 関数と呼ぶ

task 関数 --> State の更新指示 --> State 管理クラス --> chrome.storage.local の管理クラス --> sotrage 更新完了

State 更新指示、State 管理クラスはドメイン(model)の仕事
chrome.storage.local の管理クラスはインフラストラクチャ層の仕事

ドメイン層の指示に従って State を更新して
storage.local へ保存する

#### ビジネスロジック

## 開発メモ

必要な登場人物

Queue クラス
Queue インスタンスを受け取って Queueu のなかの関数を実行する関数
各処理単位である関数（Queue に突っ込まれる関数）

Queue に関数を突っ込もうと思ったけれど
Queue のクラスの型付けが any だらけになるので断念
代わりに command pattern が解決策にならないか模索する

(Queue は関数を直接ではなくて command インスタンスを取得するとか)

#### Queue と command pattern の合わせだし

##### Command Pattern

https://www.patterns.dev/posts/command-pattern/

> コマンドパターンを使用すると、特定のタスクを実行するオブジェクトを、メソッドを呼び出すオブジェクトから切り離すことができます。

```JavaScript
class OrderManager() {
  constructor() {
    this.orders = []
  }

  placeOrder(order, id) {
    this.orders.push(id)
    return `You have successfully ordered ${order} (${id})`;
  }

  trackOrder(id) {
    return `Your order ${id} will arrive in 20 minutes.`
  }

  cancelOrder(id) {
    this.orders = this.orders.filter(order => order.id !== id)
    return `You have canceled your order ${id}`
  }
}

const manager = new OrderManager();

manager.placeOrder("Pad Thai", "1234");
manager.trackOrder("1234");
manager.cancelOrder("1234");
```

以上のコードでは
manager インスタンスを介して直接メソッドを呼び出している

このメソッドを manager から切り離す

```JavaScript
//
// OrderManagerからメソッドをすべて取り除いて
// 代わりにexecuteﾒｿｯﾄﾞ一つだけを持たせる
//
class OrderManager {
  constructor() {
    this.orders = [];
  }

    //
    // Commandインスタンスのexecuteメソッドを実行するだけ
    //
  execute(command, ...args) {
    return command.execute(this.orders, ...args);
  }
}

//
// 新たにCommandクラスをつくり
//
class Command {
  constructor(execute) {
    //
    // 渡された関数をexecuteという共通の名前で登録する
    //
    this.execute = execute;
  }
}

//
// コマンドで実行する関数とな
//
function PlaceOrderCommand(order, id) {
    //
    // Commandには実際に実行することになる関数を渡す
    //
  return new Command(orders => {
    orders.push(id);
    return `You have successfully ordered ${order} (${id})`;
  });
}

function CancelOrderCommand(id) {
  return new Command(orders => {
    orders = orders.filter(order => order.id !== id);
    return `You have canceled your order ${id}`;
  });
}

function TrackOrderCommand(id) {
  return new Command(() => `Your order ${id} will arrive in 20 minutes.`);
}
```

`execute()`メソッドは与えられた関数をすべて実行する関数

```JavaScript
const manager = new OrderManager();

manager.execute(new PlaceOrderCommand("Pad Thai", "1234"));
manager.execute(new TrackOrderCommand("1234"));
manager.execute(new CancelOrderCommand("1234"));
```

つまり
<<<<<<< HEAD
Command インスタンスには execute()呼出で実行できる関数を登録する
Command インスタンスを生成する関数はコンストラクタ関数である
OrderManager インスタンスの execute()にはこのコンストラクタ関数の new オブジェクトを渡す
つまり実際には OrderManager.execute()には Command のインスタンスを渡している
OrderManager は order プロパティをもち、これが実際に実行される関数に渡されるから OrderManager がわざわざ呼び出す意義がある 0
=======
Command には execute()呼出で実行できる関数を登録する
Command インスタンスには実際に実行することになる関数を渡す
Command インスタンスを生成する関数はコンストラクタ関数である
OrderManager インスタンスの execute()にはこのコンストラクタ関数の new オブジェクトを渡す
つまり実際には OrderManager.execute()には Command のインスタンスを渡している

> > > > > > > e25cafebc477bc30a375b8a4dc0acd425ccf00cc

これにより

呼出す側と実際に実行するメソッドは分離される
呼出す側は好きなメソッドを実行できる

メリット

-   クラスはメソッドを持つ必要がなくなる
-   実際に実行する関数は呼び出し側のクラスのプロパティと共通の名前をもつことでプロパティを変更できる
-   呼び出し側の都合でクラスに好きなメソッドを実行させることができる

これを応用して Queue クラスを作ってみる

```TypeScript
class Command {
    public execute: (any) => any;
    constructor(execute: (any) => any ){
        this.execute = execute;
    }
}

// --- 実際に実行する関数群 ---
const someProcess = (): void => {
    // ...
}

const otherProcess = (): boolean => {
    // ...
    return true;
}

const anotherProcess = (): number => {
    // ...
    return 11;
};

// --- Commandインスタンスを生成する関数 ---
//
// 任意の関数を渡してCommandインスタンスへ変換する
const generateCommand = (func: (any) => any) => {
    return new Command(func);
};


// class Queue {
//     private _queue: Command[];
//     constructor(queue: Command[]){
//         if(queue.length) {
//             queue.forEach(q => {
//                 this._queue.push(q);
//             })
//         }
//     }

// }

// Queueはただの入れものにしたいのか
// それともexecuteメソッドを持つ、実行もともなうclassにしたいのか



// Commandインスタンスからなる配列であればいい
const queue: Command[] = [];
queue.push(generateCommand(someProcess));
queue.push(generateCommand(otherProcess));
queue.push(generateCommand(anotherProcess));

class QueueManager {

}
// この段階ではCommandのインスタンスをexecute()にわたしてあればいい
manager.execute()
```

```JavaScript
class Command {
    public execute: (any) => any;
    constructor(execute: (any) => any ){
        this.execute = execute;
    }
}

// --- 実際に実行する関数群 ---
const someProcess = (): void => {
    // ...
}

const otherProcess = (): boolean => {
    // ...
    return true;
}

const anotherProcess = (num: number): number => {
    // ...
    return num * num;
};

// --- Commandインスタンスを生成する関数 ---
//
// 任意の関数を渡してCommandインスタンスへ変換する
const generateCommand = (func: (any) => any, ...args) => {
    return new Command(func, ...args);
};


// class Queue {
//     private _queue: Command[];
//     constructor(queue: Command[]){
//         if(queue.length) {
//             queue.forEach(q => {
//                 this._queue.push(q);
//             })
//         }
//     }

// }

// Queueはただの入れものにしたいのか
// それともexecuteメソッドを持つ、実行もともなうclassにしたいのか



// Commandインスタンスからなる配列であればいい
const queue: Command[] = [];
queue.push(generateCommand(someProcess));
queue.push(generateCommand(otherProcess));
queue.push(generateCommand(anotherProcess, 11));

class QueueManager {
    private _que: Command[];
    constructor(que: Command[]){
        que.forEach(q => {
            _que.push(q);
        });
    };

    execute

    popAll(): void {
        while(this._que.length){
            this._que.pop():
        }
    }

}
// この段階ではCommandのインスタンスをexecute()にわたしてあればいい
manager.execute()
```

いや、いったんボトムアップで作ってみよう...

```TypeScript
// RUN以降の処理をひとまずひとまとめにするとどうなるか


const inject_contentScript = async (scriptName: string, tabId: number): Promise<void> => {
    await chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: [scriptName],
    });
}

const inquireTabsForResponse = async(tabId: number, sendto: extensionNames, order: orderNames[]): Promise<iResponse> => {
    const response: iResponse = await sendMessageToTabsPromise({
        from: extensionNames.background,
        to: sendTo,
        order: order
    });
    return response;
}

const executeRUN = async(): Promise<{
    isSuccess: boolean;
    phase: string;
    failureReason: string;
}> => {
    try {
        // tabId取得処理と保存処理
        await inject_contentScript("contentScript.js", tabId);
        const response: iResponse = await inquireTabsForResponse(tabId, extensionNames.contentScript, [orderNames.sendStatus]);
        // responseに収められたstatusの保存
        // statusの値を検査 条件分岐
            // 検査合格：次へ
            // 不合格：失敗 return {isSuccess: false, phase: "after injecting contentScript.js", failureReason: "language is not English"}
        await inject_contentScript("contentScript.js", tabId);
        // 5秒くらい待ったほうがいいかも
        const response2: iResponse = await inquireTabsForResponse(tabId, extensionNames.captureSubtitle, [orderNames.sendSubtitle]);
        // response2に収められた字幕データをstateへ保存
        // 字幕データが壊れていないか検査
            // 検査合格：次へ
            // 不合格：失敗 return {isSuccess: false, phase: "after injecting captureSubtitle.js", failureReason: "Could not capture subtitles"}
        await inject_contentScript("controller.js", tabId);
        const response3: iResponse = await inquireTabsForResponse(tabId, extensionNames.controller, [orderNames.sendCompleted]);

        return {isSuccess: true, phase: "", failureReason: ""};
    }
    catch(err) {console.error(err.message)}
}


chrome.runtime.onMessage.addListener((
    message: iMessage,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: iResponse) => void
) => {
    const { order, ...rest} = message;
    // ...
    if(order.includes(orderNames.run)){
        const tabId: number = await checkTabIsCorrect();
        const result = await executeRUN();
        // resultの検査
        // result結果にしたがってpopupへ返事を返す
        // or
        // Errorを出力する
        sendResponse({})
    }
});
```

なんか次のパターンが見て取れる
content scrpt inject
content script へステータスなどの要求
ステータスの State への保存
ステータスの検査、検査結果に応じた次のアクション

これは一般化できるか？

```TypeScript

```

#### observer の導入

State の変更を検知して変更値に応じて notify する仕組みの導入を検討する
State に何か新しい機能を付けるのは面倒なので
らくちんな middleware を導入できないかしら？

検討１：proxy API

proxy を導入するにしても、何に対して？
State.\_state の場合、State が proxy インスタンスを持つことになる
(\_state は private なので)

model

```TypeScript
import { State } from "../utils/State";
import {iProgress, iPageStatus, iSubtitles, iTabId, iContentUrl } from './annotations';

const progress_storage_key = "key__progress_state";
const progressState = new State<iProgress>(progress_storage_key);

const pageStatus_storage_key = "key__pageStatus_state";
const pageStatusState = new State<iProgress>(pageStatus_storage_key);

const subtitles_storage_key = "key__subtitles_state";
const subtitlesState = new State<iSubtitles>(subtitles_storage_key);

const tabId_storage_key = "key__tabId_state";
const tabIdState = new State<iProgress>(tabId_storage_key);

const contentUrl_storage_key = "key__contentUrl_state";
const contentUrlState = new State<iContentUrl>(contentUrl_storage_key);



```

確認できるパターン

content script をインジェクトする
background script 側からインジェクトしたコンテントスクリプトへ何かしらのデータを要求する
要求したデータに併せてモデルを更新する
モデルの変化結果から状態を判断する
状態に応じて何らかの結果が返る
参考になりそう...?
https://qiita.com/emaame/items/745a35509fdfc7250026

#### 1/23

こんがらがってきた

ちょっと整理

やろうとしていること
中目標として MVC モデルの導入、DDD 設計思想に近づけたい
そのために必要なこととして

-   order にたいして処理に必要な関数を Queue につめて Queue を実行するシステムにする
-   state の変更内容に応じて notify するシステムにする

##### order と Queue の実装に関して

想定する処理の一般的な流れ

例：popup から RUN ボタンが押された

前提：必要な state の生成は chrome.runtime.onInstalled で済んでいる

-   メッセージ受信機能がメッセージハンドラを呼び出す
-   メッセージハンドラはメッセージ内容を読んで、必要な処理（関数）を Queue へつめる
-   Queue を queue 実行関数へ渡す
-   Queue の関数が一つずつ実行される
-   実行するにつれて必要な state の変更も発生する
-   すべての処理が無事に済んだら success, うまくいかなかったら failure を返す

実装しようとしたときにぶち当たった障害

-   Queue につめる関数を一般化したいけれど、戻り値の扱いが異なるから一般化できない
    すくなくとも今の自分の腕では...

##### state observer の実装に関して

結論：proxy はいらない。既存の State に observable を持たせればいい

```TypeScript
/*
  確認した成果：
  - proxyはなんでもできる。でも型付けが難しい
  - proxyはspread syntaxに対応していない
  - proxyは、他のオブジェクト同様参照を扱う



*/
const deepCopier = <T>(data: T): T => {
  return JSON.parse(JSON.stringify(data));
};


// このままだと型付けがanyだらけだ...
//
class Observable {
  private _observers: ((param?: any) => any)[];
  constructor() {
    this._observers = [];
  }

  register(func: (param?: any) => any): void {
    this._observers.push(func);
  }

  unregister(func: (param?: any) => any): void {
    this._observers = this._observers.filter((observer) => observer !== func);
  }

  notify(data: any) {
    this._observers.forEach((observer) => observer(data));
  }
}

class State<TYPE extends object> {
  private _state: TYPE;
  private _proxy: TYPE;
  constructor(baseObject: TYPE, handler: ProxyHandler<TYPE>) {
    this._state = baseObject;
    this._proxy = new Proxy(this._state, handler);
  }

  setState(prop: { [Property in keyof TYPE]?: TYPE[Property] }): void {
    // いったんここでdeep copyをとるとして...
    //
    // NOTE: spread構文だとproxyのsetハンドラは反応しないらしい...
    // this._proxy = {
    //   ...this._proxy,
    //   ...prop,
    // };

    // 必ず浅いコピーを作る
    const temporary = {...prop};
    Object.keys(temporary).forEach((p, index) => {
      if(p in this._proxy) this._proxy[p] = prop[p];
    })
  }

  getState(prop?: string): TYPE {
    // かならずコピーを渡すこと
    if(prop && prop in this._proxy){
      return this._proxy[prop];
    }
    return deepCopier<TYPE>(this._proxy);
  }
}

interface iProgress {
  isScriptInjected: boolean;
  isSubtitleCapturing: boolean;
  isSubtitleCaptured: boolean;
  isTranscriptRestructured: boolean;
}

const progressBase: iProgress = {
  isScriptInjected: false,
  isSubtitleCapturing: false,
  isSubtitleCaptured: false,
  isTranscriptRestructured: false,
};

// すごく一時的な処理だけど
// obseervableのインスタンスをいったん作る
const observable = new Observable();
const observer = (props) => {
  console.log("[observer];");
  console.log(props);
};
observable.register(observer);

// handlerにはobservableをわたせられれば
// あとは再利用可能なオブジェクトになるはず
const handler: ProxyHandler<iProgress> = {
  set: function (
    target: iProgress,
    property: keyof iProgress,
    value: boolean,
    receiver: any
  ) {
    // NOTE: targetはnotfyする時点で変更が反映されてしまうらしいので
    // 一旦コピーをとってこれをprevStateとする
    const temp = {...target};
    // 変更をnotifyする
    console.log("[proxy] set");
    observable.notify({ prop: property, value: value, prevState: temp });
    return Reflect.set(target, property, value, receiver);
  },
  get: function (target: iProgress, property: keyof iProgress, receiver: any) {
    // Reflect.getは参照を返す
    console.log("[proxy] get");
    return Reflect.get(target, property, receiver);
  },
};


// // NOTE: proxy.getは参照を返している
// const proxyProgress = new Proxy(progressBase, handler);
// proxyProgress.isScriptInjected = true;
// const refProxyProgress = proxyProgress;
// console.log(refProxyProgress);
// refProxyProgress.isSubtitleCaptured = true;
// // isSubttileCaptured: trueだった
// console.log(proxyProgress);

// THIS WORKED
// なんだかhandlerともとのオブジェクトをそのまま渡すくらいなら
// Stateなんてclassいらないのでは?
const state_progress: State<iProgress> = new State<iProgress>(
  progressBase,
  handler
);
state_progress.setState({
  isScriptInjected: true,
  isSubtitleCaptured: true,
});

console.log("current proxy:");
console.log(state_progress.getState());

state_progress.setState({
  isTranscriptRestructured: true,
  isSubtitleCaptured: false,
});



console.log("current proxy:");
console.log(state_progress.getState());

// いまんところ
console.log(state_progress.getState("isScriptInjected"));


// おさらい
// シャローコピーはspread構文でおｋ
const dummy = {
  name: "Jonathan",
  age: 16,
  country: "USA"
};

const tmp = {...dummy};
tmp.name = "JOJO";
console.log(dummy)
console.log(tmp)

// // https://stackoverflow.com/questions/32308370/what-is-the-syntax-for-typescript-arrow-functions-with-generics
// const generateProxyHandler = <TYPE extends object, K extends keyof TYPE>(observable: Observable): ProxyHandler<TYPE> => {
//   return {
//     set: function(target:TYPE, property: string | number | symbol, value: any, receiver?: any): boolean {
//       if(target[property] === undefined)return false;
//       // 変更をnotifyする
//       observable.notify({prop: property, value: value, prevState: target});
//       return Reflect.set(target, property, value, receiver);
//     },
//     get: function(target:TYPE, property: PropertyKey, receiver?: any): boolean {
//       // Reflect.getは参照を返す
//       return Reflect.get(target, property, receiver);
//     }
//   }
// };

// // const observableForProgress = new Observable();
// // const progressHandler2 = new generateProxyHandler<iProgress>(observableForProgress);

// // これだとstateインスタンスをいくつでも作れてしまうことに注意
// class generateState<TYPE extends object> {
//   public stateInstance: State<TYPE>;
//   private _observableInstance: Observable;
//   private _proxyHandler: ProxyHandler<TYPE>;
//   constructor(base: TYPE, observable: Observable) {
//     this._observableInstance = observable;
//     this._proxyHandler = new generateProxyHandler<TYPE>(observable);
//     this.stateInstance = new State<TYPE>(base, this._proxyHandler);
//   }

//   getInstance(): State<TYPE> {
//     return this.stateInstance;
//   }
// }

// const progressState2 = new generateState(progressBase, new Observable());

// // Proxyについて勉強してstateのつくりを見直すこととする
// // Proxyについて詳しい(TypeScriptはない)
// // https://javascript.info/proxy

```

作ってみて思ったのが
Proxy は導入してもいいけれど
型をつけるのがむずかしく、
結構ハードコーディングの可能性が出てくるのと、
そもそも要らないのではという話

使い方が悪いかもだけど
notify するためだけに使おうとおもっていじっていたが、
結局順序として setstate してから proxy に移るので
じゃあ setstate で完結させればいいじゃんとなった

機能がダダ被りなので、
state を作るか proxy を使うかどちらかの話になってくる

notify は setstate 内で呼出せばいいだけなので
結局 proxy 入らないねって話になる

## 1/25:処理についておさらい

ユーザ操作：

-   [popup](#popupが開かれる)
-   [popup](#RUNが押される)
-   [ブラウザ] ウィンドウのサイズを変更する
-   [ブラウザ] 字幕の言語を変更する
-   [ブラウザ] (公式の)トランスクリプトを ON または OFF にする
    一度拡張機能を実行済ならこれに合わせて閉じる、再度開かれたら開く
-   [ブラウザ](<#URLが変わる(動画が切り替わる)>)
-   [ブラウザ] タブを閉じる
-   [ExTranscript] ExTranscript を閉じる

[設計に関する考察](#設計に関する考察)

#### popup が開かれる

前提：chrome.runtime.sendMessage は sendResponse が返されることが前提である

拡張機能が ON になってから popup を開くと、mount 時の useEffect が発動する
それ以降の popup の開閉は毎回発火する useEffect が発動することになる

```TypeScript
// popup.tsx

const Popup = (): JSX.Element => {
  // popupの初回呼び出しが済んでいるかどうか
  const [active, setActive] = useState<boolean>(false);
  // RUNボタンを押して、ExTranscriptが挿入されるまでの間はtrue
  const [loading, setLoading] = useState<boolean>(false);
  // ExTranscriptが挿入完了したらtrue
  const [complete, setComplete] = useState<boolean>(false);
  // popupが表示されたページがUdemyの講義ページならばtrue
  const [matchedPage, setMatchedPage] = useState<boolean>(false);

  useEffect(() => {
    console.log("[popup] Set onMessage listener");
    chrome.runtime.onMessage.addListener(messageHandler);
    chrome.runtime.sendMessage({
      from: extensionNames.popup,
      to: extensionNames.background,
      order: [orderNames.isUrlCorrect]
    })
      .then((result) => {
        console.log(result);
        setMatchedPage(result);
      })
      .catch((err) => console.error(err));

    return () => {
      console.log("[popup] Removed onMessage listener");
      chrome.runtime.onMessage.removeListener(messageHandler);
    };
  }, []);

  useEffect(() => {
    console.log("Is this page correct?");
    chrome.runtime.sendMessage({
      from: extensionNames.popup,
      to: extensionNames.background,
      order: [orderNames.isUrlCorrect]
    })
      .then((result) => {
        console.log(result);
        setMatchedPage(result);
      })
      .catch((err) => console.error(err));
  });

  const buttonHandler = (): void => {
    console.log("[popup] RUN");
    chrome.runtime.sendMessage(messageTemplates.run);
  };

  const messageHandler = (
    message: iMessage,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response: iResponse) => void
  ) => {
    if (message.to !== extensionNames.popup) return;
    const { order, ...rest } = message;
    //
  };

  return (
    // ...
  );
};

// ...
```

```TypeScript
// background.ts

const popupMessageHandler = async (m: messageTemplate): Promise<void> => {
  try {
    console.log("...message from POPUP");
    const { message, sender, sendResponse } = m;
    const { order, ...rest } = message;
    const refStatus: State<iStatus> = stateList.caller<iStatus>(
      nameOfState.status
    );
    if (order && order.length) {
      if(order.includes(orderNames.isUrlCorrect)){
        // URLが正しいのかチェックして判定結果をbooleanで返す
        //
        // urlがただしくてもこの時点ではtabIdを保存しない
        // このタブで必ず拡張機能を実行するとは限らないので
        // なので純粋にboolean値を返すだけ
        // StateにtabIdは保存しない
        //
        // 処理内容
        // ほしい情報はすべてsenderに含まれている
        // url, tabId
        // なのでまじでURLを判定するだけ
        const pattern = /https:\/\/www.udemy.com\/course\/*/gm;
        const result: RegExpMatchArray = sender.url.match(pattern);
        sendResponse({url: true, complete: true})

      }
    }
    if (sendResponse) sendResponse({ complete: true });
  } catch (e) {
    console.error(e);
  }
};

```

処理順序:

-   [poup] マウント時または毎度の useEffect()で background へ`order:[orderNames.isUrlCorrect]`を送信する

-   [background] メッセージハンドラが受信してメッセージに応じた処理関数へ移動する
-   [background] メッセージに含まれる sender から URL を取得する
-   [background] url を matchURL と比較して比較結果を sendResponse()で返す
    `{complete: true, url: true}`
-   [poup] sendResponse の結果に応じて state を変更し、popup の表示内容を変える

popup の state について:

-   `matchedPage`: popup を開いたときの tab の URL が正しいかについての状態を管理する state

#### RUN が押される

前提：

-   RUN ボタンは`matchedPage`が true の時に有効になるとする
-   sendResponse()で返事が返されることを前提とする
-   sendResponse()はエラーが返されることも想定する

エラーの可能性箇条書き：

-   字幕が英語でない、トランスクリプトが開かれていない
    alert で字幕を英語にするように、またはトランスクリプトを開くように促す

-   処理途中で字幕の言語を変えた、トランスクリプトを閉じた
    alert で失敗を表示し、英語とトランスクリプトを戻して再度実行してもらうように促す

-   それ以外のエラー
    エラーだからどうしようもないよ

つまり大別して、成功、失敗（アラート）、エラー
成功：`complete: true`
それ以外: `complete: false`

RUN ボタンが押されたら、background へ`order: [orderNames.run]`を送信する

```TypeScript
// popup.tsx

const Popup = (): JSX.Element => {
  // RUNボタンを押して、ExTranscriptが挿入されるまでの間はtrue
  const [loading, setLoading] = useState<boolean>(false);
  // ExTranscriptが挿入完了したらtrue
  const [complete, setComplete] = useState<boolean>(false);
  // popupが表示されたページがUdemyの講義ページならばtrue
  const [matchedPage, setMatchedPage] = useState<boolean>(false);


  const buttonHandler = (): void => {
    console.log("[popup] RUN");
    chrome.runtime.sendMessage({
      from: extensionNames.popup,
      to: extensionNames.background,
      order: [orderNames.run]
    })
    .then(res => {
      setComplete(res.success)
    })
  };

  return (
    <div className="container">
      // ...
      <button onClick={runButtonHandler} disabled={!matchedPage}>RUN</button>
    </div>
  );
};

```

```TypeScript
// background.ts

const popupMessageHandler = async (m: messageTemplate): Promise<void> => {
  try {
    console.log("...message from POPUP");
    const { message, sender, sendResponse } = m;
    const { order, ...rest } = message;
    const refStatus: State<iStatus> = stateList.caller<iStatus>(
      nameOfState.status
    );
    if (order && order.length) {
      if (order.includes(orderNames.run)){
        // phase 1.
        // is URL correct?
        const pattern = /https:\/\/www.udemy.com\/course\/*/gm;
        const result: RegExpMatchArray = sender.url.match(pattern);
        if(!result) {
          sendResponse({complete: true, alert: "Invalid URL. Extension works only in https://... "});
          return;
        }

        // tabIdとURLの保存
        // senderから取得できる

        // phase 2.
        // inject contentScript.js

        await chrome.scripting.execute({target: { tabId: tabId }, files: ["contentScript.js"]});

        // TODO: ここでcontentScript.jsが展開完了したのを確認したうえで次に行きたいのだが...

        const response: iResponse = await sendMessageToTabsPromise({
          from: extensionNames.background, to: extensionNames.contentScript,
          order: [orderNames.sendStatus]
        });

        if(!response.language || !response.transcriptExpanded) {
          sendResponse({complete: true, alert: "Required subtitle language English and tunr Transcript ON"});
          return;
        }

        // contentScript.jsからのステータスをstateへ保存

        // phase 3.
        // inject captureSubtitle.js

        // tabIdはStateから取得したとして
        await chrome.scripting.execute({target: { tabId: tabId }, files: ["captureSubtitle.js"]});

        // TODO: ここでcontent scriptが展開完了したのを確認したうえで次に行きたいのだが...

        const response: iResponse = await sendMessageToTabsPromise({
          from: extensionNames.background, to: extensionNames.contentScript,
          order: [orderNames.sendSubtitles]
        });

        // response.subtitleを検査(長さがおかしいとか)
        // いまのところテキトー
        if(!response.subtitles.length) {
          sendResponse({comolete: true, error: "Failed to capture subtitle data"});
          return;
        }

        // 検査が問題なければstateへ字幕データを保存したとして

        // phase 4.
        // inject controller.js

        await chrome.scripting.execute({target: { tabId: tabId }, files: ["controller.js"]});

        // TODO: ここでcontent scriptが展開完了したのを確認したうえで次に行きたいのだが...

        const response: iResponse = await sendMessageToTabsPromise({
          from: extensionNames.background, to: extensionNames.contentScript,
          order: [orderNames.sendStatus]
        });

        // 検査：controller.jsがExTranscriptを正常展開できたか

        // 検査結果失敗ならばpopupへ失敗送信、return

        // 成功ならstateを更新

        // すべて正常完了で
        sendResponse({complete: true, success: true});
      }
    }
  } catch (e) {
    console.error(e);
  }
};

```

NOTE: 以下の処理チャートは state の更新について考えていない

-- phase 1 --
URL チェック
検査結果 ? tabId と URL の保存、次の処理へ : popup へエラーを返す(そもそも無効な URL では RUN ボタンは無効なはずなので)

-- phase 2. --

contentScritp.js の inject
contentScript.js へステータス送信要求
contentScript.js からのステータス検査
検査結果 ? ステータスを保存し次の処理へ : popup へアラート返す

起こりうるエラー：
css selector がマッチしない(Udemy が selector を変更したとか)

-- phase 3. --

captureSubtitle.js を inject
captureSubtitle.js へ字幕データ要求
字幕データを取得、検査（データがおかしくないか）
検査結果 ? 字幕データを保存し次の処理へ : popup へアラートを返す

起こりうるエラー：
css selector がマッチしない(Udemy が selector を変更したとか)

-- phase 4. --

controller.js を inject
controller.js が正常に ExTranscript を展開できたか確認
正常展開 ? popup へ正常完了の返事 : エラー出力

orderName.run を受け取った後の処理に見られる傾向：

-   content script の inject

-   content script からのメッセージで次の処理に必要な情報を取得する
    または
-   background script から inject した content script へ必要な情報を催促して取得する

-   取得した情報を検査して state へ保存して次へ進むか、処理を中断してエラーを返す

#### URL が変わる(動画が切り替わる)

`chrome.tabs.onUpdated.addListener`で検知する

拡張機能が展開済の時に、URL が変更されたときの挙動をここで制御する

継続条件：

-   拡張機能が未展開であるけど、Udemy 講義ページである
    なにもしない

-   拡張機能が展開されていて、同じタブで Udemy 講義ページだけど末尾の URL が変更されたとき
    拡張機能をリセットして引き続き展開する

-   拡張機能が展開されていて、同じタブで Udemy 講義ページ以外の URL になった時
    拡張機能は OFF にする

-   タブが切り替わった
    何もしない

-   拡張機能が展開されていたタブが閉じられた
    拡張機能を OFF にする

次の時はどうするか:

-   すでに拡張機能が実行されているときにページのユーザ操作によるリロードがあった
    変わらず展開したい
    google 翻訳アプリも変わらず展開しているし
    OFF になるのは、
    tab が閉じられたとき、ユーザの操作によって拡張機能上の OFF ボタンが押されたとき
    拡張機能マネージャでが OFF にされたとき、
    そのタブで別の Udemy 講義ページ以外に移動したとき

Udemy ページの挙動と chrome.tabs.onUpdated の挙動:

-   リンクをたどって Udemy 講義ページへ移動したとき
    "loading"は二度以上起こる
    しかし、URL は同じ(#以下が変わるだけ)

    ...よく考えたらこれ関係ないな...

...以上の挙動と事情がすべて反映されるように条件分岐を設ける

NOTE:
たとえば RUN がおされて処理の最中にページがリロードされたときの処置はまだ考えていない

```TypeScript
chrome.tabs.onUpdated.addListener(
  async (
    tabId: number,
    changeInfo: chrome.tabs.TabChangeInfo,
    Tab: chrome.tabs.Tab
  ): Promise<void> => {
    // "https://www.udemy.com/course/*"以外のURLなら無視する
  const { url, status } = changeInfo;
  const pattern = /https:\/\/www.udemy.com\/course\/*/gm;
  const { resturctured } = progressState.getState();
  const { tabId } = tabIdState.getState();
  const { url } = contentUrl.getState();
  // 条件１：
  // 拡張機能が未展開、changeInfo.statusがloadingでないなら無視する
  if(changeInfo.status !== "loading" || !restructured) return;


  // 条件２：
  // 拡張機能が展開済だとして、tabIdが展開済のtabId以外に切り替わったなら無視する
  // return;
  if(Tab.id !== tabId) return;


  // 条件３：
  // 展開中のtabId && chnageInfo.urlがUdemy講義ページ以外のURLならば
  // 拡張機能OFF
  // --> 拡張期のOFFの処理へ
  if(restructured && Tab.id === tabId) {
    // おなじURLでのリロードか？
    if(changedInfo.url === undefined) {
      // 拡張機能は何もしない
      return;
    }
    else if(!changedInfo.url.match(pattern)) {
      // Udemy講義ページ以外に移動した
      // --> 拡張機能OFF処理へ
    }

  // 条件４：
  // 展開中のtabIdである && changeInfo.urlが講義ページだけど末尾が変化した(#以下は無視)
  // 動画が切り替わった判定
    else if(changeInfo.url.match(pattern) && changeInfo.url !== url){
      // 動画が切り替わった
      // --> リセット処理へ
    }
  }
  }
);

```

##### リセット処理

要確認：

-   state はどのようにリセットすべきか
-   content script は inject されたままなのか
-   content script は inject されたままだとして、ちゃんとリロードされたページの DOM を取得できるのか？

動画が切り替わったら

-   各 content script のイベントリスナを remove して再度セットする必要
-   各 content script のイベントリスナリセットを通知、完了報告管理
-   `state<iSubtitles>.subtitles: null`に
-   `state<iTabId>`はそのまま
-   `state<iContentUrl>`は URL が変わったのでその反映だけ
-   `state<iProgress>`は...
-   ExTranscript は中身をいったん空にする(空にして表示する loading circle でも表示するかい？)

進行状況 state：

```TypeScript

// ベース

interface iProgress {
  isContentScriptInjected: boolean;
  isCaptureSubtitleInjected: boolean;
  isControllerInjected: boolean;
  isSubtitleCapturing: boolean;
  isSubtitleCaptured: boolean;
  isTranscriptRestructured: boolean;

}

const progressBase: iProgress = {
  isContentScriptInjected: false,
  isCaptureSubtitleInjected: false,
  isControllerInjected: false,
  isSubtitleCapturing: false,
  isSubtitleCaptured: false,
  isTranscriptRestructured: false
};

// 動画の切り替えでリセットは...
const progressBase: iProgress = {
  // 各 content script はinjectされたままのでtrueのまま
  isContentScriptInjected: true,
  isCaptureSubtitleInjected: true,
  isControllerInjected: true,
  //
  // 字幕データは取り直しになるのでfalseだけれど...
  //
  isSubtitleCapturing: false,
  isSubtitleCaptured: false,
  //
  // 動画の切り替わりで、中身は空になるけれど、「展開」はしているからtrue
  //
  isTranscriptRestructured: true
};
```

この進行状況 state だと矛盾が起こりそうだなぁ...

リセットタスク：

-   各 content script のイベントリスナを remove して再度セットする必要
-   各 content script のイベントリスナリセットを通知、完了報告管理
-   `state<iSubtitles>.subtitles: null`に
-   `state<iTabId>`はそのまま
-   `state<iContentUrl>`は URL が変わったのでその反映だけ
-   `state<iProgress>`は...
-   ExTranscript は中身をいったん空にする(空にして表示する loading circle でも表示するかい？)

-   [background] contentScript.js へリセット通知
-   [background] captureSubtitle.js へリセット通知
-   [background] controller.js へリセット通知
-   [background] 各 content script から`{success: boolean;}`の返事取得
-   [background] 全ての content script sucess が true だったら state を更新
-   [background] 字幕取得処理を実施
-   [background]

-   [contentScript] toggle ボタンの要素は変化しないのでリセット不要
-   [contentScript] ccPopupButton 要素も変化しないのでリセット不要
    結果、contentScript はリセット不要でした...

-   [captureSubtitle] state のリセット
-   [captureSubtitle] 要素へのリスナはないのでリスナのリセット不要
-   [captureSubtitle] 毎度関数の実行時にすべて DOM を取得しなおすのでリセット不要
-   [captureSubtitle] 実行関数をサイド呼出せばいいだけっぽい
-   [captureSubtitle] 処理完了したら background へ字幕データを送信する

-   [controller] state は...
    \_state: iControllerState 不要
    \_subtitles リセット
    \_highlight リセット
    \_ExHighlight リセット
    \_indexList リセット

```TypeScript
// background.ts
//
// chrome.tabs.onUpdated.addListener()より...

const resetHandler = async (): Promise<void> => {
  try {
    // reset開始...
    //
    // 各content scriptへリセット通知、すべて成功ならエラーがスローされない
    // reset orderというか初期化しなおしだなただしくは
    await resetOrderHandler();
    // stateを更新する
    // 更新完了したとして
    // ページのステータスを調べて問題なければ
    // 字幕取得
    const isSubtitleCaught: iResponse = await sendMessageToTabsPromise({
      from: extensionNames.background,
      to: extensionNames.captureSubtitles,
      order: [orderNames.sendSubtitle]
    });
    // 字幕データをstateに保存できたとして
    // controllerへ字幕データ: subtitles を送信
    const isRestructured: iResponse = await sendMessageToTabsPromise({
      from: extensionNames.background,
      to: extensionNames.controller,
      subtitles: subtitles
    });
    if(isRestructured.success) {
      // reset完了
      // stateを更新する
    }
    else {
      throw new Error("Error: Failed to restructure ExTranscript after sent subtitles data");
    }
  }
  catch(err) {
    console.error(err.message);
  }
}

// iResponse.response: {
//   success: boolean;
//   failureReason: string;
// }を取得する
const resetOrderHandler = async(): Promise<void> => {
  const captureSubtitle = sendMessageToTabsPromise({
    from: extensionNames.background,
    to: extensionNames.captureSubtitles,
    order: [orderNames.reset]
  });
  const controller = sendMessageToTabsPromise({
    from: extensionNames.background,
    to: extensionNames.controller,
    order: [orderNames.reset]
  });
  try {
    const results: iResponse[] = await Promise.all([captureSubtitle, controller]);
    const failures: string[] = results.filter(r => {
      if(!r.success) return r.failureReason;
    });
    if(failure.length) {
      throw new Error(`Failed to reset content script. ${failures.join(" ")}`);
    }
  }
  catch(err) {
    console.error(err.message);
  }
}
```

```TypeScript
// constants.ts

export const orderNames = {
  // ...
  reset: "reset",
} as const;

export interface iResponse {
  // これはmessage passingのsendResponseで必須のプロパティ
  // メッセージの返事を正常に送信することを示す
  complete?: boolean;
  // orderの処理が正常に完了したことを示す
  success?: boolean;
  failureReason?: string;
}
```

##### 拡張機能 OFF 処理

要確認：

-   state はどのようにリセットすべきか
-   content script はそのページから除去できるのか
-   除去できないとしたらどうするか

## 1/28:各処理機能の実装をしてみる

[1/25:処理についておさらい](#1/25:処理についておさらい)
にて検討した処理を実装してみる

たびたび障害となる、service worker ゆえに変更を保持できない問題
これは別の「環境」を用意してやれば解決するだろうか

つまり background script じゃない環境を state のために用意すればいちいちロード、アンロードに対応しなくていい
もしくは最小限に抑えられるのか

```TypeScript
/**
 * よく考えたらstateをやたら作る必要はなくて、すべてまとめちゃっても別にいいわけだ
 * そうなるとstateListみたいなものを作る必要はなくなるわけで
 * */
//
// これは間違い
// interface iModel {
//     [Property in keyof iProgress]: iProgress[Property];
//     [Property in keyof iPageStatus]: iPageStatus[Property];
//     [Property in keyof iTabId]: iTabId[Property];
//     [Property in keyof iContentUrl]: iContentUrl[Property];
//     [Property in keyof iSubtitle]: iSubtitle[Property];
// };

// こっちがただしい
interface iModel extends iProgress, iPageStatus, iContentUrl, iTabId, iSubtitle{};

// modelBaseは新規プロパティの追加も削除もない
const modelBase: iModel = {
    isContentScriptInjected: false,
    isCaptureSubtitleInjected: false,
    isControllerInjected: false,
    isSubtitleCapturing: false,
    isSubtitleCaptured: false,
    isTranscriptRestructured: false,
    isTranscriptON: false,
    isEnglish: false,
    isWindowTooSmall: false,
    tabId: null,
    url: null,
    subtitles: null
} as const;

const model: Model = new Model();
model.update({isContentScriptInjected: true, isEnglish: true, isOpened: true});

class Model<T exntends object> {
    private _storage_key: string;
    private _local_storage: LocalStorage;
    constructor(key: string, base: T) {
        this._storage_key = key;
        this._local_storage = new LocalStorage(this._storage_key);
        this._local_storage.save(base);
    };

    async update(prop: {[Property in keyof T]?: T[Property]}): Promise<void> {
        // いちいち毎度すべていったん取得してから、引数に一致するプロパティだけ変更して
        // 変更したすべてを保存する
        // なのでひと手間ある
        const current: T = await this._local_storage.load();
        current = {...current, ...prop};
        await this._local_storage.save(current);
    }

    async load(): Promise<T> {
        const current: T = await this._local_storgae.load();
        return deepCopier(current);
    }

    async clearAll(): Promise<void> {
        await this._local_storage.clearAll();
    }
}
```

```TypeScript

chrome.runtime.onInstalled.addListener((details: chrome.runtime.InstalledDetails): void => {
    console.log(`[background] onInstalled: ${details.reason}`);
    const model: Model = new Model("__key__local_storage_", modelBase);
});

const model_ = (function() {
    const instance: Model = null;

    return {
        register: (m: Model): void => {
            instance = m;
        },
        unregister: (): void => {
            instance = null;
        },
        _: (): Model => {
            return instance;
        }
    }
})();

```

## 1/31

**update**やること：

-   background.ts の update に伴った各 content script の update
-   エラーハンドリング：どういう場合にエラースローでどういうときに続行なのか定義する
-   Model の見直し：エラーハンドリングと伴って
-   各`TODO`の消化
-   Observer の導入: state の変化で反応させられる View に導入する
-   拡張機能の OFF 機能の実装
-   （可能ならば）transcript が ON じゃなくても、英語字幕でなくても機能を ON にできるようにする
-   見た目をイカした感じに

#### Observer の導入

Model の変化で View を変化させるような場面は存在した...

例：

-   popup の`capturing`表示、`complete`表示に関して

state の`isSubtitleCaptured`, `isSubtitleCapturing`の値の変化を
notify して popup を変化させてもいいね

-   controller.js が表示する subtitles データの変化を notify されるようにする

`state.subtitles`が変化したら notfy されて取得する仕組みにする

```TypeScript
class Observable {
  private _observers: (params?:any) => any | void;
  constructor() {
    this._observers = [];
  };
}
```
