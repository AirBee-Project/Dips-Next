import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

//各ページ
import Index from "./pages";

//全体のCSS
import "./index.css";

//リサイズ用ライブラリのCSS
import "react-resizable/css/styles.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
    </Routes>
  </BrowserRouter>
);
