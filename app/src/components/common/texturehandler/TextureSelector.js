import React from "react";

function TextureSelector({ textures, selectedTexture, onSelectTexture }) {
  return (
    <div>
      <h2>Select Texture:</h2>
      <div>
        {textures.map((texture, index) => (
          <button
            key={index}
            onClick={() => onSelectTexture(texture)}
            style={{
              border:
                texture === selectedTexture
                  ? "2px solid blue"
                  : "2px solid transparent",
            }}
          >
            Texture {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TextureSelector;
