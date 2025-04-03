import "./texture.css";
import React, { useState } from "react";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";

function ChairCoverSelector({ textures, selectedTexture, onSelectTexture }) {
  const [click, setClick] = useState(false);
  const [showChaircovers, setChaircovers] = useState(false);
  //Left off here
  const toggleChaircovers = () => setChaircovers(!showChaircovers);
  return (
    <div className='s-wrapper'>
      <h2>
        Chair Covers
        <RiArrowDropDownLine
          className='s-down-arrow'
          onClick={toggleChaircovers}
          style={{
            border:
              textures === selectedTexture
                ? "2px solid blue"
                : "2px solid transparent",
          }}
        />
      </h2>
      {showChaircovers && (
        <div className='s-slider-wrapper'>
          <BsArrowLeftCircleFill className='s-arrow' />
          <div className='s-selector'>
            {textures.map((texture, index) => (
              <button
                className='s-btn'
                key={index}
                onClick={() => onSelectTexture(texture)}
              >
                <img src={texture} alt='no display found' />
              </button>
            ))}
          </div>
          <BsArrowRightCircleFill className='s-arrow' />
        </div>
      )}
    </div>
  );
}

export default ChairCoverSelector;
