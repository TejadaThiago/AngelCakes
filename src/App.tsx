import { BrowserRouter } from "react-router-dom"
import { Router } from "./Router"
import { NavBar } from "./components/NavBar"
import CartProvider from "./contexts/CartProvider"
import { Toaster } from "@/components/ui/toaster"

import { NextUIProvider } from '@nextui-org/react';
function App() {

  return (
    <div>
      <NextUIProvider>
        <CartProvider>
          <BrowserRouter>
            <NavBar />
            <Router />
            <Toaster />
          </BrowserRouter>
        </CartProvider>
      </NextUIProvider>
    </div>
  )
}

export default App
