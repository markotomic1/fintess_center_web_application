"use client";
import React from "react";
import "./home.scss";
import Button from "../UI/Button/Button";
import background from "../../../public/images/homeBackground.png";
import { useRouter } from "next/navigation";
const Home = () => {
  const router = useRouter();
  return (
    <div className='home'>
      <img
        src={background.src}
        alt='Background gym image'
        className='background__full'
      />
      <Button class='home__button' onClick={() => router.push("/register")}>
        Join us
      </Button>
    </div>
  );
};

export default Home;
