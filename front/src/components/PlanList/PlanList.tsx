import { plans } from "@/utils/rawData";
import React, { useEffect } from "react";
import Card from "../Card/Card";
import "./planList.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getPlansAction } from "@/redux/features/planSlice";

const PlanList = () => {
  const dispatch = useAppDispatch();
  const plan = useAppSelector((state) => state.plan);
  useEffect(() => {
    (async () => {
      try {
        await dispatch(getPlansAction()).unwrap();
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  return (
    <div className='planList'>
      {plan.plans.map((plan) => {
        return (
          <Card
            id={plan.id!}
            key={plan.id!}
            title={plan.planName}
            items={plan.planDescription}
            type='plan__wrapper'
            price={plan.planPrice}
          />
        );
      })}
    </div>
  );
};

export default PlanList;
