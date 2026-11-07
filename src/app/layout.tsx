import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/components/providers/StoreProvider";
import ToastContainer from "@/components/ui/ToastContainer";

const hindSiliguri = Hind_Siliguri({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "আল-হিকমাহ্",
    template: "%s | আল-হিকমাহ্",
  },
  description:
    "বিশেষায়িত কওমী ও আলিয়া মাদ্রাসার আরবী ও সাধারণ সকল বিষয়ের স্বয়ংসম্পূর্ণ কোচিং সেন্টার - বি-ব্লক, হালিশহর, চট্টগ্রাম।",
  keywords: [
    "আল-হিকমাহ্",
    "আল-হিকমাহ্ কোচিং সেন্টার",
    "al hikma",
    "al-hikmah",
    "কওমী ও আলিয়া মাদ্রাসা কোচিং",
    "হালিশহর চট্টগ্রাম কোচিং",
    "কোচিং সফটওয়্যার",
  ],
  other: {
    "color-scheme": "light only",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className={`${hindSiliguri.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white">
        <StoreProvider>
          <ToastContainer />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
