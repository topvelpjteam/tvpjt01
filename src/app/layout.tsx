import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LeftMenu from "@/component/leftMenu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TIVIC",
  description: "TIVIC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="wrap">
          <header className="header">
            <h1>TIVIC</h1>
            <div className="menu_open_close">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="header_search">
              <input type="text" placeholder="Search" />
              <button></button>
            </div>
            <div className="user_info">
              Aron cutter
              <div className="user_face"></div>
            </div>
          </header>
          <aside className="aside">
            <LeftMenu />
          </aside>
          <main className="main">{children}</main>
        </div>
      </body>
    </html>
  );
}
