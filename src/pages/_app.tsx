import { globalStyles } from '@/styles/global'
import { Container, Header } from '@/styles/pages/app'
import { CartProvider } from 'use-shopping-cart'
import { useState } from 'react'
import type { AppProps } from 'next/app'
import logoImg from "@/assets/logo.svg"
import Image from 'next/image'
import { CarrinhoDeComprasLateral } from '@/components/CarrinhoDeComprasLateral'
import Link from 'next/link'
import { CartNavItem } from '@/components/CartNavItem'
 
export default function App({ Component, pageProps }: AppProps) {
  const [ cartClassName, setCartClassName] = useState("")
  

  globalStyles()

  return (
    <CartProvider
      mode="payment"
      cartMode="checkout-session"
      successUrl="http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}"
      cancelUrl="http://localhost:3000/"
      stripe={process.env.STRIPE_PUBLIC_KEY}
      currency="BRL"
    >
      <Container>
        <Header>
          <Link href="/">
            <Image src={logoImg} alt="" />
          </Link>
          <CartNavItem setCartClassName={setCartClassName}/>
        </Header>

        <Component {...pageProps} />

      </Container>
      <CarrinhoDeComprasLateral cartClassName={cartClassName} updateCartClassName={setCartClassName}/>
    </CartProvider>
    )
}