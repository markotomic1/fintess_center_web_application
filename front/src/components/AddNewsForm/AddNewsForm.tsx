import React from "react";
import "./addNewsForm.scss";
import Button from "../UI/Button/Button";
import useForm from "@/hooks/useForm";
import { News } from "@/utils/types";
import { checkError } from "@/utils/checkErrors";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addNewsAction } from "@/redux/features/newsSlice";
import { closeModal } from "@/redux/features/modalSlice";

const AddNewsForm = () => {
  const { formData, blurHandler, handleInputChange, resetForm } = useForm<News>(
    { id: "", newsDescription: "" }
  );
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.ui);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(addNewsAction(formData.newsDescription)).unwrap();

      resetForm();
      dispatch(closeModal());
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form className='addNewsForm' onSubmit={submitHandler}>
      <h1 className='addNewsForm__title'>Add News</h1>
      <div className='addNewsForm__item'>
        <label htmlFor='newsDescription'>Description:</label>
        <textarea
          name='newsDescription'
          id='newsDescription'
          rows={10}
          value={formData.newsDescription}
          onChange={(e) => handleInputChange("newsDescription", e.target.value)}
          onBlur={(e) => blurHandler("newsDescription", e.target.value)}
          className={`${
            checkError("newsDescriptionError", error) ? "inputError" : ""
          }`}
        />
        {checkError("newsDescriptionError", error) && (
          <span className='error__text'>
            {
              error.find((errorItem) => errorItem.id === "newsDescriptionError")
                ?.message
            }
          </span>
        )}
      </div>
      <Button class='submit__button' type='submit'>
        Submit
      </Button>
    </form>
  );
};

export default AddNewsForm;
