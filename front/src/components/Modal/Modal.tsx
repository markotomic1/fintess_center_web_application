"use client";

import React from "react";
import ReactDOM from "react-dom";
import "./modal.scss";
import Wrapper from "../UI/Wrapper/Wrapper";
import Button from "../UI/Button/Button";
import { useAppDispatch } from "@/redux/hooks";
import { removeErrors } from "@/redux/features/uiSlice";
import CloseIcon from "@mui/icons-material/Close";
import AddTrainingForm from "../AddTrainingForm/AddTrainingForm";
import { closeModal } from "@/redux/features/modalSlice";
const Modal = (props: { type: "addTraining" | null }) => {
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
    return (
      <div className='overlay'>
        <Wrapper>
          <div className='modal'>
            <Button onClick={closeModalHandler} class='modal__button'>
              <CloseIcon />
            </Button>
            {props.type === "addTraining" && <AddTrainingForm />}
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
