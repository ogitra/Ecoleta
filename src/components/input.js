import React from 'react';

const Input = (props) => {
  return (
    <>
      <label>{props.label}</label>
      <input
        className={props.className}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        onClick={props.onClicked}
        id={props.id}
      ></input>
    </>
  );
};

export default Input;
