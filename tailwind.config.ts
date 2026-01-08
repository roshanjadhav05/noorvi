import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#2874f0", // Flipkart Blue
                secondary: "#fb641b", // Flipkart Orange
                background: "#f1f3f6", // Flipkart BG
            },
        },
    },
    plugins: [],
};
export default config;
