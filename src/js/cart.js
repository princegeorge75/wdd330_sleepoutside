import { getLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

const listElement = document.querySelector(".product-list");
const shoppingCart = new ShoppingCart("so-cart", listElement)
shoppingCart.init();

loadHeaderFooter();
