// Vloženie nového produktu, alebo aktualizácia stávajúceho produktu do databázy
const db = require("../../connection");

const insertToDB = async (product) => {
  try {
    // Kontrola, či produkt s daným ID už existuje
    const [existingProducts] = await db.query(
      `SELECT * FROM products_demos WHERE id = ?`,
      [product.id]
    );

    if (existingProducts.length === 0) {
      // Vloženie nového produktu
      await db.query(
        `INSERT INTO products_demos VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          product.id,
          product.title,
          product.idManufacturer,
          product.name,
          product.label,
          product.thickness,
          product.price_with_VAT_ks,
          product.price_with_VAT_m2,
        ]
      );
    } else {
      // Aktualizácia ceny existujúceho produktu
      await db.query(
        `UPDATE products_demos SET price_with_VAT_ks = ? WHERE id = ?`,
        [product.price_with_VAT_ks, product.id]
      );
    }
  } catch (error) {
    console.error("Chyba pri spracovaní databázy:", error);
  }
};

const productsInsertToDB = async (products) => {
  for (const product of products) {
    await insertToDB(product);
  }
};

module.exports = productsInsertToDB;
