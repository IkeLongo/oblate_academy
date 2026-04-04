import type { Metadata } from "next";
import Head from "next/head";
import { Poppins } from "next/font/google";
import { Fredoka } from "next/font/google";
import { Inria_Sans } from "next/font/google";
import "./globals.css";
import CookieBanner from "./ui/components/cookies/components/CookieBanner";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-poppins',
});

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-fredoka',
});

const inriaSans = Inria_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-inria",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    template: "%s | Oblate Academy",
    default: "Oblate Academy — Catholic Resources for Kids",
  },
  description:
    "Catholic faith resources for children — saints, virtues, and learning kits for grades K–5.",
  openGraph: {
    type: "website",
    siteName: "Oblate Academy",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Oblate Academy — Catholic Resources for Kids",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&family=Inria+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body
        className={`${poppins.className} ${fredoka.variable} ${inriaSans.variable} antialiased overflow-x-hidden`}
      >
        <CookieBanner />
        {children}
      </body>
    </html>
  );
}
