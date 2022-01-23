# Note about Observer Pattern

https://www.patterns.dev/posts/observer-pattern/

> オブザーバーパターンを使用すると、特定のオブジェクトであるオブザーバーを、オブザーバブルと呼ばれる別のオブジェクトにサブスクライブできます。イベントが発生するたびに、observable はすべてのオブザーバーに通知します！

## 登場人物

-   `observer`: 変更を知りたい人（オブジェクト）

-   `observable`: 変更を通知する人

## sample

```JavaScript
class Observable {
  constructor() {
    this.observers = [];
  }

  subscribe(func) {
    this.observers.push(func);
  }

  unsubscribe(func) {
    this.observers = this.observers.filter(observer => observer !== func);
  }
    // すべてのobserverへ、observer.observer(data)を実行する
  notify(data) {
    this.observers.forEach(observer => observer(data));
  }
}
```

observer からしてみれば通知があるときに、自身の observer()メソッドが実行されることになる

```JavaScript
export default function App() {
  return (
    <div className="App">
      <Button>Click me!</Button>
      <FormControlLabel control={<Switch />} />
    </div>
  );
}
```

button または switch が押されたら
logger と toastify というオブジェクトに通知されるようにする
この通知によって、button または switch のイベントに関するデータが
各オブジェクトに送信される

```JavaScript
import { ToastContainer, toast } from "react-toastify";

// observer その一
function logger(data) {
  console.log(`${Date.now()} ${data}`);
}
// observer その二
function toastify(data) {
  toast(data);
}

export default function App() {
  return (
    <div className="App">
      <Button>Click me!</Button>
      <FormControlLabel control={<Switch />} />
      <ToastContainer />
    </div>
  );
}
```

```JavaScript
observable.subscribe(logger);
observable.subscribe(toastify);

```
