import { useState } from "react";

type FormState<T> = T;

const useForm = <T,>(initialState: FormState<T> = {} as T) => {
  const [formData, setFormData] = useState<FormState<T>>(initialState);
  const handleInputChange = (name: keyof T, value: T[keyof T]) => {
    setFormData({ ...formData, [name]: value });
  };
  const resetForm = () => {
    setFormData(initialState);
  };
  return { formData, handleInputChange, resetForm };
};

export default useForm;
