import { useEffect, useState } from "react";
import TextureSelector from "./TextureSelector";

import "./tabtexture.css";

const allTabs = [
  { label: "Table Cloths", key: "tableCloth" },
  { label: "Table Runners", key: "tableRunner" },
  { label: "Chair Covers", key: "chairCover" },
  { label: "Chair Runners", key: "chairRunner" },
  { label: "Plates", key: "plate" },
];

const packages = {
  silver: ["tableCloth", "chairCover", "chairRunner"],
  bronze: ["tableCloth", "tableRunner", "plate"],
  gold: ["tableCloth", "tableRunner", "plate", "chairCover", "chairRunner"],
};

export default function TabbedTexturePanel({
  textureConfig,
  navOpen, // object with texture props for each category
  selectedPackage,
  setSelectedPackage,
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
      <div
        className='package-selector'
        style={{ marginBottom: "12px", textAlign: "center" }}
      >
        <label
          htmlFor='package'
          style={{ marginRight: "8px", fontWeight: "bold" }}
        >
          Select Package:
        </label>
        <select
          id='package'
          value={selectedPackage}
          onChange={handlePackageChange}
          style={{
            padding: "6px 10px",
            borderRadius: "6px",
            border: "1px solid #c3aee3",
            backgroundColor: "#f9f5fc",
          }}
        >
          <option value='silver'>Silver Package</option>
          <option value='bronze'>Bronze Package</option>
          <option value='gold'>Gold Package</option>
        </select>
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
            selector={filteredTabs.find((t) => t.key === activeTab).label}
            {...textureConfig[activeTab]}
          />
        )}
      </div>
    </div>
  );
}
