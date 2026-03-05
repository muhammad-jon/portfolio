import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { LiveCursorLayer } from "./realtime/LiveCursorLayer";
import { LiveCursorProvider } from "./realtime/LiveCursorProvider";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LiveCursorProvider>
      <BrowserRouter>
        <LiveCursorLayer />
        <App />
      </BrowserRouter>
    </LiveCursorProvider>
  </React.StrictMode>,
);
