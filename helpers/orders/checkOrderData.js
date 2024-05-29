const moment = require("moment-timezone");
moment().tz("Europe/Bratislava").format();

const checkOrderData = async (orderData) => {
  const {
    name,
    surname,
    mail,
    phone,
    city,
    zip,
    info,
    state,
    price,
    currency,
  } = orderData;
  const timestamp = moment().format();

  return {
    name,
    surname,
    mail,
    phone,
    city,
    zip,
    info,
    state,
    timestamp,
    price,
    currency,
  };
};

module.exports = checkOrderData;
