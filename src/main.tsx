
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Set default theme to light mode
if (!localStorage.getItem('vite-ui-theme')) {
  localStorage.setItem('vite-ui-theme', 'light');
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
