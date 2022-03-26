// NOTE: iCallbackOfCirculater<T>とiConditionOfCirculater<T, K>
// のGenericsのT型は共通であること
export interface iCallbackOfCirculater<T> {
  (): Promise<T>;
}
// GenericsK型にしているけど必ずboolean型にすること
export interface iConditionOfCirculater<T> {
  (operand: T): boolean;
}
export interface iClosureOfCirculater<T> {
  (): Promise<T>;
}

// HIGH ORDER FUNCTION
//
// 再利用性のある非同期関数の任意ループ処理ラッパー
export const circulater = function <T>(
  callback: iCallbackOfCirculater<T>,
  condition: iConditionOfCirculater<T>,
  until: number
): iClosureOfCirculater<T> {
  return async function () {
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

// USAGE

// // 実際に実行したい関数
// const counter = async (times: number): Promise<boolean> => {
//   return new Promise((resolve, reject) => {
//     let timerId: number;
//     let num: number = 0;
//     timerId = setInterval(function () {
//       console.log(`counter: ${num}`);
//       if (num >= times) {
//         clearInterval(timerId);
//         const random_boolean = Math.random() < 0.7;
//         resolve(random_boolean ? true : false);
//       } else num++;
//     }, 1000);
//   });
// };

// // circulaterへ渡すcallback関数
// //
// // 完全にハードコーディング
// //
// // 実際に実行したい関数へ渡さなくてはならない引数はここで渡すこと
// // 戻り値は任意であるが、condition関数のgenerics型と同じにすること
// const cb: iCallbackOfCirculater<boolean> = async (): Promise<boolean> => {
//   const n: boolean = await counter(7);
//   console.log(`cb: ${n}`);
//   return n;
// };

// // circulaterへ渡すconditon関数
// //
// // 完全にハードコーディング
// //
// // circulaterへ渡す引数callbackの戻り値の型と同じ型をgenericsとして渡すこと
// const counterCondition: iConditionOfCirculater<iOp> = (
//   operand: iOp
// ): boolean => {
//   console.log(`condition: ${operand ? true : false}`);
//   return operand ? true : false;
// };

// const counterLoop = circulater<boolean>(cb, counterCondition, 3);

// (async function () {
//   const r = await counterLoop();
//   console.log(`RESULT: ${r}`);
// })();

