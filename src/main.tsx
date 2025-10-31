import { createRoot } from "react-dom/client";
import { BrowserRouter, useLocation, Routes, Route, Link } from "react-router";
import { AnimatePresence, motion } from "framer-motion";

// 各ページ
import Index from "./pages";
import MapSetting from "./pages/map-setting";
import Overview from "./pages/overview";

// CSS
import "./index.css";
import "react-resizable/css/styles.css";

// メニューの状態管理
import { MenuProvider } from "./context/Menu";

/* --- ページトランジション設定 --- */
const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 },
};

const pageTransition = {
  duration: 0.2,
  ease: "easeInOut",
};

/* --- ページラッパー --- */
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    style={{ minHeight: "100vh" }}
  >
    {children}
  </motion.div>
);

/* --- AnimatedRoutes --- */
const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  return (
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
  );
};

/* --- main.tsx --- */
createRoot(document.getElementById("root")!).render(
  <MenuProvider>
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  </MenuProvider>
);
