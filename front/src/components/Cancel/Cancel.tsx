"use client";
import React, { useEffect } from "react";
import "./cancel.scss";
import { useRouter } from "next/navigation";
const Cancel = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/");
  }, []);
  return (
    <div className='cancel'>
      <h1 className='cancel__title'> Payment not successful!</h1>
    </div>
  );
};

export default Cancel;
