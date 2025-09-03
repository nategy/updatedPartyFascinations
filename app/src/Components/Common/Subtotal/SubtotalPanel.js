import "./subtotal.css";
import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function SubtotalPanel({ items, subtotal, selectedPackage }) {
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => {
    setIsOpen((prev) => !prev);
  };

  const formatTextureName = (textureName) => {
    if (!textureName) return "";
    return textureName.replace(/^pf-/, "").replace(/\.png$/, "");
  };

  return (
    <div className={`subtotal-panel ${isOpen ? "open" : "closed"}`}>
      <div className='subtotal-bar' onClick={togglePanel}>
        {isOpen ? <FaChevronRight /> : <FaChevronLeft />}
        <span>Subtotal: ${subtotal}</span>
      </div>

      {isOpen && (
        <div className='subtotal-content'>
          <h3>Selected Items</h3>
          <ul>
            {items.map((item, index) => (
              <li key={index} className='subtotal-row'>
                <span className='subtotal-name'>
                  {item.name}: {formatTextureName(item.textureName)}
                </span>
                <span className='subtotal-price'>${item.price}</span>
              </li>
            ))}
          </ul>
          <div className='subtotal-divider'></div>
          <h3>Total: ${subtotal}</h3>
        </div>
      )}
    </div>
  );
}
