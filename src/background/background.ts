/*******************************************************************
 * background.ts
 * ________________________________________________________________
 *
 * As service worker and Application Layer.
 *
 * *****************************************************************/
/**
 * 検証：
 * グローバルモジュールのmodelは、service workerがアンロードされたあとでも
 * 自身のinstanceを保持しているのか？
 *
 * 結果：
 * ぜんぜんアンロードされない
 * 10分くらい放っておいても問題ない...
 *
 * ということで雑だけれどservice workerでもわりとアンロードされないから
 * グローバル・モジュールに値を保持させるのはアリとする
 *
 * */

import {
  extensionStatus,
  orderNames,
  extensionsTypes,
  extensionNames,
  iMessage,
  subtitle_piece,
  port_names,
  iResponse,
} from "../utils/constants";
import { sendMessageToTabsPromise, deepCopier } from "../utils/helpers";
import { State } from "../utils/State";
import { LocalStorage } from "../utils/LocalStorage";
import {
  iProgress,
  iPageStatus,
  iTabId,
  iContentUrl,
  iSubtitle,
  iStateList,
} from "./annotations";

chrome.runtime.onInstalled.addListener(
  (details: chrome.runtime.InstalledDetails): void => {
    console.log(`[background] onInstalled: ${details.reason}`);
    const m: Model<iModel> = new Model<iModel>(
      "__key__local_storage_",
      modelBase
    );
    console.log(m);
    model.register(m);
  }
);

chrome.runtime.onMessage.addListener(
  (
    message: iMessage,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: iResponse) => void
  ) => {
    if (message.to !== extensionNames.background) return;

    const { order, ...rest } = message;
    if (order && order.length) {
      if (order.includes(orderNames.run)) {
        console.log("[background] got run order:");
        const m: Model<iModel> = model._();
        m.load().then((res) => console.log(res));
      }
    }
  }
);

interface iModel
  extends iProgress,
    iPageStatus,
    iContentUrl,
    iTabId,
    iSubtitle {}

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
  subtitles: null,
} as const;

class Model<T extends object> {
  private _storage_key: string;
  private _local_storage: LocalStorage<T>;
  constructor(key: string, base: T) {
    this._storage_key = key;
    this._local_storage = new LocalStorage(this._storage_key);
    this._local_storage.save(base);
  }

  async update(prop: { [Property in keyof T]?: T[Property] }): Promise<void> {
    // いちいち毎度すべていったん取得してから、引数に一致するプロパティだけ変更して
    // 変更したすべてを保存する
    // なのでひと手間ある
    let current: T = await this._local_storage.load();
    current = { ...current, ...prop };
    await this._local_storage.save(current);
  }

  async load(): Promise<T> {
    const current: T = await this._local_storage.load();
    return deepCopier(current);
  }

  async clearAll(): Promise<void> {
    await this._local_storage.clearAll();
  }
}

const model = (function () {
  let instance: Model<iModel> = null;

  return {
    register: (m: Model<iModel>): void => {
      instance = m;
    },
    unregister: (): void => {
      instance = null;
    },
    _: (): Model<iModel> => {
      return instance;
    },
  };
})();

/*
    stateList module
    ______________________________________________

    Stateのインスタンスを保存しておく場所
    インスタンスをどこからでも呼出せるようにするためと、
    インスタンスをグローバル変数にしたくないからこんな面倒をしている

    検証：service workerがアンロードされても_listの中身は消えないのか?
*/
const stateList: iStateList = (function () {
  console.log("stateList module invoked");
  // Instances stored in this list.
  const _list = {};

  return {
    register: <TYPE extends object>(
      name: string,
      instance: State<TYPE>
    ): void => {
      _list[name] = instance;
    },
    unregister: (name: string): void => {
      // これでinstanceもさくじょしていることになるかしら
      delete _list[name];
    },
    // nameで指定するんじゃなくて、
    // 型引数で指定できるようにしたいなぁ
    caller: <TYPE extends object>(name: string): State<TYPE> => {
      return _list[name];
    },
    showList: (): void => {
      console.log("stateList::_list:");
      console.log(_list);
    },
    length: (): number => {
      return Object.keys(_list).length;
    },
  };
})();
