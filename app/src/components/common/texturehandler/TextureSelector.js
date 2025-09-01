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

  const updateScrollButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const scrollLeft = el.scrollLeft;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    const margin = 5;

    setCanScrollLeft(scrollLeft > margin);
    setCanScrollRight(scrollLeft < maxScrollLeft - margin);
    setIsCentered(el.scrollWidth <= el.clientWidth);
  }, []);

  const scrollLeftFunc = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -150, behavior: "smooth" });
      setTimeout(updateScrollButtons, 200);
    }
  };

  const scrollRightFunc = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 150, behavior: "smooth" });
      setTimeout(updateScrollButtons, 200);
    }
  };

  useEffect(() => {
    if (showTextures) requestAnimationFrame(updateScrollButtons);
  }, [showTextures, textures, updateScrollButtons]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => updateScrollButtons();
    const handleResize = () => updateScrollButtons();

    el.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [updateScrollButtons]);

  useEffect(() => {
    const imgs = document.querySelectorAll(".texture-option img");
    imgs.forEach((img) => img.addEventListener("load", updateScrollButtons));
    return () => {
      imgs.forEach((img) =>
        img.removeEventListener("load", updateScrollButtons)
      );
    };
  }, [textures, updateScrollButtons]);

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
            onClick={canScrollLeft ? scrollLeftFunc : undefined}
          />

          <div className='s-selector' ref={scrollRef}>
            <div className={`s-inner ${isCentered ? "centered" : ""}`}>
              {textures.map((texture, index) => (
                <div key={index} className='texture-option'>
                  <button
                    className={`s-btn ${
                      selectedTexture === texture.src ? "selected" : ""
                    }`}
                    onClick={() => onSelectTexture(texture)}
                    aria-label={`Select texture ${index + 1}`}
                  >
                    <img src={texture.src} alt={`Texture ${index + 1}`} />
                  </button>

                  {/* Price always visible */}
                  <p className='texture-price'>
                    {texture.price === 0 ? "None" : `$${texture.price}`}
                  </p>

                  {/* Show name only for centerpieces & non-transparent */}
                  {selector === "Centerpieces" &&
                    texture.src !== "transparent.jpg" && (
                      <p className='texture-name'>
                        {texture.name || "Centerpiece"}
                      </p>
                    )}
                </div>
              ))}
            </div>
          </div>

          <BsArrowRightCircleFill
            className={`s-arrow ${!canScrollRight ? "disabled" : ""}`}
            aria-label='Next textures'
            onClick={canScrollRight ? scrollRightFunc : undefined}
          />
        </div>
      )}
    </div>
  );
}

export default TextureSelector;
