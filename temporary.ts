
// このままだと型付けがanyだらけだ...
// 
class Observable {
    private _observers: ((param?:any) => any)[];
    constructor() {
      this._observers = [];
    }
  
    register(func: (param?:any) => any): void {
      this._observers.push(func);
    }
  
    unregister(func: (param?:any) => any): void {
      this._observers = this._observers.filter(observer => observer !== func);
    }
  
    notify(data: any) {
      this._observers.forEach(observer => observer(data));
    }
  };
  
  interface iProgress {
    isScriptInjected: boolean;
    isSubtitleCapturing: boolean;
    isSubtitleCaptured: boolean;
    isTranscriptRestructured: boolean;
  };
  
  const progressBase: iProgress = {
    isScriptInjected: false,
    isSubtitleCapturing: false,
    isSubtitleCaptured: false,
    isTranscriptRestructured: false
  };
  
  // すごく一時的な処理だけど
  // obseervableのインスタンスをいったん作る
  const observable = new Observable();
  
  const handler: ProxyHandler<iProgress> = {
    set: function(target:iProgress, property: keyof iProgress, value: boolean, receiver: any) {
      // 変更をnotifyする
      observable.notify({prop: property, value: value});
      return Reflect.set(target, property, value, receiver);
    },
    get: function(target:iProgress, property: keyof iProgress, receiver: any) {
      // Reflect.getは参照を返す
      return Reflect.get(target, property, receiver);
    }
  }
  
  const proxyProgress = new Proxy(progressBase, handler);
  
  // NOTE:
  // proxy.getは参照を返している
  proxyProgress.isScriptInjected = true;
  const refProxyProgress = proxyProgress;
  console.log(refProxyProgress);
  refProxyProgress.isSubtitleCaptured = true;
  // isSubttileCaptured: trueだった
  console.log(proxyProgress);
  
  
  class State<TYPE extends object> {
    private _state: TYPE;
    private _proxy: TYPE;
    constructor(baseObject: TYPE, handler: ProxyHandler<TYPE>) {
      this._state = baseObject;
      this._proxy = new Proxy(this._state, handler);
    };
  
    setState(prop:{[Property in keyof TYPE]?: TYPE[Property]}): void {
      // いったんここでdeep copyをとるとして
      this._proxy = {
        this._proxy, ...prop
      }
    }
  
  }