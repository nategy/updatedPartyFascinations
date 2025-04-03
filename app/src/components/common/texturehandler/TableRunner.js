import "./texture.css";
import React, { useState } from "react";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";

function TableRunnerSelector({
  textures,
  selectedTableRunnerTexture,
  onSelectTexture,
}) {
  const [click, setClick] = useState(false);
  const [showTablerunners, setTablerunners] = useState(false);
  //Left off here
  const tablerunners = () => setTablerunners(!showTablerunners);
  return (
    <div className='s-wrapper'>
      <h2>
        Table Runners
        <RiArrowDropDownLine
          className='s-down-arrow'
          onClick={tablerunners}
          style={{
            border:
              textures === selectedTableRunnerTexture
                ? "2px solid blue"
                : "2px solid transparent",
          }}
        />
      </h2>
      {showTablerunners && (
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

export default TableRunnerSelector;
