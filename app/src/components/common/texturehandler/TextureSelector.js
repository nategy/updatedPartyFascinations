import "./texture.css";
import { useState, useEffect, useRef, useCallback } from "react";
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

  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Use useCallback to memoize the toggle function to prevent unnecessary re-renders
  const toggleTextures = useCallback(() => {
    setTextures((prevState) => !prevState);
  }, []);

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    updateScrollButtons();
  }, [textures]); // run when textures are shown

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -100, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 100, behavior: "smooth" });
    }
  };

  // Listen for scroll events to update button states
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollButtons);
    return () => el.removeEventListener("scroll", updateScrollButtons);
  }, []);

  useEffect(() => {
    const handleResize = () => updateScrollButtons();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (showTextures) {
      setTimeout(() => {
        updateScrollButtons();
      }, 100);
    }
  }, [showTextures]);

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
            className={`s-arrow ${!canScrollLeft ? "disabled" : ""}`}
            aria-label='Previous textures'
            onClick={canScrollLeft ? scrollLeft : undefined}
          />
          <div className='s-selector' ref={scrollRef}>
            {textures.map((texture, index) => (
              <div key={index} className='texture-option'>
                <button
                  className='s-btn'
                  onClick={() => onSelectTexture(texture.src)}
                  aria-label={`Select texture ${index + 1}`}
                >
                  <img src={texture.src} alt={`Texture ${index + 1}`} />
                </button>
                <p className='texture-price'>${texture.price}</p>
              </div>
            ))}
          </div>
          <BsArrowRightCircleFill
            className={`s-arrow ${!canScrollRight ? "disabled" : ""}`}
            aria-label='Next textures'
            onClick={canScrollRight ? scrollRight : undefined}
          />
        </div>
      )}
    </div>
  );
}

export default TextureSelector;
