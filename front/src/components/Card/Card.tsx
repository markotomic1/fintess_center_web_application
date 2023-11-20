import React from "react";
import Wrapper from "../UI/Wrapper/Wrapper";
import "./card.scss";

const Card = (props: {
  title: string;
  description?: string;
  key: string;
  type?: "plan" | "plan__list" | undefined;
  price?: string;
  items?: string[];
}) => {
  return (
    <Wrapper type='plan__wrapper'>
      <div
        className={`card ${props.type === "plan__list" ? "card__list" : ""}`}
      >
        <h2
          className={`card__title ${
            props.type === "plan__list" ? "card__title__list" : ""
          }`}
        >
          {props.title}
        </h2>
        {props.price && (
          <>
            <h3
              className={`card__price ${
                props.type === "plan__list" ? "card__price__list" : ""
              }`}
            >
              {props.price} $
            </h3>
            <hr className='line' />
          </>
        )}
        {props.type !== "plan" && props.type !== "plan__list" ? (
          <p className='card__description'>{props.description}</p>
        ) : (
          props.items?.map((item, i) => (
            <p
              className={`card__description ${
                props.type === "plan__list" ? "card__description__list" : ""
              }`}
              key={i}
            >
              {item}
            </p>
          ))
        )}
      </div>
    </Wrapper>
  );
};

export default Card;
