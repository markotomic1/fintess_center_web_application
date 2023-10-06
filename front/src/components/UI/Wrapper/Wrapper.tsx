import React from "react";
import "./wrapper.scss";
const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className='wrapper'>{children}</div>;
};

export default Wrapper;
