import React from "react";
import "./footer.scss";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import logo from "../../../public/images/ignitefitLogo.png";
import Image from "next/image";
const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer__top'>
        <div className='logo'>
          <Image
            height={50}
            width={100}
            src={logo.src}
            alt='Ignite Fit Logo'
            className='logo__image'
          />
        </div>
        <div className='location'>
          <span>Istocno Sarajevo</span>
          <span>Karadjordjeva 22</span>
          <span>71123 Istocno Novo Sarajevo,Bosnia and Herzegovina</span>
          <span>info@ignitefit.com</span>
        </div>
        <div className='social'>
          <FacebookIcon />
          <LinkedInIcon />
          <InstagramIcon />
        </div>
      </div>
      <div className='footer__bottom'>
        <span className='copyright'>
          ©Copyright 2023 IgniteFit - All Rights Reserved
        </span>
      </div>
    </footer>
  );
};

export default Footer;
