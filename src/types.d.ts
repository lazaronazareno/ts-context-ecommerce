interface Product {
  id: number
  title: string
  description: string
  price: number
  category: string
  image: string
  quantity?: number
}

interface FetchProduct {
  id: number
  title: string
  description: string
  price: number
  category: string
  thumbnail: string
}

interface FetchProductsResult {
  products: Product[]
  isLoading: boolean
  error?: Error
}

interface Filters {
  category: string
  minPrice: number
}
