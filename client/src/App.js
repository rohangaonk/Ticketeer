import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/wrappers/ProtectedRoute";
import PublicRoutes from "./components/wrappers/PublicRoutes";
import Navbar from "./components/Navbar";

import Home from "./components/Home";
import Guest from "./components/Guest";

function App() {
  const [dark, setDark] = useState(() => {
    return (
      localStorage.getItem("theme") && localStorage.getItem("theme") === "dark"
    );
  });
  useEffect(() => {
    if (dark) document.body.setAttribute("data-theme", "night");
    else document.body.setAttribute("data-theme", "cmyk");
  }, [dark]);

  return (
    <div className={`font-inter h-full ${dark ? "dark" : ""}`}>
      <div className="w-full h-20 fixed top-0 z-20">
        <Navbar dark={dark} setDark={setDark} />
      </div>
      <Routes>
        <Route
          path="/auth/*"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/*"
          element={
            <PublicRoutes>
              <Guest />
            </PublicRoutes>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
