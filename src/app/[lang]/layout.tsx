import { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Import Font Awesome CSS globally
config.autoAddCss = false; // Disable automatic CSS injection to prevent conflicts

import "./globals.css"; // Your global styles
import { Toaster } from "react-hot-toast";
import Nav from "./components/ui/nav"; // Example import

import { Geist, Geist_Mono, Henny_Penny } from "next/font/google";
import { i18n, Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";
import DictionaryProvider from "./context/i18n/dictionaryProvider";
import Footer from "./components/ui/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Feliz año nuevo 2025!",
  description: "Felicitación de año nuevo 2025",
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}>) {

  const awaitedParams = await params
  const dictionary = await getDictionary(awaitedParams.lang)

  return (
    <html lang={(await params).lang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DictionaryProvider dictionary={dictionary} locale={awaitedParams.lang}>
          <SpeedInsights />
          <Toaster position="bottom-right" />
          <Nav />
          <div className="flex flex-col min-h-screen">
            <main className="bg-green-900 w-full flex flex-col p-8 mt-16 flex-grow">
              {children}
            </main>
            <Footer dictionary={dictionary}/>
            </div>
        </DictionaryProvider>
      </body>
    </html>
  );
}
