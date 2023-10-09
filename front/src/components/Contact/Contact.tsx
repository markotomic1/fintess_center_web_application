"use client";
import React from "react";
import "./contact.scss";
import ContactForm from "../ContactForm/ContactForm";
import contantImg from "../../../public/images/contactImage.png";
import Map from "../Map/Map";

const Contact = () => {
  return (
    <div className='contact'>
      <div className='header__container'>
        <img src={contantImg.src} alt='Contant Image' className='header__img' />
        <h1 className='header__title'>Get In Touch</h1>
      </div>
      <div className='contact__bottom'>
        <h2 className='contactus__title'>Contact Us</h2>
        <ContactForm />
      </div>
      <div className='contact__top'>
        <div className='contact__location'>
          <h2 className='location__title'>Istocno Sarajevo</h2>
          <hr className='line' />
          <div className='location__details'>
            <span>Karadjordjeva 22</span>
            <span>71123 Istocno Novo Sarajevo</span>
            <span>Tel: +38766321321</span>
          </div>
        </div>
        <div className='map'>
          <Map />
        </div>
      </div>
    </div>
  );
};

export default Contact;
