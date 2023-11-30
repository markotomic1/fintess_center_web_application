import React, { useEffect } from "react";
import "./payment.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import Button from "../Button/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { axiosInstance } from "@/utils/axiosInstance";
const Payment = () => {
  const plan = useAppSelector((state) => state.plan);
  const router = useRouter();
  useEffect(() => {
    if (plan.choosenPlan.planName === "") {
      router.push("/dashboard");
    }
  }, [plan.choosenPlan.planName, router]);

  const handleCheckout = async () => {
    try {
      const response = await axiosInstance.post(
        "/payment",
        {
          plan: {
            id: plan.choosenPlan.id,
            planName: plan.choosenPlan.planName,
            desc: plan.choosenPlan.planDescription,
            planPrice: plan.choosenPlan.planPrice,
          },
        },
        { withCredentials: true }
      );
      router.push(response.data);
    } catch (error: any) {
      toast.error(error);
      console.error(error);
    }
  };
  return (
    <div className='payment'>
      <ToastContainer />
      <div className='payment__plan__info'>
        <div className='payment__item'>
          <span>Plan: </span>
          <span>{plan.choosenPlan.planName}</span>
        </div>
        <hr />
        <div className='payment__item'>
          <span>Plan Info: </span>
          <span>{plan.choosenPlan.planDescription.join("")}</span>
        </div>
        <hr />
        <div className='payment__item'>
          <span>Start Date Of Plan:</span>
          <span>{new Date().toLocaleDateString()}</span>
        </div>
        <hr />
        <div className='payment__item'>
          <span>End Date Of Plan:</span>
          <span>
            {new Date(
              new Date().getTime() + 30 * 24 * 60 * 60 * 1000
            ).toLocaleDateString()}
          </span>
        </div>
        <hr />
        <div className='payment__price'>
          <h2>Price:</h2>
          <h2>{plan.choosenPlan.planPrice}$</h2>
        </div>
      </div>
      <div className='payment__card__container'>
        <div className='pyment__card__details'></div>
        <Button class='submit__button' onClick={handleCheckout}>
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default Payment;
