import React, { useState } from "react";
import { FilterType, Status, Priority } from "../types/tickets";

type props = {
  setFilter: (val: FilterType) => void;
};

function Filter({ setFilter }: props) {
  const [priority, setPriority] = useState<Priority[]>([]);
  const [status, setStatus] = useState<Status[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "status":
        if (e.target.checked)
          setStatus((prev) => {
            return [...prev, e.target.value as Status];
          });
        else {
          setStatus((prev) => {
            return [...prev.filter((elem) => elem !== e.target.value)];
          });
        }
        break;
      case "priority":
        if (e.target.checked)
          setPriority((prev) => {
            return [...prev, e.target.value as Priority];
          });
        else {
          setPriority((prev) => {
            return [...prev.filter((elem) => elem !== e.target.value)];
          });
        }
        break;
      default:
        break;
    }
  };

  const applyFilter = () => {
    if (!priority.length && !status.length) setFilter({});
    else if (priority.length && !status.length)
      setFilter({ priority: [...priority] });
    else if (!priority.length && status.length)
      setFilter({ status: [...status] });
    else setFilter({ priority: [...priority], status: [...status] });
  };

  const clearFilter = () => {
    setPriority([]);
    setStatus([]);
    setFilter({});
  };

  return (
    <div className="group">
      <button className="btn btn-sm btn-ghost">
        <span className="capitalize font-normal">Filter</span>
      </button>
      {/* drawer */}
      <div className="_overlay h-screen w-full fixed left-0 top-0 z-50 flex justify-end bg-black bg-opacity-40 invisible opacity-0 group-focus-within:visible group-focus-within:opacity-100 transition-opacity duration-100 ease-in">
        <div
          tabIndex={0}
          className="w-3/4 sm:w-1/4 h-screen bg-base-100 translate-x-full group-focus-within:translate-x-0 transition-transform duration-200 ease-in"
        >
          <div className="_header w-full bg-base-200  px-4 py-6 flex justify-between items-center">
            <span>Filters</span>
            <div className="flex space-x-2">
              <button className="btn btn-sm btn-ghost" onClick={applyFilter}>
                Apply
              </button>
              <button className="btn btn-sm btn-ghost" onClick={clearFilter}>
                Clear
              </button>
            </div>
          </div>
          <div className="_body p-4 flex justify-around space-x-8">
            <div className="flex flex-col ">
              <h3 className="_status font-medium">Status</h3>
              <ul className="text-md w-28">
                <li>
                  <label className="label cursor-pointer">
                    <span className="label-text capitalize">Open</span>
                    <input
                      className="checkbox checkbox-sm checkbox-primary border "
                      type="checkbox"
                      name="status"
                      value="open"
                      checked={status.includes("open")}
                      onChange={handleChange}
                    />
                  </label>
                </li>
                <li>
                  <label className="label cursor-pointer">
                    <span className="label-text capitalize">Closed</span>
                    <input
                      className="checkbox checkbox-sm checkbox-primary border "
                      type="checkbox"
                      name="status"
                      value="closed"
                      checked={status.includes("closed")}
                      onChange={handleChange}
                    />
                  </label>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="_status font-medium">Priority</h3>
              <ul className="text-md w-28">
                <li>
                  <label className="label cursor-pointer">
                    <span className="label-text capitalize">Low</span>
                    <input
                      className="checkbox checkbox-sm checkbox-primary border "
                      type="checkbox"
                      name="priority"
                      value="low"
                      checked={priority.includes("low")}
                      onChange={handleChange}
                    />
                  </label>
                </li>
                <li>
                  <label className="label cursor-pointer">
                    <span className="label-text capitalize">Medium</span>
                    <input
                      className="checkbox checkbox-sm checkbox-primary border "
                      type="checkbox"
                      name="priority"
                      value="medium"
                      checked={priority.includes("medium")}
                      onChange={handleChange}
                    />
                  </label>
                </li>
                <li>
                  <label className="label cursor-pointer">
                    <span className="label-text capitalize">High</span>
                    <input
                      className="checkbox checkbox-sm checkbox-primary border "
                      type="checkbox"
                      name="priority"
                      value="high"
                      checked={priority.includes("high")}
                      onChange={handleChange}
                    />
                  </label>
                </li>
              </ul>
            </div>
            {/* 
            <ul className="menu [&>li>*]:flex [&>li>*]:justify-between mt-4">
              <li>
                <a>
                  <span>Priority</span>
                  <span>
                    <FontAwesomeIcon icon={faAngleRight} />
                  </span>
                </a>
              </li>
              <li>
                <a>
                  <span>Status</span>
                  <span>
                    <FontAwesomeIcon icon={faAngleRight} />
                  </span>
                </a>
              </li>
            </ul>
            <div>
              <div className="_status form-control py-4 w-56 h-full">
                <label className="label cursor-pointer px-12 border-b border-base-300">
                  <span className="label-text px-4 capitalize">Open</span>
                  <input
                    className="checkbox checkbox-sm checkbox-primary border "
                    type="checkbox"
                    name="status"
                    checked={false}
                  />
                </label>
                <label className="label cursor-pointer px-12 border-b border-base-300">
                  <span className="label-text px-4 capitalize">Closed</span>
                  <input
                    className="checkbox checkbox-sm checkbox-primary border "
                    type="checkbox"
                    name="status"
                    checked={false}
                  />
                </label>
              </div>
              <div className="_priority form-control py-4 w-56 h-full">
                <label className="label cursor-pointer px-12 border-b border-base-300">
                  <span className="label-text px-4 capitalize">Low</span>
                  <input
                    className="checkbox checkbox-sm checkbox-primary border "
                    type="checkbox"
                    name="priority"
                    checked={false}
                  />
                </label>
                <label className="label cursor-pointer px-12 border-b border-base-300">
                  <span className="label-text px-4 capitalize">Medium</span>
                  <input
                    className="checkbox checkbox-sm checkbox-primary border "
                    type="checkbox"
                    name="priority"
                    checked={false}
                  />
                </label>
                <label className="label cursor-pointer px-12 border-b border-base-300">
                  <span className="label-text px-4 capitalize">High</span>
                  <input
                    className="checkbox checkbox-sm checkbox-primary border "
                    type="checkbox"
                    name="priority"
                    checked={false}
                  />
                </label>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
