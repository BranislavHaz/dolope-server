// Vloženie nového produktu, alebo aktualizácia stávajúceho produktu do databázy
const pool = require("../connectDB");
const moment = require("moment-timezone");
moment().tz("Europe/Bratislava").format();

const getColumn = async (website, type, manufacturer) => {
  if (website === "demos") {
    return `${website}_${type}_${manufacturer}`;
  } else if (website === "nabykov") {
    return `${website}_${type}`;
  } else {
    return "";
  }
};

const insertStatusToDB = async (website, type, manufacturer = false) => {
  const column = await getColumn(website, type, manufacturer);

  const now = moment().format();

  await pool.query({
    text: `UPDATE scrapping_status SET ${column} = $1 WHERE id = 0`,
    values: [now],
  });
};

module.exports = insertStatusToDB;
