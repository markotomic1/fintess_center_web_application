import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/global.scss";
import favicon from "../../public/icons/favicon.ico";
import { Providers } from "@/redux/provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IgniteFit",
  description: "Modern fitness center available 24/7",
  icons: favicon.src,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
