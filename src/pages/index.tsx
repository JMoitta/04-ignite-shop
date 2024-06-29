
import { GetStaticProps } from "next";
import Image from "next/image";
import Stripe from "stripe";
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import Link from "next/link";
import Head from "next/head";

import { HomeContainer, Product } from "@/styles/pages/home";
import { stripe } from "@/lib/stripe";
import { Handbag } from "@phosphor-icons/react";
import { useShoppingCart } from "use-shopping-cart";
import { ProductMapper } from "@/mapper/ProductMapper";
import { v4 as uuidv4 } from "uuid";

type HomeProps = {
  products: Stripe.Product[]
}

export default function Page({ products }: HomeProps) {
  const {addItem} = useShoppingCart();
  const [sliderRef, instanceRef] = useKeenSlider({
      loop: false,
      slides: {
        perView: 2.5,
        spacing: 48,
      }
    })

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef}>
        {products.map(product => {
          const model = ProductMapper.toModel(product)
          return (
            <Product key={product.id} className="keen-slider__slide">
              <Image src={model.imageUrl} width={520} height={480} alt="" />

              <footer>
                <Link href={`/product/${product.id}`} prefetch={false} >
                  <strong>{product.name}</strong>
                  <span>{model.priceFormatter}</span>
                </Link>

                <button onClick={console.log}>
                  {/* <Image src={BagIcon.src} width={32} height={32} alt="Bag icon"/> */}
                  <Handbag size={32} weight="bold" onClick={() => addItem({...product, sku: uuidv4(), currency: model.currency, price: model.price})}/> 
                </button>
              </footer>
            </Product>
          )})}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  // const products = response.data.map(ProductMapper.toModel)

  return {
    props: {
      products: response.data,
    },
    revalidate: 60 * 60 * 2
  }
}