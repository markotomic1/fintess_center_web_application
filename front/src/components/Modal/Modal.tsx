"use client";

import React from "react";
import ReactDOM from "react-dom";
import "./modal.scss";
import Wrapper from "../UI/Wrapper/Wrapper";
import Button from "../UI/Button/Button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeErrors } from "@/redux/features/uiSlice";
import CloseIcon from "@mui/icons-material/Close";
import AddTrainingForm from "../AddTrainingForm/AddTrainingForm";
import { closeModal } from "@/redux/features/modalSlice";
import AddNewsForm from "../AddNewsForm/AddNewsForm";
import ChangePasswordForm from "../ChangePasswordForm/ChangePasswordForm";
import EditProfileForm from "../EditProfileForm/EditProfileForm";
import PlanList from "../PlanList/PlanList";
import AddPlanForm from "../AddPlanForm/AddPlanForm";
const Modal = () => {
  //const [mounted, setMounted] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();

  //useEffect(() => setMounted(true), []);
  const ModalBackdrop = () => {
    const dispatch = useAppDispatch();
    const handleBackdrop = () => {
      dispatch(closeModal());
    };
    return <div className='backdrop' onClick={handleBackdrop} />;
  };

  const closeModalHandler = () => {
    dispatch(closeModal());
    dispatch(removeErrors());
  };

  const ModalOverlay = () => {
    const modal = useAppSelector((state) => state.modal);

    const show =
      modal.modalType === "addNews" ? (
        <AddNewsForm />
      ) : modal.modalType === "addTraining" ? (
        <AddTrainingForm />
      ) : modal.modalType === "changePassword" ? (
        <ChangePasswordForm />
      ) : modal.modalType === "editUser" ? (
        <EditProfileForm />
      ) : modal.modalType === "choosePlan" ? (
        <PlanList />
      ) : modal.modalType === "addPlan" ? (
        <AddPlanForm />
      ) : null;

    return (
      <div
        className={`${
          modal.modalType === "choosePlan" ? "overlay__choose" : ""
        } overlay`}
      >
        <Wrapper
          type={`${
            modal.modalType === "choosePlan" ? "choose__plan__wrapper" : ""
          }`}
        >
          <div className='modal'>
            {modal.modalType !== "choosePlan" && (
              <Button onClick={closeModalHandler} class='modal__button'>
                <CloseIcon />
              </Button>
            )}
            {show}
          </div>
        </Wrapper>
      </div>
    );
  };

  return (
    <>
      {ReactDOM.createPortal(<ModalBackdrop />, document.body)}
      {ReactDOM.createPortal(<ModalOverlay />, document.body)}
    </>
  );
};

export default Modal;
