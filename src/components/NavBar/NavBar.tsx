import React, { useState } from "react";
import "./NavBar.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHamburger,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import Book from "../../../assets/images/book.svg";

interface NavBarProps {
  current: String
}

const NavBar: React.FC<NavBarProps> = (props) => {
  const [clicked, setClicked] = useState<Boolean>(false);
  let menuIcon = faBars;

  const navSlide = () => {
    const nav = document.querySelector(".navbar-nav")!;
    const navLinks = document.querySelectorAll(".nav-item");

    nav.classList.toggle("nav-active");

    setClicked(!clicked);
    menuIcon = clicked ? faHamburger : faBars;

    navLinks.forEach((link) => {
      link.classList.toggle("animation");
    });
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <div className="menu-burger" onClick={navSlide}>
          <FontAwesomeIcon icon={menuIcon} />
        </div>
        <img className="navbar-logo" src={Book} />
        <div>NODEBOOK<div className="path-under-logo">/</div></div>
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/user" className="nav-link">
            User
          </Link>
        </li>
        <li className="nav-item">
          <Link to="#" className="nav-link">
            About
          </Link>
        </li>
      </ul>
      <Link to="#" className="login"  >
        <span className="hide-login">Login</span>
        <FontAwesomeIcon icon={faSignInAlt} className="login-icon" size="2x" />
      </Link>
    </nav>
  );
};

export default NavBar;
