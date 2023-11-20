import React from "react";
import "./planForm.scss";

const PlanForm = () => {
  return (
    <>
      <h2 className='form__title'>Puchase a Plan</h2>

      <form className='planForm'>
        <div className='form__item'>
          <select name='planName' id='planName'>
            <option value='' disabled></option>
          </select>
        </div>
      </form>
    </>
  );
};

export default PlanForm;
