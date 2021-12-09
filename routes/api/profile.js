const express = require("express");
const router = express.Router();

// @route  GET api/profile
// @des    test route
// @access Public
router.get("/", (req, res) => {
  res.send("user profile");
});

module.exports = router;
