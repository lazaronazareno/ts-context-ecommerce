import { useContext, useEffect, useId } from 'react'
import { useFilterProducts } from '../hooks/useFilterProducts'
import { ProductsContext } from '../context/productContext'

export const Filters: React.FC = () => {
  const { filters, setFilters } = useFilterProducts()
  const { products, actualPage } = useContext(ProductsContext)

  const filterFromProducts = products.map((product: Product) => product.category)
  const filterFromProductsArray = [...new Set(filterFromProducts)]

  const minPriceFilterId = useId()
  const categoryFilterId = useId()

  const handleChangeMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prevState: any) => ({
      ...prevState,
      minPrice: parseInt(e.target.value)
    }))
  }

  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prevState => ({
      ...prevState,
      category: e.target.value
    }))
  }

  useEffect(() => {
    setFilters({
      category: 'all',
      minPrice: 0
    })
  }, [actualPage])

  return (
    <section className='filters'>

      <div>
        <label htmlFor={minPriceFilterId}>Price from:</label>
        <input
          type='range'
          id={minPriceFilterId}
          min='0'
          step='10'
          max='1000'
          onChange={handleChangeMinPrice}
          value={filters.minPrice}
        />
        <span>${filters.minPrice}</span>
      </div>

      <div>
        <label htmlFor={categoryFilterId}>Categoría</label>
        <select id={categoryFilterId} onChange={handleChangeCategory}>
          <option value='all'>All</option>
          {filterFromProductsArray.map((filter: string) => (
            <option style={{ textTransform: 'capitalize' }} key={filter} value={filter}>{filter}</option>
          ))}
        </select>
      </div>

    </section>

  )
}
