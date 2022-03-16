/*********************************************************
 *
 *
 * ********************************************************/

/* DEVELOPMENT NOTE

props:

built: 拡張機能が実行中ならばtrue
building: 拡張機能がRUNされて構築中ならばtrue
correctUrl: Popupが開かれたときのURLが許可URLなのかどうか
handlerOfToggle: 実行ボタンが押されたときに発火する関数
*/

import * as React from 'react';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import SaveIcon from '@mui/icons-material/Save';
import Alert from '@mui/material/Alert';

/*********************************
 * @param props
 * correctUrl
 * built
 * building
 *
 *
 * */
export default function Content(props): JSX.Element {
    const generateRunButton = (): JSX.Element => {
        return (
            <Button
                sx={{ backgroundColor: 'purple', width: '80%' }}
                variant="contained"
                onClick={props.handlerOfToggle}
            >
                REBUILD
            </Button>
        );
    };

    const generateLoadingButton = (): JSX.Element => {
        return (
            <LoadingButton
                sx={{ width: '80%' }}
                loading={props.building}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="outlined"
                disabled={true}
            >
                REBUILDING...
            </LoadingButton>
        );
    };

    //   "COMPLETE!"は短い間だけ表示して、あとは"展開中"みたいな表示にしたい
    const generateSuccess = (): JSX.Element => {
        return (
            <Alert sx={{ width: '80%' }} variant="filled" severity="success">
                COMPLETE!
            </Alert>
        );
    };

    const content = (): JSX.Element => {
        let generated: JSX.Element = null;
        if (props.built) {
            generated = generateSuccess();
        } else if (props.building) {
            generated = generateLoadingButton();
        } else if (!props.building && !props.built) {
            generated = generateRunButton();
        }
        return generated;
    };

    const generateNotice = (): JSX.Element => {
        return (
            <Alert variant="outlined" severity="info">
                Extension is available on the Udemy lecture page
            </Alert>
        );
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            {props.correctUrl ? content() : generateNotice()}
        </Box>
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

    OFFボタンを実装していない
    ともなって完了の表示と展開中であること示すviewとOFFボタンをどうやって両立させるか...

    完了、

*/
