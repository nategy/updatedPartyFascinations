import "./chairtexture.css";
import React, { useState } from "react";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";

function ChairRunnerSelector({ textures, selectedTexture, onSelectTexture }) {
  const [click, setClick] = useState(false);
  const [showChairrunners, setChairrunners] = useState(false);
  //Left off here
  const toggleChairrunners = () => setChairrunners(!showChairrunners);
  return (
    <div className='chairunner-wrapper'>
      <h2>
        Chair Runners
        <RiArrowDropDownLine
          className='cr-Darrow'
          onClick={toggleChaircloths}
          style={{
            border:
              textures === selectedTexture
                ? "2px solid blue"
                : "2px solid transparent",
          }}
        />
      </h2>
      {showChairrunners && (
        <div className='crslider-wrapper'>
          <BsArrowLeftCircleFill className='cr-Sarrow' />
          <div className='chairrunner-selector'>
            {textures.map((texture, index) => (
              <button
                className='chairrunner-btn'
                key={index}
                onClick={() => onSelectTexture(texture)}
              >
                <img src={texture} alt='no display found' />
              </button>
            ))}
          </div>
          <BsArrowRightCircleFill className='cr-Sarrow' />
        </div>
      )}
    </div>
  );
}

export default ChairRunnerSelector;
