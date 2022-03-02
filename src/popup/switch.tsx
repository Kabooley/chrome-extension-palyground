/*************************************
 * Siwtch component
 * ___________________________________
 * 
 * cf. 
 * https://upmostly.com/tutorials/build-a-react-switch-toggle-component
 * 
 * 
 * ***********************************/ 
 import React from 'react';
 import './Switch.css';
 

 const Switch = ({ isOn, handlerOfToggle, disable }): JSX.Element => {
  const labelClassName: string = isOn
    ? `react-switch-label slider-on`
    : "react-switch-label";

  return (
    <>
      <input
        checked={isOn}
        onChange={handlerOfToggle}
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
        disabled={disable}
      />
      <label className={labelClassName} htmlFor={`react-switch-new`}>
        <span className={`react-switch-button`} />
      </label>
    </>
  );
};

 export default Switch;