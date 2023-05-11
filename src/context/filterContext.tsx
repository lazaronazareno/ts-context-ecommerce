import { createContext, useState } from 'react'

interface FiltersContextProps {
  filters: Filters
  setFilters: React.Dispatch<React.SetStateAction<Filters>>
}

export const FiltersContext = createContext<FiltersContextProps>({
  filters: {
    category: 'all',
    minPrice: 250
  },
  setFilters: () => { }
})

export function FiltersProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<Filters>({
    category: 'all',
    minPrice: 0
  })

  return (
    <FiltersContext.Provider value={{
      filters,
      setFilters
    }}
    >
      {children}
    </FiltersContext.Provider>
  )
}
