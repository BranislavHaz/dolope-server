const getTransporter = require("../connectMailer");

const sendErrorEmail = async (typeOfScraper, err = false) => {
  const transporter = await getTransporter();
  await transporter.sendMail({
    from: '"Webscrapper" <dolope@dolope.cz>',
    to: "haz.branislav@gmail.com",
    subject: `${typeOfScraper} scrapper - hlási chybu`,
    text: `Ahoj, ${typeOfScraper} scrapper hlási chybu. ${
      err ? `Chyba:  ${err}` : ``
    }`,
    html: `Ahoj, ${typeOfScraper} scrapper hlási chybu. <br> ${
      err && `<strong>Chyba:</strong> ${err}`
    }`,
  });
};

module.exports = sendErrorEmail;
