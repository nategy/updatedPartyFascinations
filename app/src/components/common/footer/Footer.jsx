import React from "react";
import "./footer.css"
import {FaFacebookF} from "react-icons/fa"
import {BsInstagram} from "react-icons/bs"
import {HiLocationMarker} from "react-icons/hi"
import {FaPhoneAlt} from "react-icons/fa"
import {GoGlobe} from "react-icons/go"
import {BiEnvelope} from "react-icons/bi"
import {ImPhone} from "react-icons/im"
import {Logo} from "../footer/pf-logo.png"


function Footer(){
    return(
        <div className="main-footer">
            <div className="container">
                <div className="row">
                        {/*column1*/}
                        <div className="col">
                            {/*<h3 className="footer-name">Party Fascinations</h3>*/}
                                <p>Party Fascinations goes that extra step </p>
                                <p> to make sure your Wedding Day, Birthday,</p>
                                <p> Corporate event or even Family Reunion </p>
                                <p> is fun and truly unforgettable.</p>
                        </div>
                        {/* column 2 */}
                        <div className="col2">
                            <h3 className="contact">Contact Info</h3>
                            <div className="icons">
                                <p>
                                <ImPhone className="phone-icon" />
                                    (512) 402-2141
                                </p>
                                <p>
                                <GoGlobe className="globe-icon" />
                                    info@partyfascinations.com
                                </p>
                                <p>
                                <BiEnvelope className="mail-icon" />
                                    partyfascinations.com
                                </p>
                                <p>
                                <HiLocationMarker className="location-icon" />
                                    9941 Old Lockhart Rd, Austin, TX 78747
                                </p>
                            </div>
                        </div>
                                                {/*column3*/}
                            <a className="facebook-icon" target="_blank" rel="nofollow noopener noreferrer"
                                href="https://www.facebook.com/PartyFascinations/" >
                                <FaFacebookF size="40px" />
                            </a>
                            <a className="instagram-icon" target="_blank" rel="nofollow noopener noreferrer"
                                href="https://www.instagram.com/partyfascinations/" >
                                <BsInstagram size="40px" />
                            </a>
                </div>
                <div className="copyright">
                    <p className="col-sm">
                    &copy; 2020 Party Fascinations. Site created by CS Web Design. Model Feature created by NG Web Creations.
                    </p>
                </div>
            </div>
       </div>
    )
}
export default Footer;
/*
                        <div className="col3">
                            <h3>Party Fascinations</h3>
                            <ul className="list">
                                <li>logo</li>
                                <li>paragraph</li>
                                <li>icons</li>
                            </ul>
                        </div>

<section className="footer">
<p> Party Fascinations goes that extra step to make sure your Wedding Day, Birthday,
    Corporate event or even Family Reunion is fun and truly unforgettable.
</p>
<a className="facebook-icon" target="_blank" rel="nofollow noopener noreferrer"
        href="https://www.facebook.com/PartyFascinations/" >
        <FaFacebookF size="21px" />
    </a>
    <a className="instagram-icon" target="_blank" rel="nofollow noopener noreferrer"
        href="https://www.instagram.com/partyfascinations/" >
        <BsInstagram size="20px" />
    </a>
</section>
*/