import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { LiveCursorsLayer } from "./realtime/LiveCursorsLayer";
import { LiveCursorsProvider } from "./realtime/LiveCursorsProvider";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LiveCursorsProvider>
      <BrowserRouter>
        <LiveCursorsLayer />
        <App />
      </BrowserRouter>
    </LiveCursorsProvider>
  </React.StrictMode>,
);
