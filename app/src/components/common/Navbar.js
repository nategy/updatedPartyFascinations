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
            <Link
              to='/portfolio'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Portfolio
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/services'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Services
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/about' className='nav-links' onClick={closeMobileMenu}>
              About
            </Link>
          </li>
          <li
            className='nav-item'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Link to='/contact' className='nav-links' onClick={closeMobileMenu}>
              Contact
            </Link>
            {dropdown && <Dropdown />}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
