/*************************************
 * Siwtch component
 * ___________________________________
 *
 * cf.
 * https://upmostly.com/tutorials/build-a-react-switch-toggle-component
 *
 *
 * @props
 * isOn: 拡張機能が実行中であればtrue
 * handlerOfToggle: ボタンが押されたときの挙動を制御する関数
 * disable: ボタンを無効にするならtrue
 * ***********************************/
import React from 'react';
import './Switch.css';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

const Switch = ({ isOn, handlerOfToggle, disable }): JSX.Element => {
    const labelClassName: string = isOn
        ? `react-switch-label slider-on`
        : 'react-switch-label';

    return (
        <Card className={}>
            <CardMedia className={} image={} />
            <CardContent>
                <TextInfoContent classes={} overline={} heading={} body={} />
                <Button className={}>REBUILD</Button>
            </CardContent>
        </Card>
    );
};

export default Switch;
