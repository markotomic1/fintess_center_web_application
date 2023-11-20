import { plans } from "@/utils/rawData";
import React from "react";
import Card from "../Card/Card";
import "./planList.scss";

const PlanList = () => {
  return (
    <div className='planList'>
      {plans.map((plan) => (
        <Card
          key={plan.id}
          title={plan.name}
          items={plan.desc}
          type='plan__list'
          price={plan.price}
        />
      ))}
    </div>
  );
};

export default PlanList;
