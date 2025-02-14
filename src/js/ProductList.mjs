import { renderListWithTemplate, renderWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
      <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.NameWithoutBrand}">
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