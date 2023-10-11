import { addError, removeError } from "@/redux/features/uiSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useState } from "react";
import validator from "validator";
type FormState<T> = T;

const useForm = <T,>(initialState: FormState<T> = {} as T) => {
  const [formData, setFormData] = useState<FormState<T>>(initialState);
  const dispatch = useAppDispatch();

  const handleInputChange = (name: keyof T, value: T[keyof T]) => {
    setFormData({ ...formData, [name]: value });
  };

  const blurHandler = (name: keyof T, value: string) => {
    dispatch(removeError(name.toString() + "Error"));
    if (value.trim().length < 1) {
      dispatch(
        addError({
          id: name.toString() + "Error",
          message: "Field can not be empty!",
        })
      );
    } else if (name === "email" && !validator.isEmail(value)) {
      dispatch(
        addError({
          id: name.toString() + "Error",
          message: "Not valid Email!",
        })
      );
    } else if (name === "phone" && !validator.isMobilePhone(value)) {
      dispatch(
        addError({
          id: name.toString() + "Error",
          message: "Not valid Phone number!",
        })
      );
    }
  };
  const resetForm = () => {
    setFormData(initialState);
  };
  return { formData, handleInputChange, resetForm, blurHandler };
};

export default useForm;
