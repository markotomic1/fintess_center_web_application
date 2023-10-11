import React, { FormEvent, useState } from "react";
import "./contactForm.scss";
import Button from "../UI/Button/Button";
import useForm from "@/hooks/useForm";
import { useAppSelector } from "@/redux/hooks";

interface ContactForm {
  fullname: string;
  email: string;
  phone: string;
  description: string;
}
const ContactForm = () => {
  const { formData, handleInputChange, resetForm, blurHandler } =
    useForm<ContactForm>({
      fullname: "",
      email: "",
      phone: "",
      description: "",
    });
  const { error } = useAppSelector((state) => state.ui);
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const checkError = (errorClass: string): boolean => {
    let value = false;
    error.forEach((error) => {
      if (error.id === errorClass) {
        value = true;
        return;
      }
    });
    return value;
  };

  return (
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
          className={`${checkError("fullnameError") ? "inputError" : ""}`}
        />
        {checkError("fullnameError") && (
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
          className={`${checkError("emailError") ? "inputError" : ""}`}
          value={formData.email}
          autoComplete='false'
        />
        {checkError("emailError") && (
          <span className='error__text'>
            {error.find((errorItem) => errorItem.id === "emailError")?.message}
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
          className={`${checkError("phoneError") ? "inputError" : ""}`}
          value={formData.phone}
          autoComplete='false'
        />
        {checkError("phoneError") && (
          <span className='error__text'>
            {error.find((errorItem) => errorItem.id === "phoneError")?.message}
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
          className={`${checkError("descriptionError") ? "inputError" : ""}`}
          value={formData.description}
        />
        {checkError("descriptionError") && (
          <span className='error__text'>
            {
              error.find((errorItem) => errorItem.id === "descriptionError")
                ?.message
            }
          </span>
        )}
      </div>
      <Button class='submit__button' type='submit'>
        Submit Request
      </Button>
    </form>
  );
};

export default ContactForm;
