"use client";
import React from "react";
import Button from "../Button/Button";
import "./home.scss";
import background from "../../../public/images/homeBackground.png";
import { useRouter } from "next/navigation";
const Home = () => {
  const router = useRouter();
  return (
    <div className='home'>
      <img
        src={background.src}
        alt='Background gym image'
        className='home__background'
      />
      <Button class='home__button' onClick={() => router.push("/register")}>
        Join us
      </Button>
    </div>
  );
};

export default Home;
