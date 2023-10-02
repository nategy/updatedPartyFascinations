import React from "react";
import { useState } from "react";

function Subtotal() {
  const [open, setOpen] = useState(false);
  return (
    <div className='subtotal-wrapper'>
      <div className={open ? "subtotal open" : "subtotal"}>
        <div className='subtotal-header'>
          <span>subtotal</span>
          <i
            className='bi bi-arrow-right-short toggle-btn'
            onClick={() => setOpen(!open)}
          ></i>
        </div>
        <div className='subtotal-content'>
          <div>testing</div>
        </div>
      </div>
    </div>
  );
}

export default Subtotal;
