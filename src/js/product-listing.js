import { loadHeaderFooter } from "./utils.mjs";
import {getParams } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

loadHeaderFooter();

const productCategory = getParams("category");

const dataSource = new ProductData(productCategory);


const listElement = document.getElementById("product-list");
const headingElement = document.querySelector(".products");

const productList = new ProductListing(productCategory, dataSource, listElement, headingElement);

productList.init();