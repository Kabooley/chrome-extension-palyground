# Applying Architecture


MVCとDDDの設計思想を取り入れたい

そのための奮闘記

## ドメイン・レイヤーを当てはめる

考えのまとめ


#### ユーザの操作

起こりえるユーザ操作と、拡張機能に関わりそうな部分

@popup

- popupを開く
- popup上のRUNボタンを押す

@Udemy-page

- ブラウザのサイズを変更する
- 字幕を変更する
- トランスクリプトをON/OFFにする
- URLが変わる(動画が切り替わる)
- tabを閉じる（ブラウザを閉じる）

- ExTranscriptを閉じる


#### 一般的な処理の流れ

ユーザの操作

リスナの反応

メッセージ・パッシングでbackground(アプリケーション・レイヤ)へ信号送信

backgroundで信号受信

backgroundで信号に応じて必要な処理単位をキューに詰める

キューを実行する

処理単位の成功で状態更新

処理単位の失敗でエラー送信、または呼び出し元へもどって表示、キューを空にする

すべての処理単位の成功でキューが空になる

~キューが空になったら必要に応じて信号送信元へ処理結果を返す~

(アプリケーションがなにをビジネスロジックにかかわっているので処理結果を返すのは
ドメイン層の指示に依る)

#### タスク管理のStateとビジネスロジック管理のStateを区別すること

microsoftのDDDの説明によれば
アプリケーション層が、タスク管理のための状態保持をしてもいいらしい

しかし
ビジネスロジックの管理はドメイン層の仕事なので、アプリケーション層から独立していないといかん

#### 単一責任の原則を守ること

責任とは：正常動作に対して責任を持つこと

正常動作に責任を持つクラスの設計方法

> オブジェクト指向におけるクラスは、
> - インスタンス変数
> - インスタンス変数 を正常に制御するメソッド
> から構成されるのが基本です

つまり単一責任とはある変数を変更できるクラスは一つだけで
そのクラスが負う責任は変数の正常動作にたいして責任を負うのである

その変数はビジネスロジック上必要不可欠で
その変数が仕様に反しない値をもつように管理されないといけない


例：popupでRUNを押したら

ユーザ操作：popupでRUNを押した

popup: backgroundへRUNが押された信号を送信

background: chrome.runtime.onMessageで受信

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

NOTE: 思い付きだけれど、各ビジネスロジックの状態変化をnotifyされるようオブザーバをつけるといいことあるのかな？
    queueuのタスクが空になったらqueueの正常終了
    途中でエラーまたは中断の理由が発生したらqueueの異常終了

background: キューの中身を実行させる

NOTE: RUNにおけるタスクの詳細を詰めればほぼアプリの構成が定まるのでは？



#### State更新の流れ

処理単位という名の関数 task関数と呼ぶ

task関数 --> Stateの更新指示 --> State管理クラス --> chrome.storage.localの管理クラス --> sotrage更新完了

State更新指示、State管理クラスはドメイン(model)の仕事
chrome.storage.localの管理クラスはインフラストラクチャ層の仕事

ドメイン層の指示に従ってStateを更新して
storage.localへ保存する


#### ビジネスロジック


## 開発メモ

必要な登場人物

Queueクラス
Queueインスタンスを受け取ってQueueuのなかの関数を実行する関数
各処理単位である関数（Queueに突っ込まれる関数）

Queueに関数を突っ込もうと思ったけれど
Queueのクラスの型付けがanyだらけになるので断念
代わりにcommand patternが解決策にならないか模索する

(Queueは関数を直接ではなくてcommandインスタンスを取得するとか)

#### Queueとcommand patternの合わせだし

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
managerインスタンスを介して直接メソッドを呼び出している

このメソッドをmanagerから切り離す

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
Commandにはexecute()呼出で実行できる関数を登録する
Commandインスタンスには実際に実行することになる関数を渡す
Commandインスタンスを生成する関数はコンストラクタ関数である
OrderManagerインスタンスのexecute()にはこのコンストラクタ関数のnew オブジェクトを渡す
つまり実際にはOrderManager.execute()にはCommandのインスタンスを渡している

これにより

呼出す側と実際に実行するメソッドは分離される
呼出す側は好きなメソッドを実行できる



これを応用してQueueクラスを作ってみる

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