class ProductService {
  async saveProduct(productData: Record<string, any>): Promise<any> {
    try {
      const response = await fetch('/products', {
        method: 'POST',
        body: JSON.stringify(productData),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to save product')
      }
      return await response.json()
    } catch (error) {
      throw new Error('An error occurred while saving the product')
    }
  }
}

export default new ProductService()
