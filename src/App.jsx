import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Societies from "./pages/Societies";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/societies" element={<Societies />} />
      </Routes>
    </>
  );
}

export default App;
