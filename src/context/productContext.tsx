import { createContext, useState } from 'react'

interface ProductsContextProps {
  products: Product[]
  actualPage: number
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
  setActualPage: React.Dispatch<React.SetStateAction<number>>
}

export const ProductsContext = createContext<ProductsContextProps>({
  products: [],
  actualPage: 0,
  setProducts: () => { },
  setActualPage: () => { }
})

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [actualPage, setActualPage] = useState(0)

  return (
    <ProductsContext.Provider value={{
      products,
      actualPage,
      setActualPage,
      setProducts
    }}
    >
      {children}
    </ProductsContext.Provider>
  )
}
