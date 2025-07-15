import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "../images/pf-logo.png";

function Navbar({ navOpen, setNavOpen }) {
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setNavOpen(!navOpen);
  const closeMobileMenu = () => setNavOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 960) {
        setDropdown(false);
      }

      // Close mobile menu when resizing to desktop
      if (window.innerWidth >= 960 && navOpen) {
        setNavOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [navOpen, setNavOpen]);

  return (
    <nav className='navbar' role='navigation' aria-label='Main navigation'>
      <div className='navbar-container'>
        {/* <Link
          to='/'
          className='navbar-logo'
          onClick={closeMobileMenu}
          aria-label='Home'
        > */}
        {/* <img src={Logo} alt='Party Fascinations Logo' className='main-icon' /> */}
        <p className='nav-header' aria-label='PF Event Modeler header'>
          PF Event Modeler
        </p>
        {/* </Link> */}
        <button
          className='menu-icon'
          onClick={handleClick}
          aria-label='Toggle menu'
          aria-expanded={navOpen}
        >
          <i className={navOpen ? "fas fa-times" : "fas fa-bars"} />
        </button>
        <ul className={navOpen ? "nav-menu active" : "nav-menu"}>
          <li className='nav-item'>
            <a
              id='nav-home-link'
              href='https://partyfascinations.com/'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Home
            </a>
          </li>
          <li className='nav-item'>
            <a
              href='https://partyfascinations.com/portfolio'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Portfolio
            </a>
          </li>
          <li className='nav-item'>
            <a
              href='https://partyfascinations.com/services'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Services
            </a>
          </li>
          <li className='nav-item'>
            <a
              href='https://partyfascinations.com/packages'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Packages
            </a>
          </li>
          <li className='nav-item'>
            <a
              href='https://partyfascinations.com/reviews'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Reviews
            </a>
          </li>
          <li className='nav-item'>
            <a
              href='https://partyfascinations.com/About'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              About
            </a>
          </li>
          <li className='nav-item'>
            <a
              href='https://partyfascinations.com/contact'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
