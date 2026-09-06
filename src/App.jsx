import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Societies from "./pages/Societies";
import Navbar from "./components/Navbar";
import SocietyDetails from "./pages/SocietyDetails";
import Apply from "./pages/Apply";
import Applications from "./pages/Applications";

function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark",
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/societies" element={<Societies />} />
        <Route path="/society/:id" element={<SocietyDetails />} />
        <Route path="/apply/:id" element={<Apply />} />
        <Route path="/applications" element={<Applications />} />
      </Routes>
    </>
  );
}

export default App;
