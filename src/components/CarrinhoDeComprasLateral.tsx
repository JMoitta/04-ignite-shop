import { ProductMapper } from "@/mapper/ProductMapper";
import { ContainerCarrinho, FooterInCart, ImageContainer, ProductInCart } from "@/styles/components/CarrinhoDeComprasLateral";
import { NumberUtil } from "@/utils/numberFormat";
import { X } from "@phosphor-icons/react";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useShoppingCart } from "use-shopping-cart";

type CarrinhoProps = {
  cartClassName: string
  updateCartClassName: (className: string) => void
}

export function CarrinhoDeComprasLateral({cartClassName, updateCartClassName}: CarrinhoProps) {
  const {cartDetails, cartCount, removeItem, clearCart } = useShoppingCart();
  const [isStartRedirect, setIsStartRedirect] = useState(false)

  const cartList = Object.entries(cartDetails)

  const totalPrice = cartList.reduce((acc, [_, product]) => acc + product.value, 0);

  const formattedTotalPrice = NumberUtil.currencyFormat.format(totalPrice / 100);

  // useEffect(() => {
  //   if(cartCount === 0){
  //     updateCartClassName("")
  //   }
  // }, [cartCount])

  async function handleBuyCart() {
    setIsStartRedirect(true)
    const cartProducts = cartList.map(([_, {default_price, quantity}]) => ({priceId: default_price.id, quantity}))

    try {
      const response = await axios.post("/api/checkout", {cartProducts})
      
      const { checkoutUrl } = response.data;
      clearCart()

      window.location.href = checkoutUrl;
    } catch (err) {
      setIsStartRedirect(false)
      console.error(err)
    }

  }

  console.log({ cartDetails, formattedTotalPrice, totalPrice})
  return (
    <ContainerCarrinho className={cartClassName}>
      <X size={32} onClick={() => updateCartClassName("")}/>
      <h2>Sacola de compras</h2>
      <section>
        {cartList.map(([id, product]) => {
          const model = ProductMapper.toModel(product as any)

          return (
          <ProductInCart key={id}>
            <ImageContainer>
              <Image src={model.imageUrl} width={100} height={100} alt=""/>
            </ImageContainer>
            <div>
              <p>{product.name}</p>
              <span>
                <strong>{model.priceFormatter}</strong>
                <small>Qtd: {product.quantity} </small>
              </span>
              <button onClick={() => removeItem(product.id)}>Remover</button>
            </div>
          </ProductInCart>
        )})}
      </section>
      <FooterInCart>
          <div>
            <p>Quantidade <span>{cartCount} itens</span></p>
            <p>Valor total
            <span>{formattedTotalPrice}</span></p>
          </div>

          <button disabled={isStartRedirect} onClick={handleBuyCart}>Finalizar compra</button>
        </FooterInCart>
    </ContainerCarrinho>
  )
}