import React, { useState } from "react";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FilterCategory from "./FilterCategory";
import filtersData from "../Data/filter.json";

function Filter() {
  const [category, setCategory] = useState("priority");
  const [filters, setFilters] = useState(
    filtersData.map((item) => ({ ...item, isChecked: false }))
  );

  const changeFilters = (id) => {
    let index = filters.findIndex((item) => item.id === id);

    let updatedState = [
      ...filters.slice(0, index),
      { ...filters[index], isChecked: !filters[index].isChecked },
      ...filters.slice(index + 1),
    ];
    setFilters(updatedState);
  };

  return (
    <div className="group">
      <button className="btn btn-sm btn-ghost">
        <span className="capitalize font-normal">Filter</span>
      </button>
      {/* drawer */}
      <div className="_overlay h-screen w-full fixed left-0 top-0 z-50 flex justify-end bg-black bg-opacity-40 invisible opacity-0 group-focus-within:visible group-focus-within:opacity-100 transition-opacity duration-100 ease-in">
        <div
          tabIndex="0"
          className="w-3/4 sm:w-1/4 h-screen bg-base-100 translate-x-full group-focus-within:translate-x-0 transition-transform duration-200 ease-in"
        >
          <div className="_header w-full bg-base-200  px-4 py-6 flex justify-between items-center">
            <span>Filters</span>
            <div className="flex space-x-2">
              <button className="btn btn-sm btn-ghost">Apply</button>
              <button className="btn btn-sm btn-ghost">Clear</button>
            </div>
          </div>
          <div className="_body text-sm flex justify-between h-full divide-x divide-base-300">
            <ul className="menu [&>li>*]:flex [&>li>*]:justify-between mt-4">
              <li
                className={`border-l-4 border-base-200 ${
                  category === "priority" ? "border-primary" : ""
                }`}
                onClick={() => setCategory("priority")}
              >
                <a>
                  <span>Priority</span>
                  <span>
                    <FontAwesomeIcon icon={faAngleRight} />
                  </span>
                </a>
              </li>
              <li
                className={`border-l-4 border-base-200   ${
                  category === "status" ? "border-primary" : ""
                }`}
                onClick={() => setCategory("status")}
              >
                <a>
                  <span>Status</span>
                  <span>
                    <FontAwesomeIcon icon={faAngleRight} />
                  </span>
                </a>
              </li>
            </ul>
            <div>
              <FilterCategory
                category={category}
                changeFilters={changeFilters}
                items={filters}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
