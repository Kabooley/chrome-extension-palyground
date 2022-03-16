/*********************************************************
 *
 *
 * ********************************************************/

/* DEVELOPMENT NOTE

props:

<MainContent  
    built={built} 
    building={building} 
    correctUrl={correctUrl} 
    turningOn={turningOn} 
    disable={disableSlider} 
    handlerOfToggle={handlerOfToggle} 
/>

built: 拡張機能が実行中ならばtrue
building: 拡張機能がRUNされて構築中ならばtrue
correctUrl: Popupが開かれたときのURLが許可URLなのかどうか


turningOn: スライダーがONならばtrue(存在意義がbuiltとかぶっている)
disableSlider: スライダーを無効にしたいとき。構築中とOFF処理中の時とか

handlerOfToggle: 実行ボタンが押されたときに発火する関数
*/

import * as React from "react";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SaveIcon from "@mui/icons-material/Save";
import Alert from "@mui/material/Alert";
import Content from "./Content";

export default function MainContent(props): JSX.Element {
  const theme = useTheme();

  return (
    <Card sx={{ display: "flex" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            Udemy Re Transcript
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Udemy transcript subtitles are reconstructed into easy-to-translate
            sentences by the translation app
          </Typography>
        </CardContent>
        <Content
          correctUrl={props.correctUrl}
          built={props.built}
          building={props.building}
          handlerOfToggle={props.handlerOfToggle}
        />
      </Box>
      <CardMedia
        component="img"
        // heightを指定しないと表示されないよとのこと
        sx={{ width: 180, height: 180 }}
        image="../static/udemy-re-transcript-512.svg"
        alt="Udemy Re Transcript icon"
      />
    </Card>
  );
}

/*
MainContent ...ネーミングセンスなさすぎ問題あとで変える

Container(aka.MainContent)
    Title
    Introduction
    Content
        Button(RUN/LOADING/COMPLETE!)
        Alerts


condition
    correctUrl ? CONTENT {LOADING | RUN | COMPLETE} : ALERT
    CONTENT
        building ? LOADING
        built ? COMPLETE
        !building && !built ? RUN


TODO:

    propsというかstateの値の節約：役割被っているからいらない値ある...
    コンポーネントの分割
    字大きすぎる小さくする
    併せて全体の幅狭くして

*/
