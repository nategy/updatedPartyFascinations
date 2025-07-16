import { useState, useEffect, useRef, useCallback } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";
import "./texture.css";

function TextureSelector({
  selector,
  textures,
  selectedTexture,
  onSelectTexture,
}) {
  const [showTextures, setShowTextures] = useState(false);
  const [isCentered, setIsCentered] = useState(false);

  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const toggleTextures = useCallback(() => {
    setShowTextures((prev) => !prev);
  }, []);

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;

    const scrollLeft = el.scrollLeft;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;

    // Allow margin of ~5px
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft < maxScrollLeft - 5);
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current?.scrollBy({ left: -150, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current?.scrollBy({ left: 150, behavior: "smooth" });
    }
  };

  const checkCenter = () => {
    const el = scrollRef.current;
    if (!el) return;
    setIsCentered(el.scrollWidth <= el.clientWidth);
  };

  useEffect(() => {
    updateScrollButtons();
    checkCenter();
  }, [textures]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let debounceTimeout = null;

    const handleScroll = () => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(updateScrollButtons, 100);
    };

    el.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", checkCenter);

    return () => {
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkCenter);
      clearTimeout(debounceTimeout);
    };
  }, []);

  useEffect(() => {
    if (showTextures) {
      setTimeout(() => {
        updateScrollButtons();
        checkCenter();
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
          aria-label='Toggle textures'
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
            <div className={`s-inner ${isCentered ? "centered" : ""}`}>
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
