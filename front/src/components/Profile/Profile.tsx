"use client";
import React from "react";
import "./profile.scss";
import Button from "../UI/Button/Button";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
const Profile = () => {
  const user = useAppSelector((state) => state.user);
  return (
    <div className='profile'>
      <div className='top'>
        <Link href='/dashboard' passHref>
          <Button class='profile__button'>Back to Dashoboard</Button>
        </Link>
      </div>
      <div className='profile__container'>
        <div className='photo__container'>
          <span>slika</span>
        </div>
        <div className='profile__info'>
          <span>username: {user.username}</span>
          <span>name: {user.name}</span>
          <span>surname: {user.surname}</span>
          <span>email: {user.email}</span>
          <span>role: {user.role}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
