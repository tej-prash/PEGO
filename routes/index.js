var express = require('express');
var con = require('./../dbconfig');
var step=require('step');

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  let insert_sql = 'select * from category';
  con.query(insert_sql, (error, results, fields) => {
      if (error) {
          return console.error(error.message);
      }
      if(req.session.name){
        res.render('index', {
          page: 'Home', menuId: 'home', data:results,name:req.session.name
        });
      }
      else{
        res.render('index', {
          page: 'Home', menuId: 'home', data:results,name:null
        });
      }
  });
});

/* Perform login authentication */
router.post('/login',function(req,res,next) {
  // console.log(req.body);
  var email=req.body.email_id;
  var password=req.body.password;
  let sql="select pw,fullname,user_id from users where email_id='"+email+"'";
  con.query(sql, (error, results, fields) => {
    if (error) {
        return console.error(error.message);
    }
    console.log(results);
      var pw=results[0].pw;
      if(pw==password){
        req.session.name=results[0].fullname;
        req.session.user_id=results[0].user_id;
        res.status(200).send("SUccess!");
        
      }
      else{
        res.status(204).send("Failed");
      }
  });
});

/* Logout */
router.get('/logout',function(req,res,next) {
  if(req.session.name){
    req.session.destroy((err)=>{
      if(err){
        console.log(err);
      }
      else{
        res.redirect("/");  
      }
    });
  }

});

/* View details of items page */
router.get('/viewProduct',function(req,res,next){
  console.log("Called");
  // console.log(req);
  // var product_id=req.body.product_id;
  var product_id=req.query['product_id'];
  // console.log(sql);
  let owner_info,product_info;
  step(
    function get_product(){
      var sql="select * from product where product_id='"+product_id+"'";
      con.query(sql,this);
    },
    function get_owner_info(err,results){
        if ( err){
          console.log("Error in query 1");
          console.log(err);
          res.send({message:'database error',error:err});
        } else {
            product_info=results;
            /* Query to get owner info */
            var sql2="select fullname,email_id,rating from users where user_id=(select ownerid from product where product_id='"+product_id+"')";
            con.query(sql2,this);
          }
    },
    function render_results(err,results){
      if(err){
        console.log(err);
        res.send({message:'database error',error:err});
      }
      else{
        console.log(results[0]);
        console.log(product_info[0]);
        owner_info=results;
        res.render('display_item',{product_info:product_info[0],owner_info:owner_info[0]});
      }
    }      
  );
});
module.exports = router;
