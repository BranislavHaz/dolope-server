// Vloženie nového produktu, alebo aktualizácia stávajúceho produktu do databázy
const pool = require("../../connectDB");

const insertProductsToDB = async (product) => {
  console.log("Začínam insert do DB");
  // Kontrola, či produkt s daným ID už existuje
  const existingProducts = await pool.query({
    text: `SELECT * FROM products_nabykov WHERE id = $1`,
    values: [product.id],
  });

  if (existingProducts.rows.length === 0) {
    // Vloženie nového produktu
    await pool.query({
      text: `INSERT INTO products_nabykov(id, title, price_with_VAT, availability, url, color, category, length, position, thickness, rails_number) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      values: [
        product.id,
        product.title,
        product.price,
        product.availability,
        product.url,
        product.color,
        product.category,
        product.length,
        product.position,
        product.thickness,
        product.railsNumber,
      ],
    });
  } else {
    // Aktualizácia ceny existujúceho produktu
    await pool.query({
      text: `UPDATE products_nabykov SET price_with_VAT= $1, availability = $2 WHERE id = $3`,
      values: [product.price, product.availability, product.id],
    });
  }
};

const insertToDB = async (products) => {
  await pool.query({
    text: "UPDATE products_nabykov SET availability = false",
  });
  for (const product of products) {
    await insertProductsToDB(product);
  }
};

module.exports = insertToDB;
