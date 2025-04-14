import { Poppins } from "next/font/google";

export const poppins = Poppins({
    subsets: ["latin"],
    variable: "--font-poppins",
    display: "swap",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    style: ["normal", "italic"],
    fallback: ["system-ui", "sans-serif"],
    preload: true,
    adjustFontFallback: true,
});