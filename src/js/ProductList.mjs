import { renderListWithTemplate, renderWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
      <picture>
        <source srcset="${product.Images.PrimaryExtraLarge}" media="(min-width: 1200px)">
        <source srcset="${product.Images.PrimaryLarge}" media="(min-width: 768px)">
        <source srcset="${product.Images.PrimaryMedium}" media="(min-width: 480px)">
        <img src="${product.Images.PrimarySmall}" alt="Image of ${product.NameWithoutBrand}">
      </picture>
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>
    </a>
  </li>`;
}

function headingTemplate(category) {
  const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
  return `<h2>Top Products: ${capitalizedCategory}</h2>`;
}

export default class ProductListing {
  constructor(category, dataSource, listElement, headingElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.headingElement = headingElement;
  }

  async init() {
    this.renderHeading();
    // Fetch the product list
    const productList = await this.dataSource.getData(this.category);
    this.renderList(productList);
    // Render the product list into the DOM

  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  };

  renderHeading() {
    renderWithTemplate(headingTemplate(this.category), this.headingElement)
  }
}