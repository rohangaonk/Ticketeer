import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";

function Developer() {
  const { user } = useAuthContext();
  return (
    <div className="flex items-center space-x-4 px-4 py-2">
      <a href="#" className="block relative">
        <img
          alt="profil"
          src="/avatar.webp"
          className="mx-auto object-cover rounded-full h-10 w-10 "
        />
      </a>
      <div>
        <p className="text-sm font-medium ">{user.username}</p>
        <p className="text-xs font-medium tracking-wide">Developer</p>
      </div>
    </div>
  );
}

export default Developer;
