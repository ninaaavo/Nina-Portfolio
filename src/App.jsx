import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import Animation from "./pages/Animation.jsx";
import Illustration from "./pages/Illustration.jsx";
import Model3D from "./pages/Model3D.jsx";
import Contact from "./pages/Contact.jsx";
import WebProjects from "./pages/WebProjects.jsx";

export default function App() {
  const location = useLocation();
  const showGlobalNav = location.pathname !== "/"; // hide on Home

  return (
    <>
      {showGlobalNav && (
        <header id="site-nav">
          <NavBar />
        </header>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/animation" element={<Animation />} />
        <Route path="/illustration" element={<Illustration />} />
        <Route path="/model" element={<Model3D />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/web" element={<WebProjects />} />
      </Routes>

      <Footer />
    </>
  );
}
