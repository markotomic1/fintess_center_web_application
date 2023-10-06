import React, { ChangeEvent, useState } from "react";

const useForm = (initialState: {
  username: string;
  password: string;
  name?: string;
  surname?: string;
  email?: string;
}) => {
  const [formData, setFormData] = useState(initialState);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const resetForm = () => {
    setFormData(initialState);
  };
  return { formData, handleInputChange, resetForm };
};

export default useForm;
