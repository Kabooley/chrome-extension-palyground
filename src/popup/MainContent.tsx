/*********************************************************
 *
 *
 * ********************************************************/

/* DEVELOPMENT NOTEE

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

import * as React from 'react';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SaveIcon from '@mui/icons-material/Save';
// import './Card.css';

export default function MainContent(props): JSX.Element {
    const theme = useTheme();

    const generateRunButton = (): JSX.Element => {
        return (
            <Button
                className="Button"
                sx={{ backgroundColor: 'purple' }}
                variant="contained"
                onClick={props.handlerOfToggle}
                disabled={props.disable}
            >
                REBUILD
            </Button>
        );
    };

    const generatorLoadingButton = (): JSX.Element => {
        return (
            <LoadingButton
                className="Button"
                loading={props.building}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="outlined"
                disabled={props.disable}
            >
                Rebuilding...
            </LoadingButton>
        );
    };

    const generateNotice = (): JSX.Element => {
        return (
            <Typography component="div" variant="text.subtitle2">
                This Extension is available on the Udemy lecture page
            </Typography>
        );
    };

    return (
        <Card sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        Udemy Re Transcript
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                    >
                        Udemy transcript subtitles are reconstructed into
                        easy-to-translate sentences by the translation app
                    </Typography>
                </CardContent>
                <Box
                    sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}
                >
                    {props.correctUrl
                        ? props.building
                            ? generatorLoadingButton()
                            : generateRunButton()
                        : generateNotice()}
                </Box>
            </Box>
            <CardMedia
                component="img"
                // heightを指定しないと表示されないよとのこと
                sx={{ width: 200, height: 200 }}
                image="../static/udemy-re-transcript-512.svg"
                alt=""
            />
        </Card>
    );
}
