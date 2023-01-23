import React, { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function SearchTicket({ setFilter, search, setSearch }) {
  const debouncedVal = useDebounce(search);

  useEffect(() => {
    if (debouncedVal) setFilter({ search: debouncedVal });
  }, [debouncedVal]);

  const handleChange = (event) => {
    const { value: nextValue } = event.target;
    setSearch(nextValue);
  };

  return (
    <div className="form-control">
      <input
        type="text"
        name="search"
        onChange={handleChange}
        value={search}
        placeholder="Search…"
        className="input input-sm input-primary w-full  max-w-xs"
      />
    </div>
  );
}

export default SearchTicket;
