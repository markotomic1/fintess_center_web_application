"use client";
import React from "react";
import "./profile.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Button from "../UI/Button/Button";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Modal from "../Modal/Modal";
import { openModal } from "@/redux/features/modalSlice";
const Profile = () => {
  const user = useAppSelector((state) => state.user);
  const modal = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const changePasswordHandler = async () => {
    dispatch(openModal({ modalType: "changePassword" }));
  };
  const editProfileHandler = async () => {
    dispatch(openModal({ modalType: "editUser" }));
  };
  return (
    <>
      {modal.modalType === "changePassword" && <Modal />}
      {modal.modalType === "editUser" && <Modal />}
      <div className='profile'>
        <div className='photo__container'>
          <div className='profile__image'>{user.name[0]?.toUpperCase()}</div>
          <div className='photo__add'>
            <CameraAltIcon />
          </div>
        </div>
        <div className='profile__details'>
          <div className='profile__info'>
            <div className='profile__info__item'>
              <span className='profile__item__name'>Username:</span>
              <span>{user.username}</span>
              <hr />
            </div>
            <div className='profile__info__item'>
              <span className='profile__item__name'>Name:</span>
              <span>{user.name}</span>
              <hr />
            </div>
            <div className='profile__info__item'>
              <span className='profile__item__name'>Surname:</span>
              <span>{user.surname}</span>
              <hr />
            </div>
            <div className='profile__info__item'>
              <span className='profile__item__name'>Email:</span>
              <span>{user.email}</span>
              <hr />
            </div>
            <div className='profile__info__item'>
              <span className='profile__item__name'>Plan:</span>
              <span>{user.planName === "" ? "No Plan" : user.planName}</span>
              <hr />
            </div>
            {user.planName !== "" && (
              <div className='profile__info__item'>
                <span className='profile__item__name'>Valid due:</span>
                <span>{new Date(user.endDateOfPlan).toLocaleDateString()}</span>
                <hr />
              </div>
            )}
          </div>
          <div className='profile__buttons'>
            <Button class='edit__button' onClick={editProfileHandler}>
              Edit Profile
            </Button>
            <Button class='password__button' onClick={changePasswordHandler}>
              Change Password
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
