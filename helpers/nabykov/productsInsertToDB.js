// Vloženie nového produktu, alebo aktualizácia stávajúceho produktu do databázy
const db = require("../../connection");

const insertToDB = async (product) => {
  try {
    // Kontrola, či produkt s daným ID už existuje
    const [existingProducts] = await db.query(
      `SELECT * FROM products_nabykov WHERE id = ?`,
      [product.id]
    );

    if (existingProducts.length === 0) {
      // Vloženie nového produktu
      await db.query(`INSERT INTO products_nabykov VALUES (?, ?, ?, ?, ?)`, [
        product.id,
        product.title,
        product.price_with_VAT,
        product.availability,
        product.product_url,
      ]);
    } else {
      // Aktualizácia ceny existujúceho produktu
      await db.query(
        `UPDATE products_nabykov SET price_with_VAT= ?, vailability = ? WHERE id = ?`,
        [product.price_with_VAT, product.availability, product.id]
      );
    }
  } catch (error) {
    console.error("Chyba pri spracovaní databázy:", error);
  }
};

const productsInsertToDB = async (products) => {
  await db.query("UPDATE products_nabykov SET availability = false");
  for (const product of products) {
    console.log(product);
    await insertToDB(product);
  }
};

module.exports = productsInsertToDB;
