import React from "react";
import "./button.scss";
const Button = (props: {
  children: string | React.ReactElement;
  onClick?: () => void;
  class?: string;
}) => {
  return (
    <button
      onClick={props.onClick}
      className={`button ${props.class ? props.class : ""}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
