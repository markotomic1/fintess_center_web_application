"use client";
import React, { useState } from "react";
import Button from "../UI/Button/Button";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import "./navbar.scss";
import logo from "../../../public/images/ignitefitLogo.png";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/features/userSlice";
import { useRouter } from "next/navigation";

const Navbar = (props: { type?: string }) => {
  const [showNavbar, setShowNavbar] = useState("hidden");
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const toggleNavbar = () => {
    setShowNavbar((prev) => {
      if (prev === "hidden") return "visible";
      else return "hidden";
    });
  };
  const changeUrlHandler = () => {
    setShowNavbar("hidden");
  };

  const logoutHandler = () => {
    dispatch(logout());
    router.push("/");
  };
  return (
    <nav className={`navbar ${props.type === "protected" ? "protected" : ""}`}>
      <div className='navbar__mobile'>
        <Button onClick={toggleNavbar} class='navbar__button'>
          {showNavbar === "visible" ? <CloseIcon /> : <MenuIcon />}
        </Button>
        {user?.email !== "" && <Button class='logout__button'>Logout</Button>}
      </div>

      <ul className={`navbar__link-list ${showNavbar}`}>
        <li className='list__logo link-list__item'>
          <img src={logo.src} alt='IgniteFit Logo' className='logo__image' />
        </li>
        <li className='link-list__item'>
          <Link href='/' className='link' onClick={changeUrlHandler}>
            Home
          </Link>
        </li>
        {user?.email !== "" && (
          <li className='link-list__item'>
            <Link href='/dashboard' className='link'>
              Dashboard
            </Link>
          </li>
        )}
        {user?.email !== "" && (
          <li className='link-list__item'>
            <Link href='/profile' className='link'>
              Profile
            </Link>
          </li>
        )}
        <li className='link-list__item'>
          <Link href='/about' className='link' onClick={changeUrlHandler}>
            About us
          </Link>
        </li>
        <li className='link-list__item'>
          <Link className='link' href='/price' onClick={changeUrlHandler}>
            Pricing
          </Link>
        </li>
        <li className='link-list__item'>
          <Link href='/contact' className='link' onClick={changeUrlHandler}>
            Contact
          </Link>
        </li>
      </ul>
      <div className='logout__container'>
        {user?.email !== "" && (
          <Button class='logout__button' onClick={logoutHandler}>
            Logout
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
