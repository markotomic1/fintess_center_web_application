"use client";
import React, { useEffect } from "react";
import "./price.scss";
import headerImage from "../../../public/images/priceImage.png";
import Card from "../Card/Card";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getPlansAction } from "@/redux/features/planSlice";
const Price = () => {
  const plan = useAppSelector((state) => state.plan);
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      try {
        await dispatch(getPlansAction()).unwrap();
      } catch (error) {
        console.error(error);
      }
    })();
  }, [dispatch]);
  return (
    <div className='price'>
      <div className='header__container'>
        <img
          src={headerImage.src}
          alt='Price image background'
          className='header__img'
        />
        <h2 className='header__title'>Pricing</h2>
      </div>

      <div className='price__cards'>
        {plan.plans.map((plan) => (
          <Card
            key={plan.id!}
            title={plan.planName}
            items={plan.planDescription}
            type='price__card'
            price={plan.planPrice}
          />
        ))}
      </div>
    </div>
  );
};

export default Price;
