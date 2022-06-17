import React from "react";

export default function AutoComplete({
  searchTerm,
  handleChange,
  suggestions,
  handleSuggest,
}) {
  return (
    <div >
      <div className="input-wrapper">
        <input
          type="text"
          name="camper"
          id="camper"
          value={searchTerm}
          onChange={(e) => handleChange(e.target.value)}
          className="search-input"
          placeholder="Enter station name"
        />
      </div>
      {suggestions &&
        suggestions.map((suggestion) => (
          <div
            className=""
            key={suggestion.id}
            onClick={() => handleSuggest(suggestion.name)}
          >
            {suggestion.name}
          </div>
        ))}
    </div>
  );
}
