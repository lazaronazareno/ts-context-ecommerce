import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { FiltersProvider } from './context/filterContext.tsx'
import { ProductsProvider } from './context/productContext.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ProductsProvider>
      <FiltersProvider>
        <App />
      </FiltersProvider>
    </ProductsProvider>
  </React.StrictMode>
)
