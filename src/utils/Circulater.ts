export interface iCallbackOfCirculater {
  <T>(): Promise<T>;
}
export interface iConditionOfCirculater {
  <T>(operand: T): boolean;
}
export interface iClosureOfCirculater {
  <T>(): Promise<T>;
}

// HIGH ORDER FUNCTION
//
// 再利用性のある非同期関数の任意ループ処理ラッパー
export const circulater = function (
  callback: iCallbackOfCirculater,
  condition: iConditionOfCirculater,
  until: number
): iClosureOfCirculater {
  return async function <T>() {
    // 予めループの外にresult変数を置いて
    let result: T;
    for (let i = 0; i < until; i++) {
      result = await callback();
      if (condition(result)) return result;
    }
    // ループが終わってしまったら最後のresultを返せばいいのだが...
    // エラーを出すかも:
    // "TypeScriptがresultが初期化されないままなんだけど"
    //
    // 必ずresultはforループで初期化されるからってことを
    // TypeScriptへ伝えたいけど手段がわからん
    return result;
  };
};
