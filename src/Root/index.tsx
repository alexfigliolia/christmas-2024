import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Preloader } from "Tools/Preloader.ts";
import { App } from "./App.tsx";
import "Styles/Reset.scss";

void Preloader.preload();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
