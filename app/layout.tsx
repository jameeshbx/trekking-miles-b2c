import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Provider from "@/components/Hoc/Provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";


const nunito = Nunito({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Trekking Miles - Explore, Discover and Experience!",
  description: "A Sustainable Tourism Initiative! Travel, Experience and Help Local!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${nunito.className} antialiased`}
      >
        <Analytics />
        <SpeedInsights />
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
