var express = require('express');
var mysql = require('mysql');
var con = require('./../dbconfig');
var step=require('step')

var router = express.Router();


/* GET category listing. */
/*router.get('/:category_name', function (req, res, next) {
  console.log("entered!");
  var category = req.params['category_name'];
  console.log(category);
  step(
    function get_category_id(){
      //Query database to fetch category id
      sql1 = "select category_id FROM category where name='"+category+"'";
      con.query(sql1,this);
    },
    function get_products(err1, res1){
      if ( err1){
        console.log("Error in query 1");
        console.log(err1);
      } else {
          console.log("Success");
          category_id=res1[0].category_id;
          console.log(category_id);
          //Query database to fetch all products matching a particular category
          sql2 = "SELECT * FROM PRODUCT WHERE CATEGORY_ID='"+category_id+"' AND available_flag=1";
          con.query(sql2,this);
      }
    },
    function render_results(err2, results){
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
    }
  );
});*/

/* Load bare minimum UI */
router.get('/displaycatname/:cat_name', function(req,res, next){
  var catname=req.params['cat_name'];
  res.render('category',{
    category_name: catname
  })
});

/* GET category listing. */
router.post('/:category_name', function (req, res, next) {
  console.log("entered!");
  var category = req.body.category;
  var count=req.body.count;
  console.log(category);
  step(
    function get_category_id(){
      //Query database to fetch category id
      sql1 = "select category_id FROM category where name='"+category+"'";
      con.query(sql1,this);
    },
    function get_products(err1, res1){
      if ( err1){
        console.log("Error in query 1");
        console.log(err1);
      } else {
          console.log("Success");
          category_id=res1[0].category_id;
          console.log(category_id);
          //Query database to fetch 2 products matching a particular category
          sql2 = "SELECT * FROM PRODUCT WHERE CATEGORY_ID='"+category_id+"' AND available_flag=1 LIMIT "+count+",5";
          con.query(sql2,this);
      }
    },
    function render_results(err2, results){
      if ( err2 ){
        console.log("Error in query 2");
        console.log(err2);
      } else {
        console.log("Success");
        console.log(results);
        //res.render('display_results',{
          //data:results,category_name:category
        //});
        // res.setHeader('Content-Type', 'application/json');
        res.json(results);
      }
    }
  );
});

module.exports = router;
