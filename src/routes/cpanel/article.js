const express = require("express");
const router = express.Router();

//http://localhost:3000/cpanel/article/{id}/delete
router.delete("/:order/delete", async (req, res, next) => {
  try {
    const { order } = req.params;
    if (order) {
      res.json({ order });
    }
  } catch (error) {
    res.json("ngu");
  }
});

module.exports = router;
