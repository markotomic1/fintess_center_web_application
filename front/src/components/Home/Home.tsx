"use client";
import React from "react";
import "./home.scss";
import Button from "../Button/Button";
import background from "../../../public/images/homeBackground.png";
import { useRouter } from "next/navigation";
import Image from "next/image";
const Home = () => {
  const router = useRouter();
  return (
    <div className='home'>
      <Image
        fill
        sizes='100vw'
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
