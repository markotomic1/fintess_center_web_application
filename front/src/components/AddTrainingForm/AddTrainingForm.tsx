import React from "react";
import "./addTrainingForm.scss";
import useForm from "@/hooks/useForm";
import Button from "../UI/Button/Button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { checkError } from "@/utils/checkErrors";
import { Training } from "@/utils/types";
import { addTrainingAction } from "@/redux/features/trainingSlice";
import { closeModal } from "@/redux/features/modalSlice";
import { daysInWeek, groupTrainings } from "@/utils/rawData";

const AddTrainingForm = () => {
  const { error } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();
  const { formData, handleInputChange, blurHandler, resetForm } =
    useForm<Training>({
      id: "",
      trainingName: "",
      trainingTime: "",
      trainingDay: "",
    });

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(addTrainingAction(formData));
      resetForm();
      dispatch(closeModal());
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form className='addTrainingForm' onSubmit={submitHandler}>
      <h1 className='addNewsForm__title'>Add Training</h1>
      <label htmlFor='trainingName'>Name:</label>
      <select
        name='trainingName'
        id='trainingName'
        value={formData.trainingName}
        onBlur={(e) => blurHandler("trainingName", e.target.value)}
        onChange={(e) => handleInputChange("trainingName", e.target.value)}
        className={`addTrainingForm__select ${
          checkError("trainingNameError", error) ? "inputError" : ""
        }`}
      >
        <option value='' disabled></option>
        {groupTrainings.map((groupTraining) => (
          <option value={groupTraining} key={groupTraining}>
            {groupTraining}
          </option>
        ))}
      </select>
      {checkError("trainingNameError", error) && (
        <span className='error__text'>
          {
            error.find((errorItem) => errorItem.id === "trainingNameError")
              ?.message
          }
        </span>
      )}
      <label htmlFor='trainingTime'>Time:</label>
      <input
        type='text'
        id='trainingTime'
        name='trainingTime'
        value={formData.trainingTime}
        onBlur={(e) => blurHandler("trainingTime", e.target.value)}
        onChange={(e) => handleInputChange("trainingTime", e.target.value)}
        className={`${
          checkError("trainingTimeError", error) ? "inputError" : ""
        }`}
      />
      {checkError("trainingTimeError", error) && (
        <span className='error__text'>
          {
            error.find((errorItem) => errorItem.id === "trainingTimeError")
              ?.message
          }
        </span>
      )}
      <label htmlFor='trainingDay'>Day:</label>
      <select
        name='trainingDay'
        id='trainingDay'
        value={formData.trainingDay}
        onBlur={(e) => blurHandler("trainingDay", e.target.value)}
        onChange={(e) => handleInputChange("trainingDay", e.target.value)}
        className={`addTrainingForm__select ${
          checkError("trainingDayError", error) ? "inputError" : ""
        }`}
      >
        <option value='' disabled></option>
        {daysInWeek.map((day) => (
          <option value={day} key={day}>
            {day}
          </option>
        ))}
      </select>

      {checkError("trainingDayError", error) && (
        <span className='error__text'>
          {
            error.find((errorItem) => errorItem.id === "trainingDayError")
              ?.message
          }
        </span>
      )}
      <Button class='submit__button' type='submit'>
        Submit
      </Button>
    </form>
  );
};

export default AddTrainingForm;
