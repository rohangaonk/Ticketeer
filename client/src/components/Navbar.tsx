import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./ui-components/Logo";
import { useAuthContext } from "../hooks/useAuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, faBars } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";
import Profile from "./Profile";

type props = {
  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
};

function Navbar({ dark, setDark }: props) {
  const { user } = useAuthContext();
  const handleDarkMode = () => {
    setDark((prevMode) => {
      if (prevMode) localStorage.setItem("theme", "light");
      else localStorage.setItem("theme", "dark");
      return !prevMode;
    });
  };
  return (
    <div className="bg-base-200 h-full flex justify-between px-4 py-4 sm:px-12">
      <div className="flex items-center space-x-2  ">
        <Logo />
      </div>

      <div className="flex items-center space-x-1 sm:space-x-12 [&>*]:cursor-pointer">
        {user ? (
          <Profile />
        ) : (
          <button className="btn btn-primary btn-sm normal-case">
            <Link to={"/signin"}>Sign In</Link>
          </button>
        )}

        {dark ? (
          <button className="btn btn-ghost " onClick={handleDarkMode}>
            <FontAwesomeIcon icon={faMoon} size="lg" />
          </button>
        ) : (
          <button className="btn btn-ghost" onClick={handleDarkMode}>
            <FontAwesomeIcon icon={faSun} size="lg" />
          </button>
        )}
        <div className="group sm:hidden">
          <button className="btn btn-ghost">
            <FontAwesomeIcon icon={faBars} size="lg" />
          </button>
          <nav
            tabIndex={0}
            className="fixed h-screen left-0 top-0 -translate-x-60 group-focus-within:translate-x-0  transition-transform duration-200 ease-in"
          >
            <Sidebar />
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
