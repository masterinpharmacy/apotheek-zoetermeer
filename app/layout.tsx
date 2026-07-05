import type { Metadata } from "next";
import { Fraunces, Public_Sans, Space_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  weight: ["400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Apotheek Zoetermeer — Recept insturen, thuisbezorgd",
  description:
    "Apotheek Zoetermeer verwerkt uw recept online en bezorgt uw medicatie thuis. Snel, veilig en met persoonlijk apothekersadvies.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body
        className={`${fraunces.variable} ${publicSans.variable} ${spaceMono.variable} font-body`}
      >
        {children}
      </body>
    </html>
  );
}
