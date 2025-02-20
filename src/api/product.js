const allProducts = [
  { id: 1, name: 'Product 1', category: 'electronics', price: 100, rating: 4, color: 'red' },
  { id: 2, name: 'Product 2', category: 'clothing', price: 50, rating: 5, color: 'blue' },
  { id: 3, name: 'Product 3', category: 'electronics', price: 150, rating: 3, color: 'green' },
  { id: 4, name: 'Product 4', category: 'clothing', price: 200, rating: 4, color: 'black' },
];

export const filterProducts = async (filter) => {
  try {
    let filteredProducts = allProducts;

    if (filter.categories && filter.categories.length > 0 && filter.categories[0] !== 'all') {
      filteredProducts = filteredProducts.filter(product =>
        filter.categories.includes(product.category)
      );
    }

    if (filter.price) {
      const [minPrice, maxPrice] = filter.price.split('-').map(Number); 
      filteredProducts = filteredProducts.filter(product =>
        product.price >= minPrice && product.price <= maxPrice
      );
    }

    if (filter.rating > 0) {
      filteredProducts = filteredProducts.filter(product =>
        product.rating >= filter.rating
      );
    }

    if (filter.colors && filter.colors.length > 0) {
      filteredProducts = filteredProducts.filter(product =>
        filter.colors.includes(product.color)
      );
    }

    return { data: filteredProducts };
  } catch (error) {
    console.error('Error filtering products:', error);
    return { data: [] };
  }
};
