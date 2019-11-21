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
        // Registration required
        res.status(205).send();
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

/* Perform user registration */ 
// TO DO: Complete backend for user registration
router.post('/register',function(req,res,next) {
  // console.log(req.body);
  var email=req.body.email_id;
  var password=req.body.password;
  var fullname=req.body.fullname;
  var username=req.body.username;
  var phone=req.body.phone;
  var gender=req.body.gender;
  step(
    function get_user_id(){
      let sql="select count(*) from `users`";
      con.query(sql,this);
    },
    function insert_user_details(err,results){
        if (error) {
          // Registration required
          console.log(error);
          res.status(204).send();
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
    }
  );
});

/* Search category */
router.get('/categorysearch/:category_name', function(req,res,next){
     let category_to_match=req.params['category_name'];
      function strncasecmp (argStr1, argStr2, len) {
        //  discuss at: https://locutus.io/php/strncasecmp/
        // original by: Saulo Vallory
        //    input by: Nate
        // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
        //      note 1: Returns < 0 if str1 is less than str2 ; > 0
        //      note 1: if str1 is greater than str2, and 0 if they are equal.
        //   example 1: strncasecmp('Price 12.9', 'Price 12.15', 2)
        //   returns 1: 0
        //   example 2: strncasecmp('Price 12.09', 'Price 12.15', 10)
        //   returns 2: -1
        //   example 3: strncasecmp('Price 12.90', 'Price 12.15', 30)
        //   returns 3: 8
        //   example 4: strncasecmp('Version 12.9', 'Version 12.15', 20)
        //   returns 4: 8
        //   example 5: strncasecmp('Version 12.15', 'Version 12.9', 20)
        //   returns 5: -8
      
        var diff
        var i = 0
        var str1 = (argStr1 + '').toLowerCase().substr(0, len)
        var str2 = (argStr2 + '').toLowerCase().substr(0, len)
        console.log("str1 "+str1);
        console.log("str2 "+str2);
        if (str1.length !== str2.length) {
          if (str1.length < str2.length) {
            len = str1.length
            if (str2.substr(0, str1.length) === str1) {
              // return the difference of chars
              return str1.length - str2.length
            }
          } else {
            len = str2.length
            // str1 is longer than str2
            if (str1.substr(0, str2.length) === str2) {
              // return the difference of chars
              return str1.length - str2.length
            }
          }
        } else {
          // Avoids trying to get a char that does not exist
          len = str1.length
        }
      
        for (diff = 0, i = 0; i < len; i++) {
          diff = str1.charCodeAt(i) - str2.charCodeAt(i)
          if (diff !== 0) {
            return diff
          }
        }
        console.log("zero!!");
        return 0
      }
  let search_cat= 'SELECT name FROM category';
  con.query(search_cat, (error, results, fields) => {
      if (error) {
          return console.error(error.message);
      }
      var ress=[];
      var i=0;
      while(i<(results.length)){
        //$line=trim(fgets($file));
          if(strncasecmp(results[i].name,category_to_match,category_to_match.length)==0){
            ress.push(results[i].name);  
      }
      i=i+1; 
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(ress);
  });
})

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
  else{
    res.redirect("/");
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
            var sql2="select fullname,email_id,rating,user_id from users where user_id=(select ownerid from product where product_id='"+product_id+"')";
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

router.post("/getuseraddress",function(req,res,next){
    console.log("user address");
    var userId=req.body.user_id;
    console.log(req.body.user_id);
    step(
        function get_user_address(){
            var sql="SELECT * from `useraddress` where user_id='"+userId+"'";
            con.query(sql,this);
        },
        function return_address(err,results){
            if(err){
              console.log(err);
            }
            else{
              console.log(results);
              res.json(results);
            }
        }
    );
});

module.exports = router;
