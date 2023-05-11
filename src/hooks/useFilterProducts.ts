import { useContext } from 'react'
import { FiltersContext } from '../context/filterContext'

export const useFilterProducts = () => {
  const { filters, setFilters } = useContext(FiltersContext)

  const filterProducts = (products: Product[]) => {
    return products.filter(product => {
      return (
        product.price >= filters.minPrice &&
        (
          filters.category === 'all' ||
          product.category === filters.category
        )
      )
    })
  }

  return {
    filters,
    filterProducts,
    setFilters
  }
}
