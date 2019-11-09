var express = require('express');
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  port: 3306
});
var router = express.Router();

/* GET category listing. */
router.get('/:category_name', function (req, res, next) {
  var category = req.params['category_name'];

  //Setup a connection
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    sql = "";
    });
  //Query database to fetch records matching the given category

  res.render('display_results.ejs');
});

module.exports = router;
