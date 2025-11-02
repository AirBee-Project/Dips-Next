import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    CESIUM_BASE_URL: JSON.stringify(
      process.env.NODE_ENV === "production"
        ? "/Cesium"
        : "/node_modules/cesium/Build/Cesium"
    ),
  },
});
