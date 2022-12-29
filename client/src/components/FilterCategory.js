import React, { useState } from "react";

function FilterCategory({ category, items, changeFilters }) {
  let filters = items.filter((item) => item.type === category);

  return (
    <div className="form-control py-4 w-56 h-full">
      {filters.map((item) => (
        <label
          className="label cursor-pointer px-12 border-b border-base-300"
          key={item.id}
        >
          <span className="label-text px-4 capitalize">{item.value}</span>
          <input
            className="checkbox checkbox-sm checkbox-primary border "
            type="checkbox"
            name={category}
            checked={item.isChecked}
            onChange={() => changeFilters(item.id)}
          />
        </label>
      ))}
    </div>
  );
}

export default FilterCategory;
