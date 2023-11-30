"use client";
import React, { useEffect } from "react";
import "./dashboard.scss";
import Wrapper from "../Wrapper/Wrapper";
import { daysInWeek } from "@/utils/rawData";
import DayCard from "../DayCard/DayCard";
import Modal from "../Modal/Modal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getTrainings } from "@/redux/features/trainingSlice";
import Button from "../Button/Button";
import { openModal } from "@/redux/features/modalSlice";
import News from "../News/News";
import UsersList from "../UsersList/UsersList";
const Dashboard = () => {
  const modal = useAppSelector((state) => state.modal);
  const traning = useAppSelector((state) => state.training);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(getTrainings());
    })();
  }, [dispatch]);

  const openTrainingModalHandler = () => {
    dispatch(openModal({ modalType: "addTraining" }));
  };

  const openPlanModalHandler = async () => {
    dispatch(openModal({ modalType: "choosePlan" }));
  };

  const addPlanHandler = () => {
    dispatch(openModal({ modalType: "addPlan" }));
  };
  return (
    <>
      {modal.modalType === "addTraining" && <Modal />}
      {modal.modalType === "addPlan" && <Modal />}
      {modal.modalType === "choosePlan" && <Modal />}
      <div className='dashboard'>
        <div className='dashboard__top'>
          <Wrapper>
            <News />
          </Wrapper>
        </div>

        <div className='dashboard__bottom'>
          <div className='dashboard__buttons'>
            {user.currentUser.role === "ADMIN" && (
              <>
                <Button
                  class='daycard__edit__button'
                  onClick={openTrainingModalHandler}
                >
                  Add Training
                </Button>
                <Button class='daycard__edit__button' onClick={addPlanHandler}>
                  Add Plan
                </Button>
              </>
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
          {user.currentUser.role === "ADMIN" && <UsersList />}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
