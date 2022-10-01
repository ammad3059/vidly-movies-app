import React from "react";

const SearchBox = ({ value, onSearch }) => {
  return (
    <div>
      <input
        onChange={(e) => {
          onSearch(e.currentTarget.value);
        }}
        value={value}
        className="form-control my-3"
        placeholder="Search.."
      />
    </div>
  );
};

export default SearchBox;
