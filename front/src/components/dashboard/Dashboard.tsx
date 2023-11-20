"use client";
import React, { useEffect } from "react";
import "./dashboard.scss";
import Wrapper from "../UI/Wrapper/Wrapper";
import { daysInWeek } from "@/utils/rawData";
import DayCard from "../DayCard/DayCard";
import Modal from "../Modal/Modal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getTrainings } from "@/redux/features/trainingSlice";
import Button from "../UI/Button/Button";
import { openModal } from "@/redux/features/modalSlice";
import News from "../News/News";
const Dashboard = () => {
  const modal = useAppSelector((state) => state.modal);
  const traning = useAppSelector((state) => state.training);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(getTrainings());
    })();
  }, []);

  const openTrainingModalHandler = () => {
    dispatch(openModal({ modalType: "addTraining" }));
  };

  const openPlanModalHandler = () => {
    dispatch(openModal({ modalType: "choosePlan" }));
  };
  return (
    <>
      {modal.modalType === "addTraining" && <Modal />}
      {modal.modalType === "planModal" && <Modal />}
      {modal.modalType === "choosePlan" && <Modal />}
      <div className='dashboard'>
        <div className='dashboard__top'>
          <Wrapper>
            <News />
          </Wrapper>
        </div>

        <div className='dashboard__bottom'>
          <div className='dashboard__buttons'>
            {user.role === "ADMIN" && (
              <Button
                class='daycard__edit__button'
                onClick={openTrainingModalHandler}
              >
                Add Training
              </Button>
            )}
            <Button
              class='daycard__edit__button'
              onClick={openPlanModalHandler}
            >
              Choose a Plan
            </Button>
          </div>
          <div className='dashboard__cards'>
            {daysInWeek.map((day, i) => {
              let trainingsForDay = traning.trainings.filter((training) => {
                return training.trainingDay === day;
              });
              return (
                <DayCard dayName={day} trainings={trainingsForDay} key={i} />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
