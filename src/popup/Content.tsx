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


TODO:

props.built === trueを受け取った時に
COMPLETEを表示する機能の実装

問題はその仕様だと、毎回popupを開くたびに
COMPLETEを表示してしまうこと

監視する値はpreviousBuildingであるべきかも
props.built && previous.buildingならば
COMPLETEをアニメーション表示にする
という仕様にすればいいかも
*/

import * as React from 'react';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import SaveIcon from '@mui/icons-material/Save';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

/*********************************
 * @param props
 * correctUrl
 * built
 * building
 *
 *
 * */
export default function Content(props): JSX.Element {
    const [timer, setTimer] = React.useState<boolean>(false);
    const [built, setBuilt] = React.useState<boolean>(false);
    const _ref = React.useRef(null);
    const prev: boolean = usePrevious(props.built);

    /*****************************
     * 以前のpropsの状態を保持して返す関数
     *
     * 参考:
     * https://stackoverflow.com/questions/53446020/how-to-compare-oldvalues-and-newvalues-on-react-hooks-useeffect
     * https://blog.logrocket.com/accessing-previous-props-state-react-hooks/
     * */
    function usePrevious(value) {
        const ref = React.useRef();
        React.useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    React.useEffect(
        function () {
            const wasThisAlreadyBuild: boolean = prev;
            if (wasThisAlreadyBuild === undefined) return;
            if (props.built && !wasThisAlreadyBuild) {
                // TODO:
            }
        },
        [props.built]
    );

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
            // setTimer(true);
            // generated = (
            //     <Slide
            //         in={timer}
            //         direction="right"
            //         container={_ref.current}
            //         easing={'ease-out'}
            //         timeout={600}
            //     >
            //         {generateSuccess()}
            //     </Slide>
            // );
            // setTimeout(function () {
            //     setTimer(false);
            // }, 3000);
        } else if (props.building) {
            generated = generateLoadingButton();
        } else if (!props.building && !props.built) {
            generated = generateRunButton();
        }
        return generated;
    };

    const generateNotice = (): JSX.Element => {
        return (
            <Alert variant="outlined" severity="info" sx={{ width: '300px' }}>
                Extension is available on the Udemy lecture page
            </Alert>
        );
    };

    return (
        <Box
            sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}
            ref={_ref}
        >
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
