# Note: Material UI


## アニメーション

https://mui.com/components/dialogs/

https://mui.com/components/transitions/


#### 表示中のCardの下にスライドして表示されるAlert機能実装

https://mui.com/components/transitions/#slide

slide APIを使うといいかも

実装したいもの: Notification

1. 表示中のCardのbottomから下方向へスライドしてAlertを表示させる
2. 5秒ほど表示したら逆方向にスライドして消える
3. Alertの表示が消えたらCard内のどこかに「展開中」または「エラー」の表示をさせたい

```TypeScript
<Slide direction="down" in={checked} mountOnEnter unmountOnExit>
            <Alert variant="outlined" severity="info">
                Extension is available on the Udemy lecture page
            </Alert>
  </Slide>
```

in: trueにするとアニメーション実行


ｱﾆﾒｰｼｮﾝについて復習


