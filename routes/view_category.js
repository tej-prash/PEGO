var express = require('express');
var mysql = require('mysql');
var con = require('./../dbconfig');

var router = express.Router();


/* GET category listing. */
router.get('/:category_name', function (req, res, next) {
  console.log("entered!");
  var category = req.params['category_name'];
  console.log(category);
 
  //Query database to fetch category id
  sql1 = "SELECT CATEGORY_ID FROM CATEGORY WHERE NAME='"+category+"'";
  con.query(sql1, function(err1, res1){
    if ( err1){
      console.log("Error in query 1");
      console.log(err1);
    } else {
        console.log("Success");
        category_id=res1[0].CATEGORY_ID;
        //Query database to fetch all products matching a particular category
        sql2 = "SELECT * FROM PRODUCT WHERE CATEGORY_ID='"+category_id+"'";
        con.query(sql2, function(err2, results){
          if ( err2 ){
             console.log("Error in query 2");
             console.log(err2);
          } else {
            console.log("Success");
            console.log(results);
            res.render('display_results',{
              data:results,category_name:category
            });
          }
        });
    }
  });
});

module.exports = router;
