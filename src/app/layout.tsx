import type { Metadata } from "next";
import "./globals.css";
import { Spicy_Rice } from "next/font/google"

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Navbar from "@/components/Navbar";
config.autoAddCss = false

const spicyrice = Spicy_Rice({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Sera Kirciltepeli | Art Portfolio",
  description: "Sera Kirciltepeli's art portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spicyrice.className} bg-black text-white`}
      >
        <Navbar />
        {children}
        <footer>
          <div className="w-full text-right p-8 bg-black">
            <p className="text-white">Sera Kirciltepeli</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
