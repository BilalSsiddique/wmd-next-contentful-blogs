import "./globals.css";
import { Outfit } from "next/font/google";
const outfit = Outfit({ subsets: ["latin"] });
import Header from "../components/Header";
export const metadata = {
  title: "Simple Blogs",
  description: "A simple Blog Website",
  
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
