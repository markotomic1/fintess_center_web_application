"use client";
import React from "react";
import "./form.scss";
import Button from "../UI/Button/Button";
import Link from "next/link";
import logo from "../../../public/images/ignitefitLogoDark.png";
import useForm from "@/hooks/useForm";
const Form = (props: { type: "login" | "register" }) => {
  const { formData, handleInputChange, resetForm } = useForm(
    props.type === "login"
      ? { username: "", password: "" }
      : { username: "", password: "", name: "", surname: "", email: "" }
  );
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    resetForm();
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
            <label htmlFor='name'>Name: </label>
            <input
              type='text'
              id='name'
              name='name'
              onChange={handleInputChange}
              value={formData.name}
            />
            <label htmlFor='surname'>Surname: </label>
            <input
              type='text'
              id='surname'
              name='surname'
              onChange={handleInputChange}
              value={formData.surname}
            />
            <label htmlFor='email'>Email: </label>
            <input
              type='text'
              id='email'
              name='email'
              onChange={handleInputChange}
              value={formData.email}
            />
          </>
        )}
        <label htmlFor='username'>Username: </label>
        <input
          type='text'
          id='username'
          name='username'
          onChange={handleInputChange}
          value={formData.username}
        />
        <label htmlFor='password'>Password: </label>
        <input
          type='password'
          id='password'
          name='password'
          onChange={handleInputChange}
          value={formData.password}
        />
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
    </>
  );
};

export default Form;
