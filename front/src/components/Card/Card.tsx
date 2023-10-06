import React from "react";
import Wrapper from "../UI/Wrapper/Wrapper";
import "./card.scss";

const Card = (props: { title: string; description: string; key: string }) => {
  return (
    <Wrapper>
      <div className='card'>
        <h3 className='card__title'>{props.title}</h3>
        <p className='card__desc'>{props.description}</p>
      </div>
    </Wrapper>
  );
};

export default Card;
