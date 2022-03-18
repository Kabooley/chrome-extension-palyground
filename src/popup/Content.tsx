/*********************************************************
 * Content 
 * 
 * 
 * 仕様：
 * alertがtrueだとAlertMessageコンポーネントを表示する
 * alertは一旦trueになると指定時間(TIMERS.alertLifeTimer)後自動的にfalseに戻る
 * alertはpros.built && previousBuildingの時にtrueになる 
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
import AlertMessage from './AlertMessage';

// NOTE: alertTimer > slideTimer (+ slide timeout time)
const TIMERS = {
    alertLifeTimer: 5000,
    slideTimer: 3000,
} as const;

/*********************************
 * @param props
 * props: {
 *  built: 拡張機能が実行中ならばtrue
 *  building: 拡張機能がRUNされて構築中ならばtrue
 *  correctUrl: Popupが開かれたときのURLが許可URLなのかどうか
 *  handlerOfToggle: 実行ボタンが押されたときに発火する関数 
 * }
 *
 * */
export default function Content(props): JSX.Element {
    // True as displaying Alert
    const [alert, setAlert] = React.useState<boolean>(false);
    const _ref = React.useRef(null);
    // Save previous props.building value
    const previousBuilding: boolean = usePrevious(props.building);

    // もしもREBUILDINGが終わった瞬間ならばアラートをかける
    React.useEffect(function () {
        if (props.built && previousBuilding) {
            setAlert(true);
        }
    });

    // alertがtrueなら指定時間後にfalseに戻す
    React.useEffect(
        function () {
            let timer = null;
            if (alert) {
                timer = setTimeout(function () {
                    setAlert(false);
                }, TIMERS.alertLifeTimer);
                return () => {
                    clearTimeout(timer);
                };
            }
        },
        [alert]
    );

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

    const generateSuccess = (): JSX.Element => {
        return (
            <AlertMessage
                timer={TIMERS.slideTimer}
                _ref={_ref}
                show={props.built}
            >
                <Alert
                    sx={{ width: '80%' }}
                    variant="filled"
                    severity="success"
                >
                    COMPLETE!
                </Alert>
            </AlertMessage>
        );
    };

    const generateRunning = (): JSX.Element => {
        return (
            <Button
                sx={{ backgroundColor: 'purple', width: '80%' }}
                variant="contained"
                onClick={props.handlerOfToggle}
                disabled={true}
            >
                Running...
            </Button>
        );
    };

    const content = (): JSX.Element => {
        let generated: JSX.Element = null;
        if (props.built) {
            generated = generateRunning();
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
            {alert ? generateSuccess() : null}
            {props.correctUrl ? content() : generateNotice()}
        </Box>
    );
}
