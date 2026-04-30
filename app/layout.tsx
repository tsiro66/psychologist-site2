import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import SmoothScroll from "./components/SmoothScroll";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Psychologist",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${poppins.className}`}>
      <body className="min-h-full flex flex-col">
        <Preloader />
        <Footer />
        <Navigation />
        <SmoothScroll>
          <div className="relative z-10">
            {children}
          </div>
          {/* Spacer — transparent gap that reveals fixed footer underneath */}
          <div className="h-screen" aria-hidden="true" />
        </SmoothScroll>
      </body>
    </html>
  );
}
