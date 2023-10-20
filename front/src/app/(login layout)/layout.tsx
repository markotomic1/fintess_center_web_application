"use client";
import Wrapper from "@/components/UI/Wrapper/Wrapper";
import background from "../../../public/images/homeBackground.png";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      redirect("/dashboard");
    }
  }, [token]);
  return !token ? (
    <>
      <img
        className='background__full'
        src={background.src}
        alt='User Login background'
      />
      <div className='center'>
        <Wrapper>{children}</Wrapper>
      </div>
    </>
  ) : (
    <>Loading...</>
  );
}
