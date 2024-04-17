import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from react-dom/client
import App from "./App.jsx";
import "./index.css";
import { DataProvider } from "./Componenet/DataProvider/DataProvider.jsx";
import { initialState, reducer } from "./Utility/reducer.js";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DataProvider reducer={reducer} initialState={initialState}>
      <App />
    </DataProvider>
  </React.StrictMode>
);
