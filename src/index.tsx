import "reflect-metadata";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import sqliteParams from "./orm/sqliteParams";
import { defineJeepSqlEl } from "./orm/jeepSqlEl";
import App from "./App";
import { initializeDataSources } from "./orm/utilities";

import "./styles.css";

function createErrorMessage() {
  const errorDiv = document.createElement("div");
  errorDiv.classList.add(
    "bg-red-100",
    "border",
    "border-red-400",
    "text-red-700",
    "px-4",
    "py-3",
    "rounded",
    "relative",
    "my-[100px]",
    "mx-2"
  );
  errorDiv.setAttribute("role", "alert");

  const strong = document.createElement("strong");
  strong.classList.add("font-bold");
  strong.textContent = "Error:";
  errorDiv.appendChild(strong);

  const span = document.createElement("span");
  span.classList.add("block", "sm:inline");
  span.textContent =
    "Something went wrong while initializing the database connection.";
  errorDiv.appendChild(span);

  return errorDiv;
}

const rootRender = async () => {
  const container = document.getElementById("root");
  try {
    await initializeDataSources();

    const root = createRoot(container!);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } catch (e) {
    throw new Error(`Error: ${e}`);
  }
};

if (sqliteParams.platform !== "web") {
  rootRender();
} else {
  window.addEventListener("DOMContentLoaded", async () => {
    defineJeepSqlEl()
      .then(async () => {
        await sqliteParams.connection.initWebStore();
        rootRender();
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
        document.getElementById("root")?.appendChild(createErrorMessage());
      });
  });
}
