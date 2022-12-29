import React from "react";
import { Link } from "react-router-dom";

function Welcome() {
  return (
    <div className="pt-20 h-screen flex flex-col justify-center items-center bg-base-300">
      <div className="flex flex-col space-y-6">
        <div>
          <p className="font-bold text-xl">Welcome to Ticketeer</p>
          <p className="text-sm">Your one stop ticket manager</p>
        </div>
        <div>
          <p className="text-sm">Don't have an account?</p>
          <button className="btn btn-secondary btn-md normal-case">
            <Link to="/signup">Sign up</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
