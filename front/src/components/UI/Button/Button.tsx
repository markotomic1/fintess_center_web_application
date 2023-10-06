import React from "react";
import "./button.scss";
const Button = (props: {
  children: string | React.ReactElement;
  onClick?: () => void;
  class?: string;
  type?: "button" | "submit";
}) => {
  return (
    <button
      onClick={props.onClick}
      className={`button ${props.class ? props.class : ""}`}
      type={`${props.type === "submit" ? "submit" : "button"}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
