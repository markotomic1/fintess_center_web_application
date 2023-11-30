import React, { useEffect } from "react";
import "./editProfileForm.scss";
import useForm from "@/hooks/useForm";
import Button from "../Button/Button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { checkError } from "@/utils/checkErrors";
import { updateUserAction } from "@/redux/features/userSlice";
import { closeModal } from "@/redux/features/modalSlice";
const EditProfileForm = () => {
  const { formData, blurHandler, handleInputChange, autoSetFormData } = useForm(
    {
      name: "",
      surname: "",
      username: "",
      email: "",
    }
  );
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    const { email, name, surname, username } = user.currentUser;
    autoSetFormData({ email, name, surname, username });
  }, []);
  const { error } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(updateUserAction(formData)).unwrap();
      dispatch(closeModal());
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <h1 className='form__title'>Edit Profile</h1>
      <form className='editProfileForm' onSubmit={submitHandler}>
        <div className='form__item'>
          <label htmlFor='username'>Username: </label>
          <input
            type='text'
            id='username'
            name='username'
            onChange={(e) => handleInputChange("username", e.target.value)}
            value={formData.username}
            onBlur={(e) => blurHandler("username", e.target.value)}
            className={`form__input ${
              checkError("usernameError", error) ? "inputError" : ""
            }`}
            autoComplete={user.currentUser.username}
          />
          {checkError("usernameError", error) && (
            <span className='error__text'>
              {
                error.find((errorItem) => errorItem.id === "usernameError")
                  ?.message
              }
            </span>
          )}
        </div>
        <div className='form__item'>
          <label htmlFor='name'>Name: </label>
          <input
            type='text'
            id='name'
            name='name'
            onChange={(e) => handleInputChange("name", e.target.value)}
            value={formData.name}
            onBlur={(e) => blurHandler("name", e.target.value)}
            className={`form__input ${
              checkError("nameError", error) ? "inputError" : ""
            }`}
            autoComplete={user.currentUser.name}
          />
          {checkError("nameError", error) && (
            <span className='error__text'>
              {error.find((errorItem) => errorItem.id === "nameError")?.message}
            </span>
          )}
        </div>
        <div className='form__item'>
          <label htmlFor='surname'>Surname: </label>
          <input
            type='text'
            id='surname'
            onChange={(e) => handleInputChange("surname", e.target.value)}
            name='surname'
            value={formData.surname}
            onBlur={(e) => blurHandler("surname", e.target.value)}
            className={`form__input ${
              checkError("surnameError", error) ? "inputError" : ""
            }`}
            autoComplete={user.currentUser.surname}
          />
          {checkError("surnameError", error) && (
            <span className='error__text'>
              {
                error.find((errorItem) => errorItem.id === "surnameError")
                  ?.message
              }
            </span>
          )}
        </div>
        <div className='form__item'>
          <label htmlFor='email'>Email: </label>
          <input
            type='text'
            id='email'
            name='email'
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            onBlur={(e) => blurHandler("email", e.target.value)}
            className={`form__input ${
              checkError("emailError", error) ? "inputError" : ""
            }`}
            autoComplete={user.currentUser.email}
          />
          {checkError("emailError", error) && (
            <span className='error__text'>
              {
                error.find((errorItem) => errorItem.id === "emailError")
                  ?.message
              }
            </span>
          )}
        </div>
        <Button type='submit' class='submit__button'>
          Submit
        </Button>
      </form>
      <div className='error__container'>
        {error.map((error, i) => {
          if (error.id === "updateUserError") {
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

export default EditProfileForm;
