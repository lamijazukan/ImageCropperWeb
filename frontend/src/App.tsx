import { HashRouter as Router, Routes, Route } from "react-router-dom";
import ImageUpload from "./components/ImageUpload";
import CropView from "./components/Crop/CropView";
import Navbar from "./components/NavBar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ImageUpload />} />
        <Route path="/upload" element={<ImageUpload />} />
        <Route path="/crop" element={<CropView />} />
      </Routes>
    </Router>
  );
}

export default App;
