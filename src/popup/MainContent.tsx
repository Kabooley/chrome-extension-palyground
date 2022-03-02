/*********************************************************
 *
 *
 * ********************************************************/

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './popup.css';
import Switch from './switch';

const MainContent = (props): JSX.Element => {
    const generateFooter = (): JSX.Element => {
        return (
            <div className="footer">
                <Switch
                    isOn={props.turningOn}
                    handlerOfToggle={props.handlerOfToggle}
                    disable={props.disableSlider}
                />
            </div>
        );
    };

    const generateIncorrect = (): JSX.Element => {
        return <div>This is INCORRECT page</div>;
    };

    const generateRunning = (): JSX.Element => {
        return props.building ? (
            <div className="message-middle"> 生成中... </div>
        ) : null;
    };

    //   5秒だけ表示するようにする
    const generateComplete = (): JSX.Element => {
        return props.built ? (
            <div className="message-middle"> 完了！</div>
        ) : null;
    };

    return (
        <>
            {props.correctUrl ? (
                <>
                    <div className="middle-message-container">
                        {generateRunning()}
                        {generateComplete()}
                    </div>
                    {generateFooter()}
                </>
            ) : (
                <>{generateIncorrect()}</>
            )}
        </>
    );
};

export default MainContent;
