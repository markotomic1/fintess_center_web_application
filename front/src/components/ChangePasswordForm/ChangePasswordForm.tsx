import React from "react";
import "./changePasswordForm.scss";
import useForm from "@/hooks/useForm";
import Button from "../Button/Button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { changePasswordAction } from "@/redux/features/userSlice";
import { addError } from "@/redux/features/uiSlice";
import { closeModal } from "@/redux/features/modalSlice";
import { checkError } from "@/utils/checkErrors";
const ChangePasswordForm = () => {
  const { formData, blurHandler, handleInputChange, resetForm } = useForm({
    oldPassword: "",
    newPassword: "",
    newPassword2: "",
  });
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.ui);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (formData.newPassword === formData.newPassword2) {
        await dispatch(
          changePasswordAction({
            newPassword: formData.newPassword,
            oldPassword: formData.oldPassword,
          })
        ).unwrap();
        resetForm();
        dispatch(closeModal());
      } else {
        dispatch(
          addError({
            id: "changePasswordError",
            message: "Password not same",
          })
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <h1 className='form__title'>Change Password</h1>
      <form className='changePasswordForm' onSubmit={submitHandler}>
        <div className='form__item'>
          <label htmlFor='oldPassword'>Old Password:</label>
          <input
            type='password'
            name='oldPassword'
            id='oldPassword'
            value={formData.oldPassword}
            onChange={(e) => handleInputChange("oldPassword", e.target.value)}
            onBlur={(e) => blurHandler("oldPassword", e.target.value)}
            className={`form__input ${
              checkError("oldPasswordError", error) ? "inputError" : ""
            }`}
          />
          {checkError("oldPasswordError", error) && (
            <span className='error__text'>
              {
                error.find((errorItem) => errorItem.id === "oldPasswordError")
                  ?.message
              }
            </span>
          )}
        </div>
        <div className='form__item'>
          <label htmlFor='newPassword'>New Password:</label>
          <input
            type='password'
            name='newPassword'
            id='newPassword'
            value={formData.newPassword}
            onChange={(e) => handleInputChange("newPassword", e.target.value)}
            onBlur={(e) => blurHandler("newPassword", e.target.value)}
            className={`form__input ${
              checkError("newPasswordError", error) ? "inputError" : ""
            }`}
          />
          {checkError("newPasswordError", error) && (
            <span className='error__text'>
              {
                error.find((errorItem) => errorItem.id === "newPasswordError")
                  ?.message
              }
            </span>
          )}
        </div>
        <div className='form__item'>
          <label htmlFor='newPassword2'>Retype New Password:</label>
          <input
            type='password'
            name='newPassword2'
            id='newPassword2'
            value={formData.newPassword2}
            onChange={(e) => handleInputChange("newPassword2", e.target.value)}
            onBlur={(e) => blurHandler("newPassword2", e.target.value)}
            className={`form__input ${
              checkError("newPassword2Error", error) ? "inputError" : ""
            }`}
          />
          {checkError("newPassword2Error", error) && (
            <span className='error__text'>
              {
                error.find((errorItem) => errorItem.id === "newPassword2Error")
                  ?.message
              }
            </span>
          )}
        </div>
        <Button class='submit__button' type='submit'>
          Submit
        </Button>
      </form>
      <div className='error__container'>
        {error.map((error, i) => {
          if (error.id === "changePasswordError") {
            return (
              <span className='error__text' key={i}>
                {error.message}
              </span>
            );
          }
        })}
      </div>
    </>
  );
};

export default ChangePasswordForm;
