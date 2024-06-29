import { stripe } from "@/lib/stripe";
import { ImageContainer, SuccessContainer } from "@/styles/pages/success";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

type SuccessProps = {
  customerName: string;
  products: {
    name: string;
    imageUrl: string;
  }[]
}

export default function Success({ customerName, products}: SuccessProps) {
  const buyDescriptionMoreOne = `compra de ${products.length} camisestas`
  const buyDescription = products.length === 1? <strong>{products[0].name}</strong> : buyDescriptionMoreOne;
  return (
    <>
      <Head>
        <title>compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex"/>
      </Head>
      <SuccessContainer>
        <h1>Compra efetuada!</h1>

        <ImageContainer>
          {products.map(product => (
            <figure>
              <Image src={product.imageUrl} width={120} height={110} alt=""/>
            </figure>
          ))}
        </ImageContainer>
        
        <p>
          Uhuul <strong>{customerName}</strong>, sua {buyDescription} já está a caminho da sua casa.
        </p>

        <Link href="/">
          Voltar ao catálogo
        </Link>
      </SuccessContainer>
    </>
  )
}

type SuccessParams = {
  success_id: string;
}

export const getServerSideProps: GetServerSideProps<SuccessProps, SuccessParams> = async ({ query, params }) => {
  const successId = query.session_id as string

  if(!successId) {
    return { 
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }

  const session = await stripe.checkout.sessions.retrieve(successId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const customerName = session.customer_details.name;
  const products = session.line_items.data.map(item => {
    const product = item.price.product as Stripe.Product
    return {
      name: product.name,
      imageUrl: product.images[0]
    }
  });

  return {
    props: {
      customerName,
      products
    }
  }
}