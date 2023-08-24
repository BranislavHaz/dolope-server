const transporter = require("../connectMailer");

const sendErrorEmail = async (type, err = false) => {
  const error = err ? `Chyba: ${err}` : ``;

  await transporter.sendMail({
    from: '"Webscrapper" <dolope@dolope.cz>',
    to: "haz.branislav@gmail.com",
    subject: `${type} scrapper - hlási chybu`,
    text: `Ahoj, ${type} scrapper hlási chybu. ${error}`,
    html: `Ahoj, ${type} scrapper hlási chybu. ${error}`,
  });
};

module.exports = sendErrorEmail;
