import React from "react";

function Modal({ children }) {
  return (
    <div>
      <div className="_overlay z-50 fixed left-0 top-0 h-screen w-screen bg-gray-600 opacity-90 flex justify-center items-center"></div>
      <div className="z-50 fixed left-0 top-0 h-screen w-screen flex justify-center items-center">
        <div className="bg-white sm:w-1/3 w-3/4 p-4 shadow-md rounded shadow-stone-500 absolute top-1/3">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;

{
  /* <div className="absolute z-50">
<div className="_overlay fixed left-0 top-0 h-screen w-screen bg-gray-500 opacity-70"></div>
<div className="fixed left-0 right-0 mx-auto bg-white">
  <h1>Do you want to continue?</h1>
  <p>
    Ticket is in closed state. Editing will lead to reopening of the
    ticket.asdfsadfasdfasdf
  </p>
</div>
</div> */
}
