"use client";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { useAppDispatch } from "@/redux/hooks";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { redirect } from "next/navigation";
import { getUser } from "@/redux/features/userSlice";
import useStorageToken from "@/hooks/useStorage";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const token = useStorageToken();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoading(true);
    if (!token) {
      return redirect("/login");
    } else {
      const getLoggedInUser = async () => {
        await dispatch(getUser());
      };
      try {
        getLoggedInUser();
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
  }, [token]);
  return !loading ? (
    <>
      <Navbar type='protected' />
      {children}
      <Footer />
    </>
  ) : (
    <>Loading...</>
  );
};

export default ProtectedLayout;
