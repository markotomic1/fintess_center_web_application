"use client";
import React, { useState } from "react";
import Button from "../UI/Button/Button";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import "./navbar.scss";
import logo from "../../../public/images/ignitefitLogo.png";
import Link from "next/link";
const Navbar = (props: { type?: string }) => {
  const [showNavbar, setShowNavbar] = useState("hidden");

  const toggleNavbar = () => {
    setShowNavbar((prev) => {
      if (prev === "hidden") return "visible";
      else return "hidden";
    });
  };
  return (
    <nav className={`navbar ${props.type === "home" ? "navbar__home" : ""}`}>
      <div className='navbar__mobile'>
        <Button onClick={toggleNavbar} class='navbar__button'>
          {showNavbar === "visible" ? <CloseIcon /> : <MenuIcon />}
        </Button>
      </div>
      <ul className={`navbar__link-list ${showNavbar}`}>
        <li className='link-list__item list__logo logo'>
          <img src={logo.src} alt='IgniteFit Logo' className='logo__image' />
        </li>
        <li className='link-list__item'>
          <Link href='/' className='link'>
            Home
          </Link>
        </li>
        <li className='link-list__item'>
          <Link href='/about' className='link'>
            About us
          </Link>
        </li>
        <li className='link-list__item'>
          <Link className='link' href='/price'>
            Pricing
          </Link>
        </li>
        <li className='link-list__item'>
          <Link href='/contact' className='link'>
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
