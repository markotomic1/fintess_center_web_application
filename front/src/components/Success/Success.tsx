"use client";
import { getUser, purchasePlan } from "@/redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "./success.scss";
import { axiosInstance } from "@/utils/axiosInstance";
const Success = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    const request = async () => {
      try {
        const startDate = new Date().toISOString();
        const endDate = new Date(
          new Date().getTime() + 30 * 24 * 60 * 60 * 1000
        ).toISOString();

        const response = await axiosInstance.post(
          "/payment/verifySession",
          { session_id },
          { withCredentials: true }
        );
        await dispatch(
          purchasePlan({ id: response.data, startDate, endDate })
        ).unwrap();

        router.push("/dashboard");
      } catch (error) {
        router.push("/cancel");
        console.error(error);
      }
    };
    const session_id = searchParams.get("session_id");
    if (session_id) {
      request();
    } else {
      router.push("/cancel");
    }
  }, []);
  return (
    <div className='success'>
      <h1 className='success__title'> Successfuly purchased plan!</h1>
    </div>
  );
};

export default Success;
