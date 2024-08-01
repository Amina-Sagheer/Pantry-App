
import { Oswald } from "next/font/google";
import "./globals.css";

const inter = ({ subsets: ["latin"] });

export const metadata = {
  title: "Your Pantry App",
  description: "",
};

export default function RootLayout({ children }) {
  return (
   
    
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
      
  );
}
