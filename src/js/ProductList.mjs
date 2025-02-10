export default class ProductListing {
    constructor(products) {
        this.products = products;
    }

    generateProductCards() {
        if (!this.products || this.products.length === 0) {
            return "<p>No products available.</p>";  //if no products are provided, return a message
        }
    }
}