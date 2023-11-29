"use client";
import React from "react";
import "./dayCard.scss";
import Wrapper from "../Wrapper/Wrapper";
import Button from "../Button/Button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Training } from "@/utils/types";
import { removeTrainingAction } from "@/redux/features/trainingSlice";

const DayCard = (props: { dayName: string; trainings: Training[] }) => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const removeHandler = async (id: string) => {
    await dispatch(removeTrainingAction(id));
  };

  return (
    <Wrapper type='dayCard__wrapper'>
      <div className='dayCard'>
        <h4>{props.dayName}</h4>
        {props.trainings.map((training) => {
          return (
            <div className='training__info' key={training.id}>
              <span>{training.trainingName}</span>
              <span>{training.trainingTime}</span>
              {user.currentUser.role === "ADMIN" && (
                <Button
                  class='remove__button'
                  onClick={() => removeHandler(training.id)}
                >
                  -
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default DayCard;
