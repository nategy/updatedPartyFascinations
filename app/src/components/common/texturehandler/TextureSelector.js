import "./texture.css";
import React, { useState, useCallback } from "react";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";

function TextureSelector({
  selector,
  textures,
  selectedTexture,
  onSelectTexture,
}) {
  const [showTextures, setTextures] = useState(false);

  // Use useCallback to memoize the toggle function to prevent unnecessary re-renders
  const toggleTextures = useCallback(() => {
    setTextures((prevState) => !prevState);
  }, []);

  return (
    <div className='s-wrapper'>
      <div className='header'>
        <h2>{selector}</h2>
        <RiArrowDropDownLine
          className='s-down-arrow'
          onClick={toggleTextures}
          aria-label='Toggle chairrunners'
          style={{
            border:
              textures === selectedTexture
                ? "2px solid #4a90e2"
                : "2px solid transparent",
            cursor: "pointer",
          }}
        />
      </div>

      {showTextures && (
        <div className='s-slider-wrapper'>
          <BsArrowLeftCircleFill
            className='s-arrow'
            aria-label='Previous texture'
          />
          <div className='s-selector'>
            {textures.map((texture, index) => (
              <div key={index} className='texture-option'>
                <button
                  className='s-btn'
                  onClick={() => onSelectTexture(texture)}
                  aria-label={`Select texture ${index + 1}`}
                >
                  <img src={texture.src} alt={`Texture ${index + 1}`} />
                </button>
                <p className='texture-price'>${texture.price}</p>
              </div>
            ))}
          </div>
          <BsArrowRightCircleFill
            className='s-arrow'
            aria-label='Next texture'
          />
        </div>
      )}
    </div>
  );
}

export default TextureSelector;
