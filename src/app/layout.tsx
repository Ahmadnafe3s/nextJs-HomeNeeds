import "./globals.css";
import Navbar from "./navbar/navbar";
import { screen_font } from "@/fonts/fonts";
import { Toaster } from "react-hot-toast";
import SessionProvider from "./sessionProvider";

export const metadata = {
  title: 'HomeNeeds',
  description: 'A app dedicated to manage recipies and shopping list',
}

export default function RootLayout({

  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" >

      <body className={screen_font.className}>

        <Toaster />

        <SessionProvider>
          <Navbar />
          <main> {children} </main> {/* Wrapping All components */}
        </SessionProvider>

      </body>
    </html>
  )
}
