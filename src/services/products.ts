export const fetchProducts = async () => {
  const data = await fetch('https://dummyjson.com/products')
  const products = await data.json()
  return products.products.map((product: FetchProduct) => ({
    id: product.id,
    title: product.title,
    price: product.price,
    description: product.description,
    category: product.category,
    image: product.thumbnail
  }))
}
