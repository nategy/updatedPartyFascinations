import React, { useEffect } from "react";
import "./Navbar.css";

function Navbar({ navOpen, setNavOpen }) {
  const handleClick = () => setNavOpen(!navOpen);
  const closeMobileMenu = () => setNavOpen(false);

  useEffect(() => {
    const handleResize = () => {
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
        <p className='nav-header' aria-label='PF Event Modeler header'>
          PF Event Modeler
        </p>
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
