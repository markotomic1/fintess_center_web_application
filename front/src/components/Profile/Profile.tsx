"use client";
import React from "react";
import "./profile.scss";
import { useAppSelector } from "@/redux/hooks";
import Button from "../UI/Button/Button";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
const Profile = () => {
  const user = useAppSelector((state) => state.user);
  return (
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
        </div>
        <div className='profile__buttons'>
          <Button class='edit__button'>Edit Profile</Button>
          <Button class='password__button'>Change Password</Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
