import React from "react";
import { HiLocationMarker } from "react-icons/hi";
import { FaPhoneAlt } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import Logo from "/Images/pf-logo-white.png";

import "./header.css";

function Header() {
  return (
    <section className='header'>
      <div className='logo-container'>
        <img src={Logo} alt='Party Fascinations Logo' className='main-logo' />
      </div>
      <div className='left-group'>
        <p className='location'>
          <HiLocationMarker className='location-icon' />
          <span className='location-icon icon-text'>
            9941 Old Lockhart Rd, Austin, TX 78747
          </span>
        </p>
      </div>

      <div className='right-group'>
        <p className='phone'>
          <FaPhoneAlt className='icon' />
          <span className='icon-text'>(512) 402-2141</span>
        </p>
        <a
          className='facebook-icon'
          target='_blank'
          rel='nofollow noopener noreferrer'
          href='https://www.facebook.com/PartyFascinations/'
        >
          <FaFacebookF />
        </a>
        <a
          className='instagram-icon'
          target='_blank'
          rel='nofollow noopener noreferrer'
          href='https://www.instagram.com/partyfascinations/'
        >
          <BsInstagram />
        </a>
      </div>
    </section>
  );
}

export default Header;
