var express = require('express');
var con = require('./../dbconfig');

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    page: 'Home', menuId: 'home', data: [{ name: 'Car' }, { name: 'Electronics' }]
  });
});

/* GET Sell Page*/
router.get('/sell', function (req, res, next) {
  res.render('sell', { page: 'Sell', menuId: 'sell', data: [{ name: 'Car' }, { name: 'Electronics' }] });
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
