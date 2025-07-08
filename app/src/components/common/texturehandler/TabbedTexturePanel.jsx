import { useEffect, useState } from "react";
import TextureSelector from "./TextureSelector";
import FilterHandler from "../filter/FilterHandler";

import "./tabtexture.css";

const allTabs = [
  { label: "Table Cloths", key: "tableCloth" },
  { label: "Table Runners", key: "tableRunner" },
  { label: "Chair Covers", key: "chairCover" },
  { label: "Chair Runners", key: "chairRunner" },
  { label: "Plates", key: "plate" },
];

const packages = {
  silver: ["tableCloth", "tableRunner"],
  bronze: ["tableCloth", "chairCover", "chairRunner"],
  gold: ["tableCloth", "tableRunner", "chairCover", "chairRunner", "plate"],
};

export default function TabbedTexturePanel({
  navOpen,
  selectedPackage,
  setSelectedPackage,
  textureConfig,
}) {
  const [activeTab, setActiveTab] = useState("tableCloth");

  const allowedTabs = packages[selectedPackage];
  const filteredTabs = allTabs.filter((tab) => allowedTabs.includes(tab.key));

  useEffect(() => {
    if (!allowedTabs.includes(activeTab) && filteredTabs.length > 0) {
      setActiveTab(filteredTabs[0].key);
    }
  }, [allowedTabs, activeTab, filteredTabs]);

  const handlePackageChange = (e) => {
    setSelectedPackage(e.target.value);
  };

  return (
    <div className={`tabbed-panel ${navOpen ? "hide-panel" : ""}`}>
      <div className='package-selector'>
        <label htmlFor='package'>Select Package:</label>
        <select
          id='package'
          value={selectedPackage}
          onChange={handlePackageChange}
        >
          <option value='silver'>Silver Package</option>
          <option value='bronze'>Bronze Package</option>
          <option value='gold'>Gold Package</option>
        </select>
      </div>

      {textureConfig[activeTab] && (
        <div className='filter-wrapper'>
          <FilterHandler
            selectedTags={textureConfig[activeTab].selectedTags}
            setSelectedTags={textureConfig[activeTab].setSelectedTags}
          />
        </div>
      )}

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
            selector={filteredTabs.find((t) => t.key === activeTab).label}
            {...textureConfig[activeTab]}
          />
        )}
      </div>
    </div>
  );
}
