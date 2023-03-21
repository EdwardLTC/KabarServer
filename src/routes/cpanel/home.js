const express = require("express");
const router = express.Router();

//http://localhost:3000/cpanel/homes
router.get("/", (req, res) => {
  const arr = Array.from({ length: 5 }, (_, index) => ({
    ORDER: index.toString(),
    STATUS: "HAHA",
    OPERATORS: "Oliver Trag",
    LOCATION: "London, UK",
    DISTANCE: "485 km",
    START_DATE: new Date(),
    EST_DELIVERY_DUE: new Date(),
  }));
  res.render("index", { list: arr });
});

module.exports = router;
