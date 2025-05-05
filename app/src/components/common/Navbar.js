import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Dropdown from "./Dropdown";
import Logo from "./pf-logo.png";

function Navbar() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth >= 960) {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth >= 960) {
      setDropdown(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 960) {
        setDropdown(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className='navbar' role='navigation' aria-label='Main navigation'>
      <div className='navbar-container'>
        <Link
          to='/'
          className='navbar-logo'
          onClick={closeMobileMenu}
          aria-label='Home'
        >
          <img src={Logo} alt='Party Fascinations Logo' className='main-icon' />
        </Link>
        <button
          className='menu-icon'
          onClick={handleClick}
          aria-label='Toggle menu'
          aria-expanded={click}
        >
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </button>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
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
          {dropdown && <Dropdown />}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
