import { stripe } from "@/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";
type CheckoutRequest = {
  cartProducts: {
    priceId: string,
    quantity: number
  }[]
}

export default async function handlers(req: NextApiRequest, res: NextApiResponse) {
  const {cartProducts}: CheckoutRequest = req.body;
  console.log(req.body)
  if(req.method !== "POST") {
    return res.status(405).json({ error: 'Method not allowed.'})
  }

  if(!cartProducts) {
    return res.status(400).json({error: 'Prices not found.'})
  }

  
  if(cartProducts instanceof Array && cartProducts.length === 0) {
    return res.status(400).json({error: 'Price not valid.'})
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`; 
  const cancelUrl = `${process.env.NEXT_URL}/`;
  const line_items = cartProducts.map(({priceId, quantity} ) => ({price: priceId, quantity}))

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: "payment",
    line_items
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url
  })
}