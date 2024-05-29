const transporter = require("../connectMailer");

const sendOrderEmail = async ({ orderData, orderId, url }) => {
  const { name, surname, mail, phone, city, zip, info, price, currency } =
    orderData;

  await transporter.sendMail({
    from: '"Dolope.cz" <dolope@dolope.cz>',
    to: "haz.branislav@gmail.com",
    subject: `Nová objednávka - #${orderId}`,
    text: `Ahoj, prišla nová objednávka od zákazníka ${name} ${surname}. Cena skrine je ${price} ${currency}. Kontaktný mail: ${mail} a tel. číslo: ${phone}. Miesto realizácie je v ${city} s PSČ ${zip}. ${
      info && `Dodatočná poznámka: ${info}`
    }. Informácie o skrini: ${url}.`,
    html: `
    <p>Ahoj!</p>
    <p>Prišla nová objednávka od zákazníka ${name} ${surname}.</p>
    <p>Cena skrine je ${price} ${currency}</p>
    <p>mail: ${mail}, tel. číslo: ${phone}.</p>
    <p>Miesto realizácie je: ${city}, ${zip}.</p>
    ${info && `<p>Dodatočná poznámka: ${info}.</p>`}
    <p>Informácie o skrini: <a href=${url}>${url}</a></p>
    `,
  });
};

module.exports = sendOrderEmail;
