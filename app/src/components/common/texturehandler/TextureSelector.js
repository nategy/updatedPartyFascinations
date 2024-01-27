import "./texture.css";
import React, { useState } from "react";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";

function TextureSelector({ textures, selectedTexture, onSelectTexture }) {
  const [click, setClick] = useState(false);
  const [showTablecloths, setTablecloths] = useState(false);
  //Left off here
  const toggleTablecloths = () => setTablecloths(!showTablecloths);
  return (
    <div className='tablecloth-wrapper'>
      <h2>
        Tablecloths
        <RiArrowDropDownLine
          className='tc-Darrow'
          onClick={toggleTablecloths}
          style={{
            border:
              textures === selectedTexture
                ? "2px solid blue"
                : "2px solid transparent",
          }}
        />
      </h2>
      {showTablecloths && (
        <div className='tcslider-wrapper'>
          <BsArrowLeftCircleFill className='tc-Sarrow' />
          <div className='tablecloth-selector'>
            {textures.map((texture, index) => (
              <button
                className='tablecloth-btn'
                key={index}
                onClick={() => onSelectTexture(texture)}
              >
                <img src={texture} alt='no display found' />
              </button>
            ))}
          </div>
          <BsArrowRightCircleFill className='tc-Sarrow' />
        </div>
      )}
    </div>
  );
}

export default TextureSelector;
