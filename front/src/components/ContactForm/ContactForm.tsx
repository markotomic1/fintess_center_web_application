import React, { FormEvent, useEffect } from "react";
import "./contactForm.scss";
import Button from "../UI/Button/Button";
import useForm from "@/hooks/useForm";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { checkError } from "@/utils/checkErrors";
import { removeErrors } from "@/redux/features/uiSlice";
import { sendeEmail } from "@/redux/features/userSlice";
import { ContactData } from "@/utils/types";

const ContactForm = () => {
  const { formData, handleInputChange, resetForm, blurHandler } =
    useForm<ContactData>({
      fullname: "",
      email: "",
      phone: "",
      description: "",
    });
  const { error } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();

  //remove old erros when change a page
  useEffect(() => {
    return () => {
      dispatch(removeErrors());
    };
  }, [dispatch]);

  //submit form
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (error.length < 1) {
        await dispatch(sendeEmail(formData));
        resetForm();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form className='contactForm' onSubmit={submitHandler}>
        <div className='form__item'>
          <input
            type='text'
            placeholder='Full name'
            name='fullname'
            id='fullname'
            onChange={(e) => handleInputChange("fullname", e.target.value)}
            value={formData.fullname}
            onBlur={(e) => blurHandler("fullname", e.target.value)}
            className={`${
              checkError("fullnameError", error) ? "inputError" : ""
            }`}
          />
          {checkError("fullnameError", error) && (
            <span className='error__text'>
              {
                error.find((errorItem) => errorItem.id === "fullnameError")
                  ?.message
              }
            </span>
          )}
        </div>
        <div className='form__item'>
          <input
            type='text'
            placeholder='Email'
            name='email'
            id='Email'
            onChange={(e) => handleInputChange("email", e.target.value)}
            onBlur={(e) => blurHandler("email", e.target.value)}
            className={`${checkError("emailError", error) ? "inputError" : ""}`}
            value={formData.email}
            autoComplete='false'
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
        <div className='form__item'>
          <input
            type='text'
            placeholder='Phone'
            name='phone'
            id='phone'
            onChange={(e) => handleInputChange("phone", e.target.value)}
            onBlur={(e) => blurHandler("phone", e.target.value)}
            className={`${checkError("phoneError", error) ? "inputError" : ""}`}
            value={formData.phone}
            autoComplete='false'
          />
          {checkError("phoneError", error) && (
            <span className='error__text'>
              {
                error.find((errorItem) => errorItem.id === "phoneError")
                  ?.message
              }
            </span>
          )}
        </div>
        <div className='form__item'>
          <textarea
            name='description'
            rows={10}
            placeholder='Describe your request'
            id='description'
            onChange={(e) => handleInputChange("description", e.target.value)}
            onBlur={(e) => blurHandler("description", e.target.value)}
            className={`${
              checkError("descriptionError", error) ? "inputError" : ""
            }`}
            value={formData.description}
          />
          {checkError("descriptionError", error) && (
            <span className='error__text'>
              {
                error.find((errorItem) => errorItem.id === "descriptionError")
                  ?.message
              }
            </span>
          )}
        </div>
        <Button
          class={`submit__button ${error.length > 0 ? "button--disabled" : ""}`}
          type='submit'
          disable={error.length > 0}
        >
          Submit Request
        </Button>
      </form>
      <div className='error__container'>
        {error.map((error, i) => {
          if (error.id === "mailError") {
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

export default ContactForm;
