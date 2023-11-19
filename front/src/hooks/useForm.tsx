import { addError, removeError } from "@/redux/features/uiSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { capitalizeFirstLetter } from "@/utils/stringUtils";
import { useState } from "react";
import validator from "validator";
type FormState<T> = T;

const useForm = <T,>(initialState: FormState<T> = {} as T) => {
  const [formData, setFormData] = useState<FormState<T>>(initialState);
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.ui);

  const handleInputChange = (name: keyof T, value: T[keyof T]) => {
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const autoSetFormData = (data: typeof initialState) => {
    setFormData(data);
  };

  const blurHandler = (name: keyof T, value: string) => {
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
    } else if (
      (name === "username" || name === "password") &&
      (value.trim().length < 6 || value.trim().length > 15)
    ) {
      dispatch(
        addError({
          id: name.toString() + "Error",
          message: `${capitalizeFirstLetter(
            name.toString()
          )} must be 6-15 chars!`,
        })
      );
    } else if (error.length > 0) {
      dispatch(removeError("sendMailError"));
      dispatch(removeError(name.toString() + "Error"));
    }
  };
  const resetForm = () => {
    setFormData(initialState);
  };
  return {
    formData,
    handleInputChange,
    resetForm,
    blurHandler,
    autoSetFormData,
  };
};

export default useForm;
