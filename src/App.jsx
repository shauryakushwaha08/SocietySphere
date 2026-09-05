import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Societies from "./pages/Societies";
import Navbar from "./components/Navbar";
import SocietyDetails from "./pages/SocietyDetails";
import Apply from "./pages/Apply";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/societies" element={<Societies />} />
        <Route path="/society/:id" element={<SocietyDetails />} />
        <Route path="/apply/:id" element={<Apply />} />
      </Routes>
    </>
  );
}

export default App;
