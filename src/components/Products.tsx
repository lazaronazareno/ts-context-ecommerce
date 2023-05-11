import { useCart } from '../hooks/useCart.ts'
import { useHandlePagination } from '../hooks/useHandlePagination.ts'
import { AddToCartIcon, RemoveFromCartIcon } from './Icons.tsx'

interface Props {
  products: Product[]
}

const ListOfProducts: React.FC<Props> = ({ products }) => {
  const { cart, addProductToCart, removeProductFromCart } = useCart()
  const { actualPage, handleNextPage, handlePrevPage } = useHandlePagination()

  const checkProductInCart = (product: Product) => {
    return cart.some(item => item.id === product.id)
  }

  return (
    <>
      <ul className='products'>
        {products.map((product: Product) => {
          const isProductInCart = checkProductInCart(product)

          return (
            <li className='product-item' key={product.id}>
              <img src={product.image} alt={product.title} />
              <div>
                <span>{product.title}</span>
                <p>${product.price}</p>
              </div>
              <div>
                <button>🍳</button>
                <button
                  className={isProductInCart ? 'remove-from-cart' : 'add-to-cart'}
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
      <div className='pagination'>
        {actualPage > 0 &&
          <button onClick={handlePrevPage}>⏪</button>
        }
        <span>{actualPage + 1}</span>
        {actualPage < 4 &&
          <button onClick={handleNextPage}>⏩</button>
        }
      </div>
    </>
  )
}

const NoProductsResults: React.FC = () => {
  return (
    <p className='no-products-found'>⚠ No products found. Try Changing the filters ⚠</p>
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
      {
        hasMovies
          ? <ListOfProducts products={products} />
          : <NoProductsResults />
      }
      {(error != null) && <p>{error.message}</p>}
    </>
  )
}
