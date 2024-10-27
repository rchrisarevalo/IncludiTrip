import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AnalyticsInitializer from "./components/AnalyticsInitializer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IncludiTrip",
  authors: {
    name: "IncludiTrip: Ruben Arevalo, Mauro Castillo, Maviya Yaseen, Henry Tran",
  },
  description: "Planning your next vacation just got easier! IncludiTrip takes the stress out of organizing trips by offering personalized travel itineraries, curated recommendations, and seamless booking options, all in one place.",
  keywords: [
    "Disability",
    "Travel",
    "Travel accessibility",
    "AI Travel Disability",
    "AI",
  ],
  metadataBase: new URL("https://www.includitrip.com/")
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth focus:scroll-auto">
      <body className={inter.className}>
        <AnalyticsInitializer />
        {children}
      </body>
    </html>
  );
}
