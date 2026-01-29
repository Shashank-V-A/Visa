import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import "./index.css";

const rootEl = document.getElementById("root");
if (!rootEl) {
  document.body.innerHTML = "<p style=\"padding:2rem;font-family:system-ui\">Error: #root element not found. Ensure index.html is served for /.</p>";
} else {
  try {
    createRoot(rootEl).render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    rootEl.innerHTML = "";
    const pre = document.createElement("pre");
    pre.style.cssText = "padding:2rem;white-space:pre-wrap;font-family:monospace";
    pre.textContent = msg;
    rootEl.appendChild(pre);
  }
}
