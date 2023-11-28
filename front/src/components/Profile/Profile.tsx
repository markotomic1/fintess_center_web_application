"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import "./profile.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Button from "../UI/Button/Button";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Modal from "../Modal/Modal";
import { openModal } from "@/redux/features/modalSlice";
import { uploadFile } from "@/utils/firebase";
import { ToastContainer, toast } from "react-toastify";
import { uploadImageAction } from "@/redux/features/userSlice";

const Profile = () => {
  const [img, setImg] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState<string>("");
  const user = useAppSelector((state) => state.user);
  const modal = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      img && imgUrl === "" && uploadFile(img, setImgUrl, setImg);

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
  }, [img, imgUrl]);

  // export const uploadFile = (file: File) => {
  //   const storage = getStorage(app);

  //   //create the file metadata
  //   const metadata = {
  //     contentType: "image/png",
  //   };
  //   // Upload file and metadata to the object 'images'
  //   const filename = new Date().getTime() + file.name;
  //   const storageRef = ref(storage, "images/" + filename);
  //   const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  //   // Listen for state changes, errors, and completion of the upload.
  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //       const progress =
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       console.log("Upload is " + progress + "% done");
  //       switch (snapshot.state) {
  //         case "paused":
  //           console.log("Upload is paused");
  //           break;
  //         case "running":
  //           console.log("Upload is running");
  //           break;
  //       }
  //     },
  //     (error) => {
  //       // A full list of error codes is available at
  //       // https://firebase.google.com/docs/storage/web/handle-errors
  //       switch (error.code) {
  //         case "storage/unauthorized":
  //           // User doesn't have permission to access the object
  //           console.error(error);
  //           toast.error("Unauthorized!");
  //           break;
  //         case "storage/canceled":
  //           // User canceled the upload
  //           console.error(error);
  //           toast.error("Upload canceled!");
  //           break;

  //         // ...

  //         case "storage/unknown":
  //           // Unknown error occurred, inspect error.serverResponse
  //           console.error(error);
  //           toast.error("An Error Occured!");
  //           break;
  //       }
  //     },
  //     () => {
  //       // Upload completed successfully, now we can get the download URL
  //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //         console.log("File available at", downloadURL);
  //         setImgUrl(downloadURL);
  //         setImg(null);
  //       });
  //     }
  //   );
  // };

  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImg((prev) => {
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
            <img
              src={user.imgUrl}
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
