"use client";
import Footer from "@/components/Footer/Footer";
import Home from "@/components/Home/Home";
import Navbar from "@/components/Navbar/Navbar";
import { getUser } from "@/redux/features/userSlice";
import { useAppDispatch } from "@/redux/hooks";
import React, { useEffect } from "react";

export default function Page() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const getLoggedInUser = async () => {
      try {
        await dispatch(getUser()).unwrap();
      } catch (error) {
        console.error(error);
      }
    };
    getLoggedInUser();
  }, []);
  return (
    <>
      <Navbar />
      <Home />
      <Footer />
    </>
  );
}
