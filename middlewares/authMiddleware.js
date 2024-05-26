require("dotenv").config();

const authMiddleware = (req, res, next) => {
  const userToken = req.headers["authorization"];
  console.log("header: " + req.headers.authorization);
  console.log("ff: " + userToken);
  console.log("fb: " + process.env.AUTH_TOKEN);

  if (!userToken) {
    return res
      .status(401)
      .send("Prístup zamietnutý: Nebol poskytnutý žiaden token.");
  }

  if (userToken !== process.env.AUTH_TOKEN) {
    return res.status(403).send("Prístup zamietnutý: Nesprávny token.");
  }

  next();
};

module.exports = authMiddleware;
