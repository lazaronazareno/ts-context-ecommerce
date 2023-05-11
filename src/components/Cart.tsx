import { useId } from 'react'
import { CartIcon, ClearCartIcon } from './Icons.jsx'
import { useCart } from '../hooks/useCart.js'

interface CartProduct extends Product {
  addToCart: () => void
}

function CartItem({ image, price, title, quantity, addToCart }: CartProduct) {
  return (
    <li>
      <img
        src={image}
        alt={title}
      />
      <div>
        <strong>{title}</strong> - ${price}
      </div>

      <footer>
        <small>
          Qty: {quantity}
        </small>
        <button onClick={addToCart}>+</button>
      </footer>
    </li>
  )
}

export function Cart() {
  const cartCheckboxId = useId()
  const { cart, clearCart, addProductToCart } = useCart()

  return (
    <>
      <label className='cart-button' htmlFor={cartCheckboxId}>
        <CartIcon />
      </label>
      <input id={cartCheckboxId} type='checkbox' hidden />

      <aside className='cart'>
        <ul>
          {cart.map(product => (
            <CartItem
              key={product.id}
              addToCart={() => { addProductToCart(product) }}
              {...product}
            />
          ))}
        </ul>

        {
          cart.length > 0
            ? (
              <div>
                <button className='clear-cart' onClick={clearCart}>
                  <>
                    <ClearCartIcon />
                    <p>Clear Cart</p>
                  </>
                </button>

                <h3>
                  Total: ${cart.reduce((acc, product) => acc + (product.price * (product.quantity ?? 1)), 0)}
                </h3>

                <button className='shop-now' onClick={clearCart}>Shop Now</button>
              </div>)
            : <p>Cart is empty 😿</p>
        }

      </aside>
    </>
  )
}
