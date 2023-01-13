import React from "react";

//
function Modal({ children }) {
  return (
    <div className="_overlay z-50 fixed left-0 top-0 h-screen w-screen bg-slate-700/10 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white/100 sm:w-1/3 w-3/4 p-4 shadow-md rounded absolute top-1/3 ">
        {children}
      </div>
    </div>
  );
}

export default Modal;
