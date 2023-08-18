var express = require("express");
var app = express();
app.get("/", function (req, res) {
  res.send("Ahoj svet!");
});
app.listen(8080, function () {
  console.log("Príklad aplikácie počúva na porte 3000!");
});
