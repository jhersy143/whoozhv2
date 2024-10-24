import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Nav from '../components/nav';
import { Providers } from "../GlobalRedux/provider"
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Whoozh",
  description: "Debate App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900`}
      >
          <Nav/>
         <main>
          <Providers>
         {children}
         </Providers>
         </main>
     
      </body>
    </html>
  );
}
