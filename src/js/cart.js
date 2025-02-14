import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

const listElement = document.querySelector(".product-list");
const shoppingCart = new ShoppingCart("so-cart", listElement)
shoppingCart.init();

// Get the total price display element
const totalPriceElement = document.getElementById("list-total-price");
const cartFooter = document.querySelector(".list-footer");

if (shoppingCart.total > 0) {
    // show our checkout button and total if there are items in the cart.
    document.querySelector(".list-footer").classList.remove("hide");
  }

loadHeaderFooter();
