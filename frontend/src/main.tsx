import { createRoot } from "react-dom/client";
import { BrowserRouter, useLocation, Routes, Route } from "react-router";
import { AnimatePresence, easeInOut, motion, useMotionValue } from "framer-motion";

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


/* --- ページトランジション設定 --- */
const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 },
};

const pageTransition = {
  duration: 0.1,
  ease: easeInOut,
};

/* --- ページラッパー --- */
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
    style={{ width: "100%", height: "100%" }}
  >
    {children}
  </motion.div>
);

/* --- AnimatedRoutes --- */
const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  const isLicensePage = location.pathname === "/license";

  const { isMenuOpen } = useMenu();
  const sidebarWidth = isMenuOpen ? 65 * 4 : 14 * 4;//サイドバー分を左に開けるため
  // License 用のアニメーション
  const license_trans = { duration: 0.25, ease: "easeOut", delay: isMenuOpen ? 0.25 : 0 } as const;

  return (
    <motion.div
      className={
        isLicensePage
          ? "fixed top-0 bottom-0 right-0 z-15 bg-white overflow-y-auto"
          : "flex-1 relative overflow-hidden"
      }
      animate={
        isLicensePage
          ? { left: sidebarWidth }
          : { left: 0 }
      }
      transition={license_trans}
      initial={false} // 初期状態でアニメーションしない
    >
      <AnimatePresence mode="wait">
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
      </AnimatePresence>
    </motion.div>
  );
};

createRoot(document.getElementById("root")!).render(
  <MenuProvider>
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
  </MenuProvider>
);
