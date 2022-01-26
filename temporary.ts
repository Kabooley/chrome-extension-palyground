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
