import { useId } from 'react'
import { useFilterProducts } from '../hooks/useFilterProducts'

export const Filters: React.FC = () => {
  const { filters, setFilters } = useFilterProducts()

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

  return (
    <section className='filters'>

      <div>
        <label htmlFor={minPriceFilterId}>Precio a partir de:</label>
        <input
          type='range'
          id={minPriceFilterId}
          min='0'
          max='1000'
          onChange={handleChangeMinPrice}
          value={filters.minPrice}
        />
        <span>${filters.minPrice}</span>
      </div>

      <div>
        <label htmlFor={categoryFilterId}>Categoría</label>
        <select id={categoryFilterId} onChange={handleChangeCategory}>
          <option value='all'>Todas</option>
          <option value='laptops'>Laptops</option>
          <option value='smartphones'>Smartphones</option>
        </select>
      </div>

    </section>

  )
}
