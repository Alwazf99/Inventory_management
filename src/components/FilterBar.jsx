import React from "react";

const FilterBar = ({ categories, setFilteredCategory, setSortOrder }) => {
  return (
    <div className="filter-bar">
      <select onChange={(e) => setFilteredCategory(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
      <select onChange={(e) => setSortOrder(e.target.value)}>
        <option value="asc">Sort by Quantity: Ascending</option>
        <option value="desc">Sort by Quantity: Descending</option>
      </select>
    </div>
  );
};

export default FilterBar;
