"use client";
import Wrapper from "@/components/UI/Wrapper/Wrapper";
import background from "../../../public/images/homeBackground.png";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import useStorageToken from "@/hooks/useStorage";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = useStorageToken();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    if (token) {
      return redirect("/dashboard");
    }
    setLoading(false);
  }, [token]);
  return !loading ? (
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
