import { useCart } from '../hooks/useCart.ts'
import { AddToCartIcon, RemoveFromCartIcon } from './Icons.tsx'

interface Props {
  products: Product[]
}

const ListOfProducts: React.FC<Props> = ({ products }) => {
  const { cart, addProductToCart, removeProductFromCart } = useCart()

  const checkProductInCart = (product: Product) => {
    return cart.some(item => item.id === product.id)
  }

  return (
    <ul className='products'>
      {products.map((product: Product) => {
        const isProductInCart = checkProductInCart(product)

        return (
          <li className='product-item' key={product.id}>
            <img src={product.image} alt={product.title} />
            <span>{product.title}</span>
            <p>${product.price}</p>
            <div>
              <button
                style={{ backgroundColor: isProductInCart ? 'red' : '#09f' }}
                onClick={() => {
                  isProductInCart
                    ? removeProductFromCart(product)
                    : addProductToCart(product)
                }}
              >
                {
                  isProductInCart
                    ? <RemoveFromCartIcon />
                    : <AddToCartIcon />
                }
              </button>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

const NoProductsResults: React.FC = () => {
  return (
    <p>No se encontraron productos para esta búsqueda</p>
  )
}

const LoadingSpinner: React.FC = () => {
  return (
    <div className="lds-ring">
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}

export const Products: React.FC<FetchProductsResult> = ({ products, isLoading, error }) => {
  const hasMovies = products?.length > 0

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {hasMovies && <ListOfProducts products={products} />}
      {(error != null) && <NoProductsResults />}
    </>
  )
}
