class ProductService {
  async saveProduct(productData: Record<string, any>) {
    return fetch('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}

export default new ProductService()
