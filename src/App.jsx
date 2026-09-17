import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Societies from "./pages/Societies";
import Navbar from "./components/Navbar";
import SocietyDetails from "./pages/SocietyDetails";
import Apply from "./pages/Apply";
import Applications from "./pages/Applications";
import FindYourFit from "./pages/FindYourFit";
import Events from "./pages/Events";
import QuickSearchModal from "./components/QuickSearchModal";
import ScrollToTop from "./utils/ScrollToTop";
import Footer from "./components/Footer";

function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark",
  );
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const isApplyPage = location.pathname.startsWith("/apply");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  return (
    <>
      <ScrollToTop />
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenSearch={() => setIsSearchOpen(true)}
      />
      <main className="app-main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/societies" element={<Societies />} />
          <Route path="/society/:id" element={<SocietyDetails />} />
          <Route path="/apply/:id" element={<Apply />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/find-your-fit" element={<FindYourFit />} />
          <Route path="/FindYourFit" element={<FindYourFit />} />
          <Route path="/events" element={<Events />} />
          <Route path="/Events" element={<Events />} />
        </Routes>
      </main>

      {!isApplyPage && <Footer onOpenSearch={() => setIsSearchOpen(true)} />}

      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}

export default App;
