var express = require('express');
var mysql = require('mysql');
var con = require('../dbconfig');
var step=require('step')
var path=require('path')

var router = express.Router();


/* GET Sell Page*/
router.get('/sell', function (req, res, next) {
    if(req.session.name){
        let insert_sql = 'SELECT * FROM category';
        con.query(insert_sql, (error, results, fields) => {
            if (error) {
                return console.error(error.message);
            }

            /* Auto fill categories from DB */
            var resultArray = Object.values(JSON.parse(JSON.stringify(results)));
            res.render('sell', {
                page: 'Sell', menuId: 'sell', data: resultArray
            });
        });
    }
    else{
        /* Ask the user to login */
        res.sendFile(path.join(__dirname,"../public/web","loginPage.html"));
    }
});

/* POST Sell page form */
router.post('/sell', function (req, res) {
    var cost = req.body.cost;
    var category = req.body.category;
    var picture_url;
    var description = req.body.description;
    var ownerid = req.session.user_id;
    var discount = 0;
    var features = 'Feature 1; Feature 2';
    var available_flags = 1;


    var product_id;
    step(
        function get_product_id(){
            /* Query to get produt id */
            sql1="SELECT product_id FROM `product` ORDER BY ID DESC LIMIT 1";
            con.query(sql1,this);
        },
        function insert_product(err,results){
            var last_part_id=parseInt(results[0].product_id.substr(2));
            product_id="po"+(last_part_id+1).toString();
            picture_url="/"+product_id;
            /* Fetch Category_ID correcponding to category from table */
            let category_sql = 'SELECT category_id FROM category WHERE name=?';
            con.query(category_sql, category, (error, results, fields) => {
                if (error) {
                    return console.error(error.message);
                }
                var category_id = results[0].category_id;

                /*Insert Row in Table */
                var newrow = [[product_id, category, category_id, picture_url, description, cost, discount,features, ownerid, available_flags]]
                console.log(newrow);
                let insert_row = "INSERT INTO product VALUES ?";
                con.query(insert_row, [newrow], (error, results, fields) => {
                    if (error) {
                        return console.error(error.message);
                    }
                    res.sendStatus(200);
                });

            });
        }
    );
});

module.exports = router;
