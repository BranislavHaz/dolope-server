const lastPageSelector =
  "div.in-controls__right a.in-paging__control__item--num:nth-last-child(2)";
/* const productsListSelector =
  "table.list-products-line__scroll__in:nth-of-type(1) tr.list-products-line__item:not(:first-child)"; */
const productsListSelector =
  "table.list-products-line__scroll__in:nth-of-type(1) tr.js-list-item";
const codeSelector = "a.in-code";
const titleSelector = ".list-products-line__item__title__name a";
const priceSelector = ".list-products-line__item__price__item:nth-of-type(2)";
const setSelector = ".in-flag__item--set";
const urlSelector = ".js-list-products-item-title a";

module.exports = {
  lastPageSelector,
  productsListSelector,
  codeSelector,
  titleSelector,
  priceSelector,
  setSelector,
  urlSelector,
};
