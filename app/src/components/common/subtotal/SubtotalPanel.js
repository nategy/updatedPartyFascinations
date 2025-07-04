import "./subtotal.css";

import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function SubtotalPanel({
  items,
  subtotal,
  selectedPackage,
  packages,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => {
    setIsOpen((prev) => !prev);
  };

  // Get alloweed keys
  const allowedKeys = packages[[selectedPackage] || []];

  // Filter through items
  const filteredItems = items.filter((item) => allowedKeys.includes(item.key));

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
            {filteredItems.map((item, index) => (
              <li key={index}>
                {item.name}: {item.textureName} - ${item.price}
              </li>
            ))}
          </ul>
          <h3>Total: ${subtotal}</h3>
        </div>
      )}
    </div>
  );
}
