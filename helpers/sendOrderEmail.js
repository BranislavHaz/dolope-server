const transporter = require("../connectMailer");

const sendOrderEmail = async ({ orderData, orderId, url }) => {
  const { name, surname, mail, phone, city, zip, info } = orderData;

  await transporter.sendMail({
    from: '"Dolope.cz" <dolope@dolope.cz>',
    to: "haz.branislav@gmail.com",
    subject: `Nová objednávka - #${orderId}`,
    text: `Ahoj, prišla nová objednávka od zákazníka ${name} ${surname} s mailom ${mail} a tel. číslom ${phone}. Miesto realizácie je v ${city} s PSČ ${zip}. ${
      info && `Dodatočná poznámka: ${info}`
    }. Informácie o skrini: ${url}.`,
    html: `Ahoj, <br>prišla nová objednávka od zákazníka ${name} ${surname} <br>mail: ${mail}, tel. číslo: ${phone}. <br>Miesto realizácie je: ${city}, ${zip}. <br>${
      info && `Dodatočná poznámka: ${info}.`
    }<br>Informácie o skrini: <a href=${url}>${url}</a>`,
  });
};

module.exports = sendOrderEmail;
