import "./globals.css";

import { Footer, NavBar } from "../components";
import { NextUIProvider } from "@nextui-org/react";

export const metadata = {
  title: "SudokuKe",
  description: "Discover world's best car showcase application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative">
        <NextUIProvider>
          <NavBar />
          {children}
          <Footer />
        </NextUIProvider>
      </body>
    </html>
  );
}
