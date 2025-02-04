import { setLocalStorage, getLocalStorage} from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource){
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
      }

      async init() {
        try {
          this.product = await this.dataSource.findProductById(this.productId);
          this.renderProductDetails();
          this.addEventListeners();
        } catch (error) {
          console.error("Error initializing product details:", error);
        }
      }

    addProductToCart() {

        let cart = getLocalStorage("so-cart");

        if (Array.isArray(cart)) {
 
          cart.push(this.product);
        } else {
          cart = []; // Initialize as an empty array if it's not one
          cart.push(this.product);
        }
        setLocalStorage("so-cart", cart);
      }

      renderProductDetails() {

        const productBrand = document.getElementById("product-brand");
        const productName = document.getElementById("product-name");
        const productImgContainer = document.getElementById("product-image-container");        const productPrice = document.getElementById("product-price");
        const productColor = document.getElementById("product-color");
        const productDesc = document.getElementById("product-desc");

        productBrand.textContent = this.product.Brand.Name;
        productName.textContent = this.product.NameWithoutBrand;
        productPrice.textContent = this.product.FinalPrice;
        productColor.textContent = this.product.Colors[0].ColorName;
        productDesc.innerHTML  = this.product.DescriptionHtmlSimple;

        productImgContainer.innerHTML = `
        <picture>
          <source srcset="${this.product.Images?.PrimaryExtraLarge}" media="(min-width: 1000px)">
          <source srcset="${this.product.Images?.PrimaryLarge}" media="(min-width: 568px)">
          <source srcset="${this.product.Images?.PrimaryMedium}" media="(min-width: 280px)">
          <img src="${this.product.Images?.PrimarySmall}" alt="${this.product.Name || 'Product Image'}">
        </picture>
      `;
        
      }

      addEventListeners() {
        const addToCartButton = document.getElementById("addToCart");
        if (addToCartButton) {
          // Use an arrow function or .bind(this) to maintain the context
          addToCartButton.addEventListener("click", () => this.addProductToCart());
        } else {
          console.error("Add to Cart button not found.");
        }
      }
  }