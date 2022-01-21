# Note

## command patternを当てはめるにあたって


```TypeScript
// Commandのインスタンスをthis.ordersに格納する
class CommandManager {
  constructor() {
    this.commands = [];
}

// 実際に処理する関数をexecuteに格納する
class Command {
  constructor(execute) {
    this.execute = execute;
  }
}


const _contentScriptMessageHandler = async (
    m: iMessage | iResponse
): Promise<void> => {

    const { from, to, order, ...rest } = m;
    if(to !== extensioNames.background) return;

    try {

        // IDEAL FUNCTION: 中身は未定
        // とにかくorder, restを渡したらそれぞれに必要な処理を行ったpromiseの配列を返す
        const result: Promise<any>[] = synchronizer(order, rest);
        await Promise.all(result);
        // resultに「返事」となる変数が含まれていたら、
        // これもsendResponse()に含めないといけない...
        // そこも考えていない...
        sendResponse({complete: true})
    } 
    catch (e) {
        console.error(e.message);
    }
};


// @param rest: iMessageのfrom, to抜きのインターフェイスが型になる
// なのでiResponseとおなじ...
// ひとまずでiResponseを型としておく
// 
// 何も考えずに実装すればこんな感じ
const synchronizer = (order: orderTypes, rest: iResponse): Promise<any>[] => {
    const result: Promise<any>[] = [];
    order.forEach(o => {
        if(o === orderNames.sendStatus) {
            result.push(sendStatus());
        }
        if(o === orderNames.sendSubtitles){
            result.push(sendSubtitles());
        }
        // ...
    });
    if(rest.language) {
        result.push(setLanguageEnglish());
    }
    // ...
    return result;
}


// 
// 外部化された処理
// 一例
// 
// If language: true
const setLanguageEnglish = async(): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        console.log("It's English");
        try {
            const refStatus: State<iStatus> = stateList.caller<iStatus>(nameOfStte.status);
            const { pageStatus} =
                await refStatus.getState();
            const newStatus: state_page_status = { isEnglish: true };

            await refStatus.setState({
                pageStatus: {
                    ...pageStatus,
                    ...newStatus,
                },
            });
            resolve();
        }
        catch(err) {
            console.error(err.message);
            reject();
        };
    })
}

const sendStatus = async(): Promise<> => {
    // ....
}
```