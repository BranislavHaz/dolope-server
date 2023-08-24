const productsAdditionId = async (page, products) => {
  try {
    const content = await page.content();
    const gtagRegex =
      /gtag\("event",\s*"view_item_list",\s*{"items":\s*(\[[^\]]+\])/;
    const matches = content.match(gtagRegex);
    //console.log(matches);

    if (matches && matches.length >= 2) {
      const jsonArray = JSON.parse(matches[1]);

      for (const item of jsonArray) {
        const item_name = item.item_name;
        const item_id = item.item_id;

        // Prehľadávanie produktovej zoznamu a dopisovanie id
        for (const product of products) {
          if (product.title === item_name) {
            product.id = +item_id;
            break; // Nájdená zhoda, nemá zmysel pokračovať
          }
        }
      }
    }

    return products;
  } catch {
    throw new Error("Chyba vo funkcií productsAdditionId()");
  }
};

module.exports = productsAdditionId;
