import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { NewsProvider } from "./context/newsContext.tsx";

createRoot(document.getElementById("root")!).render(
  <NewsProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </NewsProvider>
);
