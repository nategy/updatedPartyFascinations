import { useEffect, useState, useMemo } from "react";
import TextureSelector from "./TextureSelector";
import "./tabtexture.css";

const allTabs = [
  { label: "Table Cloths", key: "tableCloth" },
  { label: "Table Runners", key: "tableRunner" },
  { label: "Overlays", key: "overlay" },
  { label: "Chair Covers", key: "chairCover" },
  { label: "Chair Runners", key: "chairRunner" },
  { label: "Chair Clip", key: "chairClip" },
  { label: "Plates", key: "plates" },
  { label: "Curtains (Inner)", key: "innerCurtains" },
  { label: "Curtains (Outer)", key: "outerCurtains" },
  { label: "Centerpieces", key: "centerpiece" },
];

const availableTags = ["modern", "elegant", "rustic", "luxury", "bold"];

const packages = {
  silver: [
    "tableCloth",
    "tableRunner",
    "overlay",
    "innerCurtains",
    "outerCurtains",
  ],
  bronze: [
    "tableCloth",
    "overlay",
    "chairCover",
    "chairRunner",
    "chairClip",
    "innerCurtains",
    "outerCurtains",
    "centerpiece",
  ],
  gold: [
    "tableCloth",
    "tableRunner",
    "overlay",
    "chairCover",
    "chairRunner",
    "chairClip",
    "plates",
    "innerCurtains",
    "outerCurtains",
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

  const allowedTabs = useMemo(
    () => packages[selectedPackage],
    [selectedPackage]
  );

  const filteredTabs = useMemo(
    () => allTabs.filter((tab) => allowedTabs.includes(tab.key)),
    [allowedTabs]
  );

  // Reset active tab if it becomes invalid when package changes
  useEffect(() => {
    const newAllowedTabs = packages[selectedPackage];
    const newFilteredTabs = allTabs.filter((tab) =>
      newAllowedTabs.includes(tab.key)
    );

    if (!newAllowedTabs.includes(activeTab) && newFilteredTabs.length > 0) {
      setActiveTab(newFilteredTabs[0].key);
    }
  }, [selectedPackage, activeTab]);

  const filteredTextures =
    textureConfig[activeTab]?.textures?.filter((tex) =>
      selectedTag === "" ? true : tex.tags.includes(selectedTag)
    ) || [];

  return (
    <div className={`tabbed-panel ${navOpen ? "hide-panel" : ""}`}>
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

      <div className='tab-buttons'>
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
