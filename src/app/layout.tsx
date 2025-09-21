import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-bebas",
});

export const metadata: Metadata = {
  title: "CONTAINED | Transform Youth Justice",
  description:
    "Immersive advocacy campaign challenging Queensland decision makers to experience youth justice realities and commit to proven alternatives.",
  metadataBase: new URL("https://contained.act.place"),
  openGraph: {
    title: "CONTAINED | Transform Youth Justice",
    description:
      "Experience three containers, witness the data, and help transform Queensland's youth justice system.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CONTAINED | Transform Youth Justice",
    description:
      "Three containers. Thirty minutes. One future. Join the movement to transform youth justice in Queensland.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-color-background">
      <body className={`${inter.variable} ${bebasNeue.variable} antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[999] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-color-container-black"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
