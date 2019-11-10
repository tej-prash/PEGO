var express = require('express');
var con = require('./../dbconfig');

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  let insert_sql = 'SELECT * FROM category';
  con.query(insert_sql, (error, results, fields) => {
      if (error) {
          return console.error(error.message);
      }
      res.render('index', {
        page: 'Home', menuId: 'home', data:results
      });
  });
});

/* Perform login authentication */
router.post('/login',function(req,res,next) {
  // console.log(req.body);
  var email=req.body.email_id;
  var password=req.body.password;
  let sql="select pw from users where email_id='"+email+"'";
  con.query(sql, (error, results, fields) => {
    if (error) {
        return console.error(error.message);
    }
    console.log(results);
      var pw=results[0].pw;
      if(pw==password){
        res.status(200).send("SUccess!");
      }
      else{
        res.status(204).send("Failed");
      }
  });
});


/* View details of items page */
router.get('/viewProduct',function(req,res,next){
  console.log("Called");
  // console.log(req);
  // var product_id=req.body.product_id;
  var product_id=req.query['product_id'];
  sql="SELECT * FROM PRODUCT WHERE PRODUCT_ID='"+product_id+"'";
  console.log(sql);
  con.query(sql,function(err,results){
    if ( err){
      console.log("Error in query 1");
      console.log(err);
      res.send({message:'database error',error:err});
    } else {
        console.log(results[0]);
        res.render('display_item',{data:results[0]});
        //res.status(200).send("Success");
    }
  
  });

});
module.exports = router;
