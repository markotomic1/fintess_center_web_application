import React from "react";
import Wrapper from "../UI/Wrapper/Wrapper";
import "./card.scss";

const Card = (props: {
  title: string;
  description?: string;
  key: string;
  type?: "plan" | undefined;
  price?: string;
  items?: string[];
}) => {
  return (
    <Wrapper type='wrapper__white'>
      <div className='card'>
        <h2 className='card__title'>{props.title}</h2>
        {props.price && (
          <>
            <h3 className='card__price'>{props.price} $</h3>
            <hr className='line' />
          </>
        )}
        {props.type !== "plan" ? (
          <p className='card__description'>{props.description}</p>
        ) : (
          props.items?.map((item, i) => (
            <p className='card__description' key={i}>
              {item}
            </p>
          ))
        )}
      </div>
    </Wrapper>
  );
};

export default Card;
