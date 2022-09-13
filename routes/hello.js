var axios = require("axios");
var express = require("express");
var router = express.Router();

const apiUrl = process.env.BACKEND_API_URL;
const accessToken = process.env.API_ACCESS_TOKEN;

// function to get the data from the API
let getData = async () => {
  let response = await axios.post(
    `${apiUrl}/helloworld`,
    { name: "Lucas" },
    {
      headers: { authorization: `Bearer ${accessToken}` },
    }
  );
  return response.data;
};

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const data = await getData();
  res.render("index", { title: data });
});

module.exports = router;
