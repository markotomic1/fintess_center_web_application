import React from "react";
import Wrapper from "../UI/Wrapper/Wrapper";
import "./card.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Button from "../UI/Button/Button";
import CloseIcon from "@mui/icons-material/Close";
import { deletePlanAction } from "@/redux/features/planSlice";

const Card = (props: {
  id?: string;
  title: string;
  description?: string;
  key: string;
  type?: "price__card" | "plan__wrapper" | "about__card" | undefined;
  price?: string;
  items?: string[];
}) => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const deletePlanHandler = async () => {
    try {
      if (props.id) await dispatch(deletePlanAction(props.id));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Wrapper type={`${props.type}`}>
      <div
        className={`card ${props.type === "plan__wrapper" ? "card__list" : ""}`}
      >
        {user.role === "ADMIN" && props.type === "plan__wrapper" && (
          <Button class='plan__delete__button' onClick={deletePlanHandler}>
            <CloseIcon />
          </Button>
        )}
        <h2
          className={`card__title ${
            props.type === "plan__wrapper" ? "card__title__list" : ""
          }`}
        >
          {props.title}
        </h2>
        {props.price && (
          <>
            <h3
              className={`card__price ${
                props.type === "plan__wrapper" ? "card__price__list" : ""
              }`}
            >
              {props.price} $
            </h3>
            <hr className='line' />
          </>
        )}
        {props.type !== "price__card" && props.type !== "plan__wrapper" ? (
          <p className='card__description'>{props.description}</p>
        ) : (
          props.items?.map((item, i) => (
            <p
              className={`card__description ${
                props.type === "plan__wrapper" ? "card__description__list" : ""
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
