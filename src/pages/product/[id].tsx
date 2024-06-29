import { stripe } from "@/lib/stripe";
import { ProductMapper, ProductModel } from "@/mapper/ProductMapper";
import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Stripe from "stripe";
import { useShoppingCart } from "use-shopping-cart";

interface ProductProps {
  product: Stripe.Product;
}

export default function Product({ product }: ProductProps) {
  const [ isCreatingCheckoutSession, setIsCreatingCheckoutSession ] = useState(false)
  const model = ProductMapper.toModel(product)
  
  const { addItem } = useShoppingCart()
  async function addProductInCart() {
    addItem(product as any)
  }
  
  return ( 
  <>
    <Head>
      <title>{product.name} | Ignite Shop</title>
    </Head>
    <ProductContainer>
      <ImageContainer>
        <Image src={model.imageUrl} width={520} height={480} alt=""/>
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{model.priceFormatter}</span>

        <p>{product.description}</p>

        <button onClick={addProductInCart}>
          Colocar na sacola
        </button>
      </ProductDetails>
    </ProductContainer>
    </>
  )
}

type ProductParams = {
  id: string;
}

export const getStaticPaths: GetStaticPaths<ProductParams> = async () => {

  return {
    paths: [
      {
        params: { id: "prod_QKV3MNLBHHhUDe"}
      }
    ],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps<ProductProps, ProductParams> = async ({ params }) => {
  const productId = params.id as string;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"]
  })

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 1

  }
}