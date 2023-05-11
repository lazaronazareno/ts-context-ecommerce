import { useCart } from '../hooks/useCart.ts'
import { useHandlePagination } from '../hooks/useHandlePagination.ts'
import Rating from './Rating.tsx'

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
                <div className='title'>
                  <p>{product.title}</p>
                  <p>${new Intl.NumberFormat('en-DE').format(product.price)}</p>
                </div>
                <p className='description'>{product.description}</p>
                <Rating rating={product.rating} maxStars={5} userReviews={17} />
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
                      ? <span>Remove from Cart</span>
                      : <span>Add to Cart</span>
                  }
                </button>
              </div>
            </li>
          )
        })}
      </ul>
      <div className='pagination'>
        {actualPage > 0 &&
          <button onClick={handlePrevPage}>Previous</button>
        }
        <span>{actualPage + 1}</span>
        {actualPage < 4 &&
          <button onClick={handleNextPage}>Next</button>
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
