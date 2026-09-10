import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

// StrictMode is intentionally omitted: react-three-fiber's Canvas + the
// space-game module singleton do not survive StrictMode's dev double-mount
// cleanly. The router lifecycle is handled explicitly in PlayPage instead.
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
