import sqliteParams from "./sqliteParams";
import { JeepSqlite } from "jeep-sqlite/dist/components/jeep-sqlite";

export async function defineJeepSqlEl() {
  if (sqliteParams.platform !== "web") {
    return;
  }
  if (customElements.get("jeep-sqlite") !== undefined) {
    return;
  }
  customElements.define("jeep-sqlite", JeepSqlite);
  const JeepSqliteEl = document.createElement("jeep-sqlite");
  JeepSqliteEl.buttonOptions =
    '{"backgroundColor":"#fb2a2a", "top":"70%","fontSize":"1.1em"}';
  JeepSqliteEl.setAttribute("autoSave", "true");
  JeepSqliteEl.setAttribute("wasmPath", "/wasm");
  document.body.appendChild(JeepSqliteEl);
  await customElements.whenDefined("jeep-sqlite");
  console.log("JeepSqliteEl defined");
}
