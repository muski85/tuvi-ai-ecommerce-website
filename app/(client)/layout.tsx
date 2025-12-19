import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import AIChat from "@/components/AIChat";

const raleway = localFont ({
  src: '../fonts/Raleway.woff2',
  variable: '--font-raleway',
  weight: "100 900",
})
export const metadata: Metadata = {
  title: "Tuvi Ecommerce App",
  description: "An Ecommerce app built for learning purposes",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${raleway.variable} antialiased`}
      >
        <Header/>
        {children}
        <Footer/>
        <AIChat />
        <Toaster position="bottom-right" toastOptions={{
          style: {
            background: '#000000',
            color: '#fffff',
          }
        }}/>
      </body>
    </html>
    </ClerkProvider>
  );
}
