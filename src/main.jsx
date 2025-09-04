import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

// Global styles (same class names as your HTML)
import "./styles/style-title.css";
import "./styles/style-mid.css";
import "./styles/style-about.css";
import "./styles/style-footer.css";
import "./styles/style-ani.css";
import "./styles/style-contact.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
