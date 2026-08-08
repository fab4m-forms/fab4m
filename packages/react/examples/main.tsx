import * as React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { ThemeProvider } from "./theme";
// Tailwind first so the preflight reset is applied, then the fab4m basic
// theme stylesheet, then the testbed's own page chrome styles.
import "./tailwind.css";
import "@fab4m/fab4m/css/basic/basic.css";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);
