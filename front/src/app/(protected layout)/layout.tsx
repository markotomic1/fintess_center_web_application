"use client";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/redux/features/userSlice";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.user);
  useEffect(() => {
    const getLoggedInUser = async () => {
      await dispatch(getUser());
    };
    try {
      getLoggedInUser();
    } catch (error) {
      console.error(error);
    }
  }, []);
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default ProtectedLayout;
