import "./chairtexture.css";
import React, { useState } from "react";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";

function ChairCoverSelector({ textures, selectedTexture, onSelectTexture }) {
  const [click, setClick] = useState(false);
  const [showChaircloths, setChaircloths] = useState(false);
  //Left off here
  const toggleChaircloths = () => setChaircloths(!showChaircloths);
  return (
    <div className='chaircloth-wrapper'>
      <h2>
        Chair Cloths
        <RiArrowDropDownLine
          className='cc-Darrow'
          onClick={toggleChaircloths}
          style={{
            border:
              textures === selectedTexture
                ? "2px solid blue"
                : "2px solid transparent",
          }}
        />
      </h2>
      {showChaircloths && (
        <div className='ccslider-wrapper'>
          <BsArrowLeftCircleFill className='cc-Sarrow' />
          <div className='chaircloth-selector'>
            {textures.map((texture, index) => (
              <button
                className='chaircloth-btn'
                key={index}
                onClick={() => onSelectTexture(texture)}
              >
                <img src={texture} alt='no display found' />
              </button>
            ))}
          </div>
          <BsArrowRightCircleFill className='cc-Sarrow' />
        </div>
      )}
    </div>
  );
}

export default ChairCoverSelector;
