import React from "react";
import "./price.scss";
import headerImage from "../../../public/images/priceImage.png";
import { plans } from "@/utils/rawData";
import Card from "../Card/Card";
const Price = () => {
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
        {plans.map((plan) => (
          <Card
            key={plan.id}
            title={plan.name}
            items={plan.desc}
            type='plan'
            price={plan.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Price;
