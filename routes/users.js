var axios = require("axios");
var express = require("express");
var router = express.Router();

// function to get the data from the API
let getData = async () => {
  let response = await axios.get(`https://catfact.ninja/fact`);
  return response;
};

/* GET users listing. */
router.get("/", async function (req, res, next) {
  let result = await getData();
  // res.send(result.data.fact);

  res.render("index", { title: result.data.fact });
});

module.exports = router;
