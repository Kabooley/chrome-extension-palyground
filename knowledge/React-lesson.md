# React 開発中に得た知見、教訓 まとめ

## 目次

[自動で閉じるアラートの実装方法](#自動で閉じるアラートの実装方法)

## 自動で閉じるアラートの実装方法

React Hooks
Material UI

#### あらすじ

React コンポーネントの state のある値が true になったらアラートが表示されて、

しばらくしたら自動でアラートが閉じる

そんな仕様のコンポーネントを実装しようとしたら

結構工夫を凝らす必要があったので

ここにその方法を記録する

#### 使うもの

React Hooks の`useEffect()`

Material UI (`@mui/material/Slide`) の`Slide`コンポーネント

#### 実装するもの

`Content.tsx`
`show`という boolean の state を持つ。
`show`は親コンポーネントからの props の更新で`true`になる
useEffect()で指定時間経過後、`show`は自動的に`false`になる
`show`は子コンポーネント`AlertMessage`へ渡す

`AlertMessage.tsx`

親コンポーネントから`props.built`が渡される
子コンポーネント`Content.tsx`は`props.built`が true だった時、5 秒間だけ自身の state`show`を true にする
`Content.tsx`は 5 秒したのち state`show`を必ず false に戻す
`AlertMessage`は`Content.tsx`から`props.show`を受け取り、これが`true`だったときに 3 秒間アニメーション要素を出力する
