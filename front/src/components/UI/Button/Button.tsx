import React from "react";
import "./button.scss";
const Button = (props: {
  children: string | React.ReactElement;
  onClick?: () => void;
  class?: string;
  type?: "button" | "submit";
  disable?: boolean;
}) => {
  return (
    <button
      onClick={props.onClick}
      className={`button ${props.class ? props.class : ""}`}
      type={`${props.type === "submit" ? "submit" : "button"}`}
      disabled={props.disable}
    >
      {props.children}
    </button>
  );
};

export default Button;
