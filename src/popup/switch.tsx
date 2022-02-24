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
 
 const Switch = ({isOn, handlerOfToggle}): JSX.Element => {
   return (
     <>
       <input
               checked={isOn}
        onChange={handlerOfToggle}
         className="react-switch-checkbox"
         id={`react-switch-new`}
         type="checkbox"
       />
       <label
         className="react-switch-label"
         htmlFor={`react-switch-new`}
       >
         <span className={`react-switch-button`} />
       </label>
     </>
   );
 };
 
 export default Switch;