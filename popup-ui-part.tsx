import * as React from "react";
import { useState } from "react";
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
import "./Card.css";

export default function MediaControlCard() {
  const [loading, setLoading] = useState<boolean>(false);
  const theme = useTheme();

  const handlerOnClick = (): void => {
    setLoading(true);
    setTimeout(function () {
      setLoading(false);
    }, 3000);
  };

  const generatorLoadingButton = (): JSX.Element => {
    return (
      <LoadingButton
        className="Button"
        loading={loading}
        loadingPosition="start"
        startIcon={<SaveIcon />}
        variant="outlined"
        disabled={loading}
      >
        Rebuilding...
      </LoadingButton>
    );
  };

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
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          {loading ? (
            generatorLoadingButton()
          ) : (
            <Button
              className="Button"
              sx={{ backgroundColor: "purple" }}
              variant="contained"
              //   color="primary"
              onClick={handlerOnClick}
            >
              REBUILD
            </Button>
          )}
        </Box>
      </Box>
      <CardMedia
        component="img"
        // heightを指定しないと表示されないよとのこと
        sx={{ width: 200, height: 200 }}
        image="/synthwave-ish.jpg"
        alt=""
      />
    </Card>
  );
}

/*********
 * 課題
 *
 * ButtonとLoadingButtonの長さを同じにしたい
 * 色の指定
 * 自作のクソダサsvgを表示しても問題ないか？
 * TypoGraphy text.secondary 紹介文章を推敲
 *
 *
 * 参考：
 *
 * https://mui.com/components/cards/
 * https://mui.com/components/buttons/#loading-button
 * */

/*
CSS
.Button {
    width: 180px;
}

.Button:hover {
    background-color: violet;
}

.Button:disabled {
    color: white;
  background-color: blueviolet;
}




*/
