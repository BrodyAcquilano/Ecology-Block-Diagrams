import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Code Editor tab is local-only.
// In production it is removed from the tab list entirely
// and the remaining tabs are reindexed.
export const SHOW_CODE_EDITOR = process.env.NODE_ENV !== "production";

export default defineConfig({
  plugins: [react()],
  define: {
    __SHOW_CODE_EDITOR__: JSON.stringify(SHOW_CODE_EDITOR),
  },
});
