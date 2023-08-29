const addIDs = async ($, products) => {
  const scriptContents = $("script")
    .map((_, el) => $(el).text())
    .get();

  const gtagScript = scriptContents.find((content) =>
    content.includes('gtag("event", "view_item_list"')
  );

  if (gtagScript) {
    const jsonArrayMatch = gtagScript.match(/"items":\s*(\[[^\]]+\])/);
    if (jsonArrayMatch && jsonArrayMatch.length >= 2) {
      const jsonArray = JSON.parse(jsonArrayMatch[1]);

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
  }

  console.log(products);

  return products;
};

module.exports = addIDs;
