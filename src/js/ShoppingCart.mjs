import { getLocalStorage } from "./utils.mjs";
import { renderListWithTemplate } from "./utils.mjs";


function productCardTemplate(product) {
    return `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
      <picture>
        <source srcset="${product.Images.PrimaryMedium}" media="(min-width: 480px)">
        <img src="${product.Images.PrimarySmall}" alt="Image of ${product.NameWithoutBrand}">
      </picture>
  </a>
  <a href="#">
    <h2 class="card__name">${product.Name}</h2>
  </a>
  <p class="cart-card__color">${product.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${product.FinalPrice}</p>
</li>`;
}

export default class ShoppingCart {
    constructor(dataSource, listElement) {
        this.dataSource = dataSource;
        this.listElement = listElement;
      }

    init() {
        // Fetch the product list
        const cartItems = getLocalStorage(this.dataSource) || [];
        this.calculateListTotal(cartItems);
        this.renderCartContents(cartItems);
      }

      calculateListTotal(list) {
        const amounts = list.map((item) => item.FinalPrice);
        this.total = amounts.reduce((sum, item) => sum + item);
      }

      renderCartContents(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list)
        document.querySelector(".list-total").innerText += ` $${this.total}`;
      }
}
