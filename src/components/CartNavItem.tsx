import { ContainerButton } from "@/styles/components/CartNavItem";
import { Handbag } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useShoppingCart } from "use-shopping-cart";

type CartItemProps = {
  setCartClassName: (className: string) => void
}

export function CartNavItem({setCartClassName}: CartItemProps) {
  const [ isEmptyCart, setIsEmptyCart] = useState(true)
  const { cartDetails, cartCount} = useShoppingCart()

  useEffect(() => {
    let stateOfCart = false
    if(Object.entries(cartDetails).length === 0) {
      stateOfCart = true
    }
    setIsEmptyCart(stateOfCart)
  }, [cartDetails]);

  return (
    <ContainerButton>
      <button disabled={isEmptyCart} onClick={() => setCartClassName("show")}>
        <Handbag size={32} weight="bold"/>
        {/* <Image src={BagIcon.src} width={32} height={32} alt="Bag icon" fill={false} />  */}
      </button>
      {cartCount ? <span>{cartCount}</span>: ""}
    </ContainerButton>
  )
}