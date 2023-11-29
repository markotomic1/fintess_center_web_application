"use client";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { getUser } from "@/redux/features/userSlice";
import { useAppDispatch } from "@/redux/hooks";
import { axiosInstance } from "@/utils/axiosInstance";
import React, { useEffect } from "react";

const OtherLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const getLoggedInUser = async () => {
      try {
        // await dispatch(getUser()).unwrap();
      } catch (error) {
        console.error(error);
      }
    };
    getLoggedInUser();
  }, [dispatch]);
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default OtherLayout;
