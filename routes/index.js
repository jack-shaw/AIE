let express = require("express")
let router = express.Router()

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Aesthetic Ideas Exchange Platform" })
})

module.exports = router
