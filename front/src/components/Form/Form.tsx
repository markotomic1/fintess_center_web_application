"use client";
import React, { useEffect } from "react";
import "./form.scss";
import Button from "../UI/Button/Button";
import Link from "next/link";
import logo from "../../../public/images/ignitefitLogoDark.png";
import useForm from "@/hooks/useForm";
import { checkError } from "@/utils/checkErrors";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addError, removeErrors } from "@/redux/features/uiSlice";
import { User } from "../../utils/types";
import { useRouter } from "next/navigation";
import { loginUser, registerUser } from "@/redux/features/userSlice";

const Form = (props: { type: "login" | "register" }) => {
  const { formData, handleInputChange, resetForm, blurHandler } = useForm<User>(
    props.type === "login"
      ? { username: "", password: "" }
      : { username: "", password: "", name: "", surname: "", email: "" }
  );
  const { error } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();
  const router = useRouter();

  //remove old erros when page changes
  useEffect(() => {
    return () => {
      dispatch(removeErrors());
    };
  }, [dispatch]);
  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      props.type === "register"
        ? await dispatch(registerUser(formData)).unwrap()
        : await dispatch(loginUser(formData)).unwrap();

      resetForm();
      router.push("/dashboard");
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <>
      <div className='form__logo'>
        <Link href='/' className='link'>
          <img src={logo.src} alt='IgniteFit Logo' className='logo__image' />
        </Link>
      </div>
      <form className='form' onSubmit={submitHandler}>
        {props.type === "register" && (
          <>
            <div className='form__item'>
              <label htmlFor='name'>Name: </label>
              <input
                type='text'
                id='name'
                name='name'
                onChange={(e) => handleInputChange("name", e.target.value)}
                value={formData.name}
                onBlur={(e) => blurHandler("name", e.target.value)}
                className={`${
                  checkError("nameError", error) ? "inputError" : ""
                }`}
              />
              {checkError("nameError", error) && (
                <span className='error__text'>
                  {
                    error.find((errorItem) => errorItem.id === "nameError")
                      ?.message
                  }
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
                className={`${
                  checkError("surnameError", error) ? "inputError" : ""
                }`}
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
                className={`${
                  checkError("emailError", error) ? "inputError" : ""
                }`}
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
          </>
        )}
        <div className='form__item'>
          <label htmlFor='username'>Username: </label>
          <input
            type='text'
            id='username'
            name='username'
            onChange={(e) => handleInputChange("username", e.target.value)}
            value={formData.username}
            onBlur={(e) => blurHandler("username", e.target.value)}
            className={`${
              checkError("usernameError", error) ? "inputError" : ""
            }`}
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
          <label htmlFor='password'>Password: </label>
          <input
            type='password'
            id='password'
            name='password'
            onChange={(e) => handleInputChange("password", e.target.value)}
            value={formData.password}
            onBlur={(e) => blurHandler("password", e.target.value)}
            className={`${
              checkError("passwordError", error) ? "inputError" : ""
            }`}
          />
          {checkError("passwordError", error) && (
            <span className='error__text'>
              {
                error.find((errorItem) => errorItem.id === "passwordError")
                  ?.message
              }
            </span>
          )}
        </div>
        <Button type='submit' class='submit__button'>
          {props.type === "register" ? "Register" : "Login"}
        </Button>
        <div className='form__bottom'>
          {props.type === "register" ? (
            <span>Already have an account.</span>
          ) : (
            <span>Do not have an account.</span>
          )}
          <Link
            href={`/${props.type === "register" ? "login" : "register"}`}
            className='link'
          >
            {props.type === "register" ? "Login" : "Register"}
          </Link>
        </div>
      </form>
      <div className='error__container'>
        {error.map((error, i) => {
          if (error.id === "registerError" || error.id === "loginError") {
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

export default Form;
