import useForm from "@/hooks/useForm";
import React from "react";
import "./addPlanForm.scss";
import Button from "../UI/Button/Button";
import { PlanFormData } from "@/utils/types";
import { useAppDispatch } from "@/redux/hooks";
import { addPlanAction } from "@/redux/features/planSlice";

const AddPlanForm = () => {
  const { formData, handleInputChange, resetForm, blurHandler } =
    useForm<PlanFormData>({
      planName: "",
      planDescription: "",
      planPrice: "",
    });
  const dispatch = useAppDispatch();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(
        addPlanAction({
          planName: formData.planName,
          planPrice: formData.planPrice,
          planDescription: formData.planDescription.split("."),
        })
      ).unwrap();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <h2 className='form__title'>Add Plan</h2>
      <form className='addPlan' onSubmit={submitHandler}>
        <div className='form__item'>
          <label htmlFor='planName'>Name:</label>
          <input
            type='text'
            name='planName'
            id='planName'
            className='form__input'
            value={formData.planName}
            onChange={(e) => handleInputChange("planName", e.target.value)}
            onBlur={(e) => blurHandler("planName", e.target.value)}
          />
        </div>
        <div className='form__item'>
          <label htmlFor='planPrice'>Price:</label>
          <input
            type='text'
            name='planPrice'
            id='planPrice'
            className='form__input'
            value={formData.planPrice}
            onChange={(e) => handleInputChange("planPrice", e.target.value)}
            onBlur={(e) => blurHandler("planPrice", e.target.value)}
          />
        </div>
        <div className='form__item'>
          <label htmlFor='planDescription'>Description:</label>
          <textarea
            name='planDescription'
            id='planDescription'
            rows={7}
            value={formData.planDescription}
            onChange={(e) =>
              handleInputChange("planDescription", e.target.value)
            }
            onBlur={(e) => blurHandler("planDescription", e.target.value)}
          />
        </div>
        <Button class='submit__button' type='submit'>
          Submit
        </Button>
      </form>
    </>
  );
};

export default AddPlanForm;
