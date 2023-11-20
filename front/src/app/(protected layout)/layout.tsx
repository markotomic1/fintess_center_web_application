"use client";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { useAppDispatch } from "@/redux/hooks";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { getUser, logoutUser } from "@/redux/features/userSlice";
import { useRouter } from "next/navigation";
const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  useEffect(() => {
    const getLoggedInUser = async () => {
      try {
        await dispatch(getUser()).unwrap();
        setIsAuthenticated(true);
      } catch (error) {
        dispatch(logoutUser());
        console.error(error);
        router.push("/");
      }
    };
    getLoggedInUser();
  }, []);

  if (!isAuthenticated) return <>Loading...</>;
  return (
    <>
      <Navbar type='protected' />
      {children}
      <Footer />
    </>
  );
};

export default ProtectedLayout;
