import { useEffect, useState } from 'react'

export function useCartCache() {
  const [cartInCache, setCartInCache] = useState<Product[]>([])

  useEffect(() => {
    const cartInLocalStorage = localStorage.getItem('cart')
    if (cartInLocalStorage !== null) {
      const cart = JSON.parse(cartInLocalStorage)
      setCartInCache(prevState => [...prevState, ...cart])
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartInCache))
  }, [cartInCache])

  return { cartInCache, setCartInCache }
}
