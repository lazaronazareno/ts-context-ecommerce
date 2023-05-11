import { createContext, useState } from 'react'
import { useCartCache } from '../hooks/useCartCache'

interface CartContextProps {
  cart: Product[]
  setCart: React.Dispatch<React.SetStateAction<Product[]>>
  addProductToCart: (product: Product) => void
  removeProductFromCart: (product: Product) => void
  clearCart: () => void
}

export const CartContext = createContext<CartContextProps>({
  cart: [],
  setCart: () => { },
  addProductToCart: () => { },
  removeProductFromCart: () => { },
  clearCart: () => { }
})

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { cartInCache, setCartInCache } = useCartCache()
  const [cart, setCart] = useState<Product[]>([])

  const addProductToCart = (product: Product) => {
    const productInCartIndex = cartInCache.findIndex((item: Product) => item.id === product.id)
    if (productInCartIndex >= 0) {
      const newCart = structuredClone(cartInCache)
      newCart[productInCartIndex].quantity++
      setCartInCache(newCart)
      setCart(newCart)

      return newCart
    }

    const newCart = [
      ...cartInCache,
      {
        ...product,
        quantity: 1
      }
    ]
    setCartInCache(newCart)
    setCart(newCart)
    return cart
  }

  const removeProductFromCart = (product: Product) => {
    const newCart = cartInCache.filter(item => item.id !== product.id)
    setCartInCache(newCart)
    setCart(newCart)
  }

  const clearCart = () => {
    setCartInCache([])
    setCart([])
  }

  return (
    <CartContext.Provider value={{
      cart: cartInCache,
      setCart,
      addProductToCart,
      removeProductFromCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  )
}
