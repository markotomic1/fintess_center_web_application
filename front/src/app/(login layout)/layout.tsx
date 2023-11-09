"use client";
import Wrapper from "@/components/UI/Wrapper/Wrapper";
import background from "../../../public/images/homeBackground.png";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAppSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (user.isLoggedIn) {
      router.push("/dashboard");
    }
  }, []);
  return !user.isLoggedIn ? (
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
