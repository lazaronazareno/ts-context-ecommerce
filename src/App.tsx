import './App.css'
import { Products } from './components/Products'
import { useFetchProducts } from './hooks/useFetchProducts'
import { Header } from './components/Header'
import { useFilterProducts } from './hooks/useFilterProducts'
import { CartProvider } from './context/cartContext'
import { Cart } from './components/Cart'

const App: React.FC = () => {
  const { products, isLoading, error } = useFetchProducts()
  const { filterProducts } = useFilterProducts()

  const filteredProducts = filterProducts(products)

  return (
    <CartProvider>
      <Header />
      <Cart />
      <Products products={filteredProducts} isLoading={isLoading} error={error} />
    </CartProvider>
  )
}

export default App
