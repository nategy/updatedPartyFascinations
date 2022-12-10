import React, {useState} from "react"
import {Button} from "./Buttons"
import {Link} from "react-router-dom"
import "./Navbar.css"
import Dropdown from "./Dropdown"
import {MdOutlineMenu} from "react-icons/md"
import Logo from "./pf-logo.png"



function Navbar() {
    const [click,setClick] = useState(false)
    const [dropdown, setDropdown] = useState(false)

    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false)

    const onMouseEnter = () => {
        if(window.innerWidth < 960) {
            setDropdown(false)
        } else {
            setDropdown(true)
        }
    };
    const onMouseLeave = () => {
        if(window.innerWidth < 960) {
            setDropdown(false)
        } else {
            setDropdown(false)
        }
    };

    return (
        <>
        <nav className="navbar">
                <Link to='/'>
                    <img src={Logo} alt='' className='main-icon'/>
                </Link>
            {/*<MdOutlineMenu className="menu-logo" size="20px" /> */}
            <div className="menu-icon" onClick={handleClick}>
                <i className={click ? 'fas fa-times' : 'fass fa-bars'} />
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                <li id="portfolio" className="nav-item">
                    <Link to='/portfolio' className='nav-links'onClick={closeMobileMenu}>
                        Portfolio
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to='/services' className='nav-links'onClick={closeMobileMenu}>
                        Services <i className="fas fa-caret-down" />
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to='/about' className='nav-links'onClick={closeMobileMenu}>
                        About
                    </Link>
                </li>
                <li className="nav-item" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                    <Link to='/contact' className='nav-links'onClick={closeMobileMenu}>
                        Contact
                    </Link>
                    {dropdown && <Dropdown />}
                </li>
            </ul>
            {/*<Button />*/}
        </nav>
        </>
    )
}

export default Navbar;

