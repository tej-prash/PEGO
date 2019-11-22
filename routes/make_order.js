var express = require('express');
var mysql = require('mysql');
var con = require('./../dbconfig');
var step=require('step')
var path=require('path')

var router = express.Router();

/* Validate order */
router.post('/validateOrder',function(req,res,next){
    console.log("Validate order called");
    if(req.session.name){
        console.log(req.body.product_id);
        let product_id;
        product_id=req.body.product_id;
        console.log(product_id);
        step(
            function get_details(){
                /* Insert a query into payment table */
                sql="SELECT ownerid from product where product_id='"+product_id+"'";
                con.query(sql,this);
            },
            function render_results(err,results){
                if(err){
                    console.log("Error in query");
                    console.log(err);
                }
                else{
                    var ownerid=results[0].ownerid;
                    if(ownerid==req.session.user_id){
                        res.status(204).send();
                    }
                    else{
                        res.status(200).send();
                    }
                }
            }
        );
    }
    else{
        /* Ask the user to login */
        res.sendFile(path.join(__dirname,"../public/web","loginPage.html"));
    }

});

/* Confirm order */
router.get('/confirmOrder',function(req,res,next){
    console.log("called");
    if(req.session.name){
        let product_id=req.query['product_id'];
        step(
            function get_details(){
                /* Insert a query into payment table */
                sql="SELECT name,description,cost,discount,product_id from product where product_id='"+product_id+"'";
                con.query(sql,this);
            },
            function render_results(err,results){
                if(err){
                    console.log("Error in query");
                    console.log(err);
                }
                else{
                    var prod=results[0];
                    prod.amount=(parseFloat(prod.cost)-parseFloat(prod.discount))*1.01
                    res.render('confirmationPage',{product_info:prod});
                }
            }
        );
    }
    else{
        /* Ask the user to login */
        res.sendFile(path.join(__dirname,"../public/web","loginPage.html"));
    }

});

/* GET category listing. */
router.post('/orderProduct',function(req,res,next){
    if(req.session.name){
        console.log("called");
        let payment_id,order_id,cust_id,product_id,total_amount;
        cust_id=req.session.user_id;
        product_id=req.body.product_id;
        total_amount=req.body.total_amount;
        step(
            function insert_payment(){
                /* Insert a query into payment table */
                sql="INSERT INTO payment(`paymenttype`) VALUES('Card')";
                con.query(sql,this);
            },
            function get_payment_id(err,results){
                if(err){
                    console.log("Error in insert_payment");
                    console.log(err);
                    res.status(204).send("err");
                }
                else{
                    console.log("FInished insert_payment");
                    sql2="SELECT ROW_COUNT()";
                    con.query(sql2,this);
                }
            },
            function get_order_id(err,results){
                if(err){
                    console.log("Error in get_payment_id");
                    console.log(err);
                    res.status(204).send("err");
                }
                else{
                    console.log("FInished get_payment_id");
                    payment_id=parseInt(results[0]['ROW_COUNT()']);
                    sql3="SELECT COUNT(*) FROM `order`";
                    con.query(sql3,this);
                }
            },
            function insert_order(err,results){
                if(err){
                    console.log("Error in get_order_id");
                    console.log(err);
                    res.status(204).send("err");
                }
                else{
                    console.log("FInished get_order_id");
                    console.log(results[0]);
                    var next_id=parseInt(results[0]['COUNT(*)'])+1;
                    order_id="OD"+next_id.toString();
                    var currentDate=new Date();
                    var YearMonthDate=currentDate.getFullYear()+"-"+(currentDate.getMonth()+1)+"-"+currentDate.getDate();
                    var time_js=currentDate.getHours()+":"+currentDate.getMinutes()+":"+currentDate.getSeconds();
                    var time_order=YearMonthDate+" "+time_js;
                    // Create new Date instance
                    var date = new Date()
                    // Add a day
                    date.setDate(date.getDate() + 2)
                    var ship_date=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" 00:00:00";

                    sql3="INSERT INTO `order`(`order_id`,`productid`,`cust_id`,`paymentid`,`shipdate`,`total_amount`,`time_of_order`) VALUES('"+order_id+"','"+product_id+"','"+cust_id+"',"+payment_id+",'"+ship_date+"','"+total_amount+"','"+time_order+"')";
                    con.query(sql3,this);
                }
            },
            function make_product_unavailable(err,results){
                if(err){
                    console.log("Error in insert_order");
                    console.log(err);
                    res.status(204).send("err");
                }
                else{
                    console.log("FInished insert_order");
                    sql4="UPDATE product SET available_flag=0 WHERE product_id='"+product_id+"'";
                    con.query(sql4,this);
                }
            },
            function render_results(err,results){
                if(err){
                    console.log("Error in make_product_unavailable");
                    console.log(err);
                    res.status(204).send("err");
                }
                else{
                    console.log("Payment successfull!");
                    res.redirect("/");
                }
            }
        );
    }
    else{
        /* Ask the user to login */
        window.location.href="/login";
    }
});

module.exports = router;
