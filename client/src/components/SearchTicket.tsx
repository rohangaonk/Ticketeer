import React, { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import { FilterType } from "../types/tickets";

type props = {
  setFilter: (val: FilterType) => void;
  search: string;
  setSearch: (val: string) => void;
};

function SearchTicket({ setFilter, search, setSearch }: props) {
  const debouncedVal = useDebounce(search);

  useEffect(() => {
    if (debouncedVal) setFilter({ search: debouncedVal });
  }, [debouncedVal]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
