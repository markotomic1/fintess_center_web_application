import React from "react";
import "./about.scss";
import { aboutUsData } from "../../utils/rawData";
import Card from "../Card/Card";
import background from "../../../public/images/aboutusBack.png";
const About = () => {
  return (
    <div className='about'>
      <section className='section__aboutus'>
        <div className='aboutus__title__container'>
          <img
            src={background.src}
            alt='about us background'
            className='aboutus__img'
          />
          <h1 className='section__aboutus__title'>About us</h1>
        </div>
        <p className='section__aboutus__desc'>
          At Ignite Fit, we're not just a gym; we're a community of fitness
          enthusiasts, trainers, and individuals who are passionate about
          helping you achieve your health and fitness goals. Our mission is
          simple: to ignite the spark of fitness in everyone who walks through
          our doors. Ignite Fit was founded by a group of fitness professionals
          who shared a common vision: to create a welcoming and empowering
          fitness space where individuals of all fitness levels could thrive. We
          understand that embarking on a fitness journey can be daunting, which
          is why we're here to support, guide, and motivate you every step of
          the way.
        </p>
      </section>
      <section className='section__mission'>
        <h2 className='section__mission__title'>Our Mission</h2>
        <p className='section__mission__desc'>
          At Ignite Fit, we are committed to providing a welcoming and
          supportive environment where individuals of all fitness levels can
          thrive. Whether you're a seasoned athlete or taking your first steps
          on your fitness journey, we have the programs, expertise, and
          state-of-the-art facilities to help you succeed.
        </p>
      </section>
      <section className='section__card'>
        <h2 className='section__card__title'>What Sets Us Apart</h2>
        <div className='cards'>
          {aboutUsData.map((item) => (
            <Card
              key={item.id}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
