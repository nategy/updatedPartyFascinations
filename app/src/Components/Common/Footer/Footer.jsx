import React from "react";
import "./footer.css";
import { FaFacebookF } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";
import { GoGlobe } from "react-icons/go";
import { BiEnvelope } from "react-icons/bi";
import { ImPhone } from "react-icons/im";

function Footer() {
  return (
    <div className='main-footer'>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <p>Party Fascinations goes that extra step</p>
            <p>to make sure your Wedding Day, Birthday,</p>
            <p>Corporate event or even Family Reunion</p>
            <p>is fun and truly unforgettable.</p>
          </div>
          <div className='col2'>
            <h3 className='contact'>Contact Info</h3>
            <div className='icons'>
              <p>
                <ImPhone className='phone-icon' />
                (512) 402-2141
              </p>
              <p>
                <BiEnvelope className='mail-icon' />
                info@partyfascinations.com
              </p>
              <p>
                <GoGlobe className='globe-icon' />
                partyfascinations.com
              </p>
              <p>
                <HiLocationMarker className='location-icon' />
                9941 Old Lockhart Rd, Austin, TX 78747
              </p>
            </div>
          </div>
          <div className='social-icons'>
            <a
              className='facebook-icon'
              target='_blank'
              rel='nofollow noopener noreferrer'
              href='https://www.facebook.com/PartyFascinations/'
            >
              <FaFacebookF size='40px' />
            </a>
            <a
              className='instagram-icon'
              target='_blank'
              rel='nofollow noopener noreferrer'
              href='https://www.instagram.com/partyfascinations/'
            >
              <BsInstagram size='40px' />
            </a>
          </div>
        </div>
        <div className='copyright'>
          <p className='col-sm'>
            &copy; 2020 Party Fascinations. Site created by CS Web Design.
          </p>
          <p className='col-sm'>Model Feature created by GrayWebCreations.</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
