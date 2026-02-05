import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "rgb(248 250 252)",
        panel: "rgb(255 255 255)",
        line: "rgb(226 232 240)",
        ink: "rgb(15 23 42)",
        muted: "rgb(100 116 139)",
        brand: "rgb(37 99 235)",
        danger: "rgb(220 38 38)",
        ok: "rgb(22 163 74)",
      },
    },
  },
  plugins: [],
};
export default config;
