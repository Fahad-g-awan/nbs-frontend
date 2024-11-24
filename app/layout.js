import { ToastContainer } from "react-toastify";
import { Roboto } from "next/font/google";

import "./globals.css";

import AppContextProvider from "@/components/utilis/hooks/AppHook";
import Loader from "@/components/UI/loader/Loader";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "NBS Furnitures",
  description: "NBS Furnitures",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <AppContextProvider>
          <Loader />
          {children}
          <ToastContainer />
        </AppContextProvider>
      </body>
    </html>
  );
}
