import { useEffect, useState, useRef, useMemo } from "react";
import TextureSelector from "./TextureSelector,js";
import "./tabtexture.css";

const allTabs = [
  { label: "Table Cloths", key: "tableCloth" },
  { label: "Table Runners", key: "tableRunner" },
  { label: "Overlays", key: "tableOverlay" },
  { label: "Chiavari Chairs", key: "chiavari" },
  { label: "Chair Covers", key: "chairCover" },
  { label: "Chair Runners", key: "chairRunner" },
  { label: "Chair Clip", key: "chairClip" },
  { label: "Plates", key: "plates" },
  { label: "Curtains (Inner)", key: "innerCurtains" },
  { label: "Curtains (Outer)", key: "outerCurtains" },
  { label: "Drapes", key: "drape" },
  { label: "Centerpieces", key: "centerpiece" },
];

const availableTags = ["sequin"];

const packages = {
  silver: [
    "tableCloth",
    "tableRunner",
    "tableOverlay",
    "chiavari",
    "innerCurtains",
    "outerCurtains",
    "drape",
  ],
  bronze: [
    "tableCloth",
    "tableOverlay",
    "chiavari",
    "chairCover",
    "chairRunner",
    "chairClip",
    "innerCurtains",
    "outerCurtains",
    "drape",
    "centerpiece",
  ],
  gold: [
    "tableCloth",
    "tableRunner",
    "tableOverlay",
    "chiavari",
    "chairCover",
    "chairRunner",
    "chairClip",
    "plates",
    "innerCurtains",
    "outerCurtains",
    "drape",
    "centerpiece",
  ],
};

export default function TabbedTexturePanel({
  navOpen,
  selectedPackage,
  setSelectedPackage,
  textureConfig,
}) {
  const [activeTab, setActiveTab] = useState("tableCloth");
  const [selectedTag, setSelectedTag] = useState("");
  const tabsRef = useRef();

  const allowedTabs = useMemo(
    () => packages[selectedPackage],
    [selectedPackage]
  );
  const filteredTabs = useMemo(
    () => allTabs.filter((tab) => allowedTabs.includes(tab.key)),
    [allowedTabs]
  );

  const scrollTabs = (direction) => {
    if (tabsRef.current) {
      const { clientWidth } = tabsRef.current;
      tabsRef.current.scrollBy({
        left: direction * clientWidth * 0.8,
        behavior: "smooth",
      });
    }
  };

  // Keep active tab valid when package changes
  useEffect(() => {
    if (!allowedTabs.includes(activeTab) && filteredTabs.length > 0) {
      setActiveTab(filteredTabs[0].key);
    }
  }, [allowedTabs, activeTab, filteredTabs]);

  // ---- NEW: handle centering vs scrolling and prevent first-tab cutoff ----
  useEffect(() => {
    const el = tabsRef.current;
    if (!el) return;

    const update = () => {
      const overflows = el.scrollWidth > el.clientWidth + 1;
      // Toggle class so CSS can switch between centered and left-aligned
      el.classList.toggle("scrollable", overflows);

      // If it just became scrollable (or on resize), make sure we show the first tab fully
      if (overflows && el.scrollLeft !== 0) {
        el.scrollLeft = 0;
      }
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [filteredTabs.length]); // re-check when the number of tabs changes
  // ------------------------------------------------------------------------

  const filteredTextures =
    textureConfig[activeTab]?.textures?.filter((tex) =>
      selectedTag === "" ? true : tex.tags.includes(selectedTag)
    ) || [];

  return (
    <div className={`tabbed-panel ${navOpen ? "hide-panel" : ""}`}>
      {/* Package & Tag Selectors */}
      <div className='selectors-row'>
        <div className='package-selector'>
          <label htmlFor='package'>Select Package:</label>
          <select
            id='package'
            value={selectedPackage}
            onChange={(e) => setSelectedPackage(e.target.value)}
          >
            <option value='silver'>Silver Package</option>
            <option value='bronze'>Bronze Package</option>
            <option value='gold'>Gold Package</option>
          </select>
        </div>

        <div className='tag-selector'>
          <label htmlFor='tags'>Filter Style:</label>
          <select
            id='tags'
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
          >
            <option value=''>All</option>
            {availableTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tab Buttons */}
      <div className='tab-buttons-wrapper'>
        <button className='scroll-btn left' onClick={() => scrollTabs(-1)}>
          &lt;
        </button>

        <div
          className={`tab-buttons ${
            filteredTabs.length <= 4 ? "center-tabs" : ""
          }`}
          ref={tabsRef}
        >
          {filteredTabs.map(({ label, key }) => (
            <button
              key={key}
              className={`tab-btn ${activeTab === key ? "active" : ""}`}
              onClick={() => setActiveTab(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <button className='scroll-btn right' onClick={() => scrollTabs(1)}>
          &gt;
        </button>
      </div>

      {/* Texture Selector */}
      <div className='tab-content'>
        {textureConfig[activeTab] && (
          <TextureSelector
            selector={filteredTabs.find((t) => t.key === activeTab)?.label}
            textures={filteredTextures}
            selectedTexture={textureConfig[activeTab].selectedTexture}
            onSelectTexture={textureConfig[activeTab].onSelectTexture}
          />
        )}
      </div>
    </div>
  );
}
