// Vloženie nového produktu, alebo aktualizácia stávajúceho produktu do databázy
const pool = require("../../connectDB");

const insertToDB = async (product) => {
  try {
    // Kontrola, či produkt s daným ID už existuje
    const existingProducts = await pool.query({
      text: `SELECT * FROM products_demos WHERE id = $1`,
      values: [product.id],
    });

    if (existingProducts.rows.length === 0) {
      // Vloženie nového produktu
      await pool.query({
        text: `INSERT INTO products_demos(id, title, idManufacturer, name, label, thickness, price_with_VAT_ks, price_with_VAT_m2, availability) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        values: [
          product.id,
          product.title,
          product.idManufacturer,
          product.name,
          product.label,
          product.thickness,
          product.price_with_VAT_ks,
          product.price_with_VAT_m2,
          product.availability,
        ],
      });
    } else {
      // Aktualizácia ceny existujúceho produktu
      await pool.query({
        text: `UPDATE products_demos SET price_with_VAT_ks = $1, price_with_VAT_m2 = $2, availability = $3 WHERE id = $4`,
        values: [
          product.price_with_VAT_ks,
          product.price_with_VAT_m2,
          product.availability,
          product.id,
        ],
      });
    }
  } catch (error) {
    console.error("Chyba pri spracovaní databázy:", error);
  }
};

const productsInsertToDB = async (products) => {
  await pool.query({ text: "UPDATE products_demos SET availability = false" });
  for (const product of products) {
    await insertToDB(product);
  }
};

module.exports = productsInsertToDB;
