import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Index from "./pages";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
    </Routes>
  </BrowserRouter>
);
