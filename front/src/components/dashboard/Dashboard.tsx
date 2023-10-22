"use client";
import React from "react";
import "./dashboard.scss";
import Button from "../UI/Button/Button";
import Link from "next/link";

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <div className='top'>
        <Link href='/profile' passHref>
          <Button class='profile__button'>Your Profile</Button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
