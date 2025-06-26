
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Set default theme to dark mode for better UX
if (!localStorage.getItem('portfolio-theme')) {
  localStorage.setItem('portfolio-theme', 'dark');
}

// Optimized root rendering
const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error("Root element not found");
}
