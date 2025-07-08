import React from "react";
import "./filter.css";

const availableTags = ["modern", "elegant", "rustic", "luxury", "bold"];

function FilterHandler({ selectedTags, setSelectedTags }) {
  const handleTagChange = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className='filter-container'>
      {availableTags.map((tag) => (
        <label key={tag}>
          <input
            type='checkbox'
            checked={selectedTags.includes(tag)}
            onChange={() => handleTagChange(tag)}
          />
          {tag}
        </label>
      ))}
    </div>
  );
}

export default FilterHandler;
