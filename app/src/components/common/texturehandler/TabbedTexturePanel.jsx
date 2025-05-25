import { useState } from "react";
import TextureSelector from "./TextureSelector";

const tabs = [
  { label: "Table Cloths", key: "tableCloth" },
  { label: "Table Runners", key: "tableRunner" },
  { label: "Chair Covers", key: "chairCover" },
  { label: "Chair Runners", key: "chairRunner" },
];

export default function TabbedTexturePanel({
  textureConfig // object with texture props for each category
}) {
  const [activeTab, setActiveTab] = useState("tableCloth");

  return (
    <div className="tabbed-panel">
      <div className="tab-buttons">
        {tabs.map(({ label, key }) => (
          <button
            key={key}
            className={`tab-btn ${activeTab === key ? "active" : ""}`}
            onClick={() => setActiveTab(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="tab-content">
        <TextureSelector
          selector={tabs.find(t => t.key === activeTab).label}
          {...textureConfig[activeTab]}
        />
      </div>
    </div>
  );
}
