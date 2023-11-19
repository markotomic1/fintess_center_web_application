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
const Modal = () => {
  //const [mounted, setMounted] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();

  //useEffect(() => setMounted(true), []);
  const ModalBackdrop = () => {
    return <div className='backdrop' />;
  };

  const closeModalHandler = () => {
    dispatch(closeModal());
    dispatch(removeErrors());
  };

  const ModalOverlay = () => {
    const modal = useAppSelector((state) => state.modal);

    const formToShow =
      modal.modalType === "addNews" ? (
        <AddNewsForm />
      ) : modal.modalType === "addTraining" ? (
        <AddTrainingForm />
      ) : modal.modalType === "changePassword" ? (
        <ChangePasswordForm />
      ) : modal.modalType === "editUser" ? (
        <EditProfileForm />
      ) : null;

    return (
      <div className='overlay'>
        <Wrapper>
          <div className='modal'>
            <Button onClick={closeModalHandler} class='modal__button'>
              <CloseIcon />
            </Button>
            {formToShow}
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
