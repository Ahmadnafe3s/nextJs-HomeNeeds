import "./globals.css";
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from "./navbar/navbar";
import { screen_font } from "../../public/fonts/fonts";
import { Toaster } from "react-hot-toast";
import StoreProvider from "./storeProvider";


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

        <StoreProvider>
          <Navbar />
          <main> {children} </main> {/* Wrapping All components */}

        </StoreProvider>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossOrigin="anonymous"></script>
      </body>
    </html>
  )
}
