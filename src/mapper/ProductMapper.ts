import { NumberUtil } from "@/utils/numberFormat";
import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";

export type ProductModel = {
  name: string;
  description: string;
  sku: string;
  currency: string;
  priceId: string;
  imageUrl: string;
  price: number;
  priceFormatter: string;
}

export class ProductMapper {

  static toModel({name, description, default_price, images, metadata}: Stripe.Product):  ProductModel  {
    const price = default_price as Stripe.Price

    return {
      name,
      description,
      currency: price.currency,
      sku: metadata.sku ?? uuidv4(),
      priceId: price.id,
      imageUrl: images[0],
      price: price.unit_amount,
      priceFormatter: NumberUtil.currencyFormat.format((price.unit_amount/ 100))
    }
  }
  
}