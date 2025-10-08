import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Provider from "@/components/Hoc/Provider";
import { SessionProvider } from "@/components/auth/session-provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const nunito = Nunito({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Trekking Miles ",
  description:
    "A Sustainable Tourism Initiative! Travel, Experience and Help Local!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${nunito.className} antialiased`}>
        <SessionProvider>
          <Analytics />
          <SpeedInsights />
          <Provider>{children}</Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
