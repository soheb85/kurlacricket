import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  weight: ["100","200","300","400","500","600","700","800","900"],
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Kurla Cricket",
  description: "Kurla Cricket Tournament Websites",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} antialiased`}
      >
        <header className="">
          <div className="font-outfit flex items-center ml-2 pt-3">
            <div>
              <Image
                      src="/kct_logo.png"
                      alt="Kurla Cricket Tournament"
                      width={50}
                      height={50}
                      className="mb-6"
                    />
            </div>
            <div className="ml-8 pb-6 text-xl font-bold">
              <h2><span className="text-orange-500 mx-[2px]">Kurla</span> <span className="mx-[2px]">Cricket</span> <span className="text-green-500 mx-[2px]">Tournament</span> 🏏</h2>
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
