"use client";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { useAppDispatch } from "@/redux/hooks";
import React, { useEffect, useLayoutEffect } from "react";
import { redirect } from "next/navigation";
import { getUser } from "@/redux/features/userSlice";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      redirect("/login");
    } else {
      const getLoggedInUser = async () => {
        await dispatch(getUser());
      };
      try {
        getLoggedInUser();
      } catch (error) {
        console.error(error);
      }
    }
  }, [token]);
  return token ? (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  ) : (
    <>Loading...</>
  );
};

export default ProtectedLayout;
