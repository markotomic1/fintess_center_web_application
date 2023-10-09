import React, { FormEvent } from "react";
import "./contactForm.scss";
import Button from "../UI/Button/Button";
import useForm from "@/hooks/useForm";

interface ContactForm {
  fullname: string;
  email: string;
  phone: string;
  description: string;
}
const ContactForm = () => {
  const { formData, handleInputChange, resetForm } = useForm<ContactForm>({
    fullname: "",
    email: "",
    phone: "",
    description: "",
  });
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <form className='contactForm' onSubmit={submitHandler}>
      <input
        type='text'
        placeholder='Full name'
        name='fullname'
        id='fullname'
        onChange={(e) => handleInputChange("fullname", e.target.value)}
        value={formData.fullname}
      />
      <input
        type='text'
        placeholder='Email'
        name='email'
        id='Email'
        onChange={(e) => handleInputChange("email", e.target.value)}
        value={formData.email}
        autoComplete='false'
      />
      <input
        type='text'
        placeholder='Phone'
        name='phone'
        id='phone'
        onChange={(e) => handleInputChange("phone", e.target.value)}
        value={formData.phone}
        autoComplete='false'
      />
      <textarea
        name='description'
        rows={10}
        placeholder='Describe your request'
        id='description'
        onChange={(e) => handleInputChange("description", e.target.value)}
        value={formData.description}
      />
      <Button class='submit__button' type='submit'>
        Submit Request
      </Button>
    </form>
  );
};

export default ContactForm;
