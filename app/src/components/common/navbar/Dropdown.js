import React, { useState, useRef, useEffect } from "react";
import { MenuItems } from "./MenuItems";
import { Link } from "react-router-dom";
import "./Dropdown.css";

function Dropdown() {
  const [click, setClick] = useState(false);
  const dropdownRef = useRef(null);

  const handleClick = () => setClick(!click);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setClick(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <ul
      ref={dropdownRef}
      className={`dropdown-menu ${click ? "clicked" : ""}`}
      aria-label='submenu'
      role='menu'
    >
      {MenuItems.map((item, index) => (
        <li key={index}>
          <Link
            className='dropdown-link'
            to={item.path}
            onClick={() => setClick(false)}
            role='menuitem'
          >
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Dropdown;
