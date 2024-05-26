const moment = require("moment-timezone");
moment().tz("Europe/Bratislava").format();

const checkOrderData = async (orderData) => {
  const { name, surname, mail, phone, city, zip, info } = orderData;
  const timestamp = moment().format();
  const stateRaw = orderData.state;
  const state = stateRaw;

  return { name, surname, mail, phone, city, zip, info, state, timestamp };
};

module.exports = checkOrderData;
