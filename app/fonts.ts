// app/fonts.ts
import { Manrope } from "next/font/google";

export const aimemories = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-aimemories",
  display: "swap",
});
