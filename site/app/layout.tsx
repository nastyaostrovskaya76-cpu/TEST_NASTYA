import type { Metadata, Viewport } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import { SITE_URL } from "@/lib/content";
import "./globals.css";

const serif = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const sans = Montserrat({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const title = "Тренинги по продажам с высоким чеком в Минске — Островская";
const description =
  "Корпоративные тренинги для отделов продаж и личное обучение. Более 17 лет в продажах. Офлайн, Минск, выезд по Беларуси, в Россию и другие страны";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_BY",
    url: "/",
    siteName: "Анастасия Островская",
    title: "Анастасия Островская — тренинги по продажам с высоким чеком",
    description:
      "Программа «Искусство дорогих продаж» для отделов продаж и руководителей. Офлайн, Минск, выезд по Беларуси, в Россию и другие страны",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Анастасия Островская — тренинги по продажам с высоким чеком" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#082f37",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
