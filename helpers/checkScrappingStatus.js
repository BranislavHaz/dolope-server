const pool = require("../connectDB");
const moment = require("moment-timezone");
moment().tz("Europe/Bratislava").format();

const checkScrappingStatus = async () => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM scrapping_status WHERE id = 0"
    );

    const today = moment().startOf("day").format();
    const tomorrow = moment().add(1, "day").startOf("day").format();

    const row = rows[0];

    for (const column in row) {
      if (column !== "id") {
        const timestamp = moment(row[column]).format();
        if (today > timestamp || timestamp > tomorrow) {
          return false;
        }
      }
    }

    return true;
  } catch (error) {
    console.error("Error checking timestamps:", error);
    return false;
  }
};

module.exports = checkScrappingStatus;
