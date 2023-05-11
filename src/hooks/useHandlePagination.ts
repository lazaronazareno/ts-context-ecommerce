import { useContext } from 'react'
import { ProductsContext } from '../context/productContext'

export const useHandlePagination = () => {
  const { actualPage, setActualPage } = useContext(ProductsContext)

  const handleNextPage = () => {
    setActualPage(prevState => prevState + 1)
  }

  const handlePrevPage = () => {
    setActualPage(prevState => prevState - 1)
  }

  return { actualPage, handleNextPage, handlePrevPage }
}
