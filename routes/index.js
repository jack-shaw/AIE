let express = require("express")
let router = express.Router()

/* GET home page. */// eslint-disable-next-line no-unused-vars
router.get("/", function(req, res, next) {
  res.render("index", { title: "Aesthetic Ideas Exchange Platform" })
})

module.exports = router
