import React from "react";
import {HiLocationMarker} from "react-icons/hi"
import {FaPhoneAlt} from "react-icons/fa"
import {FaFacebookF} from "react-icons/fa"
import {BsInstagram} from "react-icons/bs"
import "./header.css"

function Header() {
    return (
        <section className="header">
            <p className="location">
            <HiLocationMarker className="location-icon icon" />
                <span className="icon-text">9941 Old Lockhart Rd, Austin, TX 78747</span>
            </p>
            <p className="phone icon">
            <FaPhoneAlt className="phone-icon" />
                <span className="icon-text">(512) 402-2141</span>
            </p>
            <a className="facebook-icon icon" target="_blank" rel="nofollow noopener noreferrer"
                href="https://www.facebook.com/PartyFascinations/" >
                <FaFacebookF size="13px" />
            </a>
            <a className="instagram-icon icon" target="_blank" rel="nofollow noopener noreferrer"
                href="https://www.instagram.com/partyfascinations/" >
                <BsInstagram size="12px" />
            </a>
        </section> 
    )
}

export default Header;