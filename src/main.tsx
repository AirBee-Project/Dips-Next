import { createRoot } from "react-dom/client";
import { BrowserRouter, useLocation, Routes, Route } from "react-router";
import { AnimatePresence, easeInOut, motion } from "framer-motion";

// 各ページ
import Index from "./pages";
import MapSetting from "./pages/map-setting";
import Overview from "./pages/overview";

// CSS
import "./index.css";
import "react-resizable/css/styles.css";

// メニューの状態管理
import { MenuProvider } from "./context/Menu";
import Menu from "./components/common/Menu/Menu";

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
  return (
    <div style={{ flex: 1, position: "relative", minWidth: "100%" }}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageWrapper>
                <Index />
              </PageWrapper>
            }
          />
          <Route
            path="/map-setting"
            element={
              <PageWrapper>
                <MapSetting />
              </PageWrapper>
            }
          />
          <Route
            path="/overview"
            element={
              <PageWrapper>
                <Overview />
              </PageWrapper>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

createRoot(document.getElementById("root")!).render(
  <MenuProvider>
    <BrowserRouter>
      <div className="flex">
        <div>
          <Menu />
        </div>
        <AnimatedRoutes />
      </div>
    </BrowserRouter>
  </MenuProvider>
);
