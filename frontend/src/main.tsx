import { createRoot } from "react-dom/client";
import { BrowserRouter, useLocation, Routes, Route } from "react-router";

// 各ページ
import Overview from "./pages/overview";
import MapObject from "./pages/map-object";

// CSS
import "./index.css";
import "react-resizable/css/styles.css";

// メニューの状態管理
import { MenuProvider, useMenu } from "./context/Menu";
import Menu from "./components/common/Menu/Menu";
import { CesiumProvider } from "./context/Map";
import License from "./pages/license";
import Map from "./components/Map/Map";
import MyData from "./pages/my-data";
import { useEffect, useState } from "react";
import { MapObjectProvider } from "./context/MapObjectContext";

/* --- ページラッパー --- */
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fadeIn, setFadeIn] = useState(false);
  useEffect(() => {
    // マウント時にフェードインを開始
    const timeout = setTimeout(() => setFadeIn(true), 0);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <div className={`w-full h-full transition-opacity duration-100 ease-in-out ${fadeIn ? "opacity-100" : "opacity-0"}`}>
      {children}
    </div>
  );
};

/* --- AnimatedRoutes --- */
const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  const isLicensePage = location.pathname === "/license";

  const { isMenuOpen } = useMenu();
  const sidebarWidth = isMenuOpen ? 65 * 4 : 14 * 4;//サイドバー分を左に開けるため

  return (
    <div
      className={
        isLicensePage
          ? "fixed top-0 bottom-0 right-0 z-15 overflow-y-auto transition-[left] duration-500 ease-in-out"
          : "flex-1 relative overflow-hidden"
      }
      style={isLicensePage ? { left: sidebarWidth } : { left: 0 }}
    >
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageWrapper>
              <Overview />
            </PageWrapper>
          }
        />
        <Route
          path="/map-object"
          element={
            <PageWrapper>
              <MapObject />
            </PageWrapper>
          }
        />
        <Route
          path="/my-data"
          element={
            <PageWrapper>
              <MyData />
            </PageWrapper>
          }
        />
        <Route
          path="/license"
          element={
            <PageWrapper>
              <License />
            </PageWrapper>
          }
        />
      </Routes>
    </div>
  );
};

createRoot(document.getElementById("root")!).render(
  <MenuProvider>
    <MapObjectProvider>
     <BrowserRouter>
       <CesiumProvider>
         <div className="flex">
           <div className="z-200">
             <Menu />
           </div>
           <div>
             <AnimatedRoutes />
           </div>
           <Map />
         </div>
       </CesiumProvider>
     </BrowserRouter>
    </MapObjectProvider>
  </MenuProvider>
);
