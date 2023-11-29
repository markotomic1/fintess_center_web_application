"use client";
import background from "../../../public/images/homeBackground.png";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAppSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (user.currentUser.isLoggedIn) {
      router.push("/dashboard");
    }
  }, [user.currentUser.isLoggedIn, router]);
  return !user.currentUser.isLoggedIn ? (
    <>
      <Image
        fill
        sizes='100vw'
        className='background__full'
        src={background.src}
        alt='User Login background'
      />
      <div className='center'>{children}</div>
    </>
  ) : (
    <>Loading...</>
  );
}
