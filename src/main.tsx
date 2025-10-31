import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

//各ページ
import Index from "./pages";

//全体のCSS
import "./index.css";

//リサイズ用ライブラリのCSS
import "react-resizable/css/styles.css";
import MapSetting from "./pages/map-setting";
import Overview from "./pages/overview";

//メニュの開閉状態の管理
import { MenuProvider } from "./context/Menu";

createRoot(document.getElementById("root")!).render(
  <MenuProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/map-setting" element={<MapSetting />} />
        <Route path="/overview" element={<Overview />} />
      </Routes>
    </BrowserRouter>
  </MenuProvider>
);
