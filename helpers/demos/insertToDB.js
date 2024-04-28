// Vloženie nového produktu, alebo aktualizácia stávajúceho produktu do databázy
const pool = require("../../connectDB");

const insertProductsToDB = async (product) => {
  // Kontrola, či produkt s daným ID už existuje
  const existingProducts = await pool.query({
    text: `SELECT * FROM products_demos WHERE id = $1`,
    values: [product.id],
  });

  if (existingProducts.rows.length === 0) {
    // Vloženie nového produktu
    await pool.query({
      text: `INSERT INTO products_demos(id, title, id_manufacturer, name, label, thickness, price_with_VAT, availability, url, manufacturer, category) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      values: [
        product.id,
        product.title,
        product.idManufacturer,
        product.name,
        product.label,
        product.thickness,
        product.price,
        product.availability,
        product.url,
        product.manufacturer,
        product.category,
      ],
    });
  } else {
    // Aktualizácia ceny a dostupnosti existujúceho produktu
    await pool.query({
      text: `UPDATE products_demos SET price_with_VAT = $1, availability = $2 WHERE id = $3`,
      values: [product.price, product.availability, product.id],
    });
  }
};

const insertTranslationsToDB = async (product) => {
  // Aktualizácia ceny a dostupnosti existujúceho produktu
  await pool.query({
    text: `UPDATE products_demos SET name_cz = $1 WHERE id_manufacturer = $2 AND label = $3`,
    values: [product.nameCZ, product.idManufacturer, product.label],
  });
};

const insertToDB = async (manufacturer, type, products) => {
  if (type === "products") {
    const availability = false;
    const capitalizedManufacturer =
      manufacturer.charAt(0).toUpperCase() + manufacturer.slice(1);

    await pool.query({
      text: "UPDATE products_demos SET availability = $1 WHERE manufacturer = $2",
      values: [availability, capitalizedManufacturer],
    });

    for (const product of products) {
      await insertProductsToDB(product);
    }
  } else if (type === "translations") {
    for (const product of products) {
      await insertTranslationsToDB(product);
    }
  } else {
    return;
  }
};

module.exports = insertToDB;
