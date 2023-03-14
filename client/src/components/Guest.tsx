import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./Signup";
import Signin from "./Signin";
import Welcome from "./Welcome";

function PublicResource() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="signup" element={<Signup />} />
        <Route path="signin" element={<Signin />} />
      </Routes>
    </div>
  );
}

export default PublicResource;
