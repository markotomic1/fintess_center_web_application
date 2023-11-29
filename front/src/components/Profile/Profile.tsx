"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import "./profile.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Button from "../Button/Button";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Modal from "../Modal/Modal";
import { openModal } from "@/redux/features/modalSlice";
import { uploadFile } from "@/utils/firebase";
import { ToastContainer, toast } from "react-toastify";
import { uploadImageAction } from "@/redux/features/userSlice";
import Image from "next/image";

const Profile = () => {
  const [img, setImg] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState<string>("");
  const user = useAppSelector((state) => state.user);
  const modal = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      if (img && imgUrl === "") {
        uploadFile(img, setImgUrl, setImg);
      }

      if (imgUrl !== "") {
        //store link in database
        try {
          await dispatch(uploadImageAction(imgUrl)).unwrap();
        } catch (error) {
          console.error(error);
          toast.error("Unable to save image!");
        }
      }
    })();
  }, [img, imgUrl, dispatch]);

  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImg(() => {
      if (e.target.files) {
        return e.target.files[0];
      }
      return null;
    });
  };

  const changePasswordHandler = async () => {
    dispatch(openModal({ modalType: "changePassword" }));
  };
  const editProfileHandler = async () => {
    dispatch(openModal({ modalType: "editUser" }));
  };
  return (
    <>
      <ToastContainer />
      {modal.modalType === "changePassword" && <Modal />}
      {modal.modalType === "editUser" && <Modal />}
      <div className='profile'>
        <div className='photo__container'>
          <div className='profile__image'>
            <Image
              width={200}
              height={200}
              src={user.currentUser.imgUrl}
              alt='Profile picture'
              className='profile__user__image'
            />
          </div>
          <div className='photo__add'>
            <label
              htmlFor='file__icon'
              onClick={handleIconClick}
              className='file__label'
            >
              <CameraAltIcon />
            </label>
            <input
              type='file'
              name='file'
              id='file__icon'
              ref={fileInputRef}
              className='file__input'
              onChange={handleFileChange}
              accept='image/png'
            />
          </div>
        </div>
        <div className='profile__details'>
          <div className='profile__info'>
            <div className='profile__info__item'>
              <span className='profile__item__name'>Username:</span>
              <span>{user.currentUser.username}</span>
              <hr />
            </div>
            <div className='profile__info__item'>
              <span className='profile__item__name'>Name:</span>
              <span>{user.currentUser.name}</span>
              <hr />
            </div>
            <div className='profile__info__item'>
              <span className='profile__item__name'>Surname:</span>
              <span>{user.currentUser.surname}</span>
              <hr />
            </div>
            <div className='profile__info__item'>
              <span className='profile__item__name'>Email:</span>
              <span>{user.currentUser.email}</span>
              <hr />
            </div>
            <div className='profile__info__item'>
              <span className='profile__item__name'>Plan:</span>
              <span>
                {user.currentUser.planName === ""
                  ? "No Plan"
                  : user.currentUser.planName}
              </span>
              <hr />
            </div>
            {user.currentUser.planName !== "" && (
              <div className='profile__info__item'>
                <span className='profile__item__name'>Valid due:</span>
                <span>
                  {new Date(
                    user.currentUser.endDateOfPlan
                  ).toLocaleDateString()}
                </span>
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
