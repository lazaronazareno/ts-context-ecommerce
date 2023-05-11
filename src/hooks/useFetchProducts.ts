import { useState, useEffect, useContext } from 'react'
import { ProductsContext } from '../context/productContext'

export const useFetchProducts = (): FetchProductsResult => {
  const { products, actualPage, setProducts } = useContext(ProductsContext)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error>()

  const fetchProducts = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`https://dummyjson.com/products?limit=20&skip=${actualPage}`)
      const data = await res.json()
      const newProducts = data.products.map((product: FetchProduct) => ({
        id: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.thumbnail
      }))
      setProducts(newProducts)
    } catch (error) {
      setError(error as Error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void fetchProducts()
  }, [actualPage])

  return { products, isLoading, error }
}
