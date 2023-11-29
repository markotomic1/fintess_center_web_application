import React, { ReactNode } from "react";
import "./wrapper.scss";
const Wrapper = (props: { children: ReactNode; type?: string }) => {
  return (
    <div className={`wrapper ${props.type ? props.type : ""}`}>
      {props.children}
    </div>
  );
};

export default Wrapper;
