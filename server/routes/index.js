const router = require("express").Router();
console.log("here");
router.get("/me", (req, res) => res.send("I'm hooked!"));

module.exports = router;
