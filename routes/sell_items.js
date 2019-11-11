var express = require('express');
var mysql = require('mysql');
var con = require('../dbconfig');

var router = express.Router();


/* GET Sell Page*/
router.get('/sell', function (req, res, next) {

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

});

/* POST Sell page form */
router.post('/sell', function (req, res) {
    var cost = req.body.cost;
    var category = req.body.category;
    var picture_url = 'www.google.com';
    var description = req.body.description;
    var ownerid = 'uaa010';
    var discount = 0;
    var features = 'Manual;TOO MUCH DATA TEJAS!';
    var available_flags = 1;

    /* Code to extract max pkey in column and increase it by 1 (Format: po001 -->  po002) */
    let max_pkey = "SELECT MAX(product_id) FROM product";
    con.query(max_pkey, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        var pkey_max = results[0]['MAX(product_id)'];
        pkey_max = pkey_max.substr(2);

        var int_pkey_max = parseInt(pkey_max) + 1;
        var convert_to_string = String(int_pkey_max);
        console.log(convert_to_string.length);
        var pkey_max_new = 'po' + convert_to_string.padStart(3, '0');

        /* Fetch Category_ID correcponding to category from table */
        let category_sql = 'SELECT category_id FROM category WHERE name=?';
        con.query(category_sql, category, (error, results, fields) => {
            if (error) {
                return console.error(error.message);
            }
            var category_id = results[0].category_id;

            /*Insert Row in Table */
            var newrow = [[pkey_max_new, category, category_id, picture_url, description, cost, discount, features, ownerid, available_flags]]
            console.log(newrow);
            let insert_row = "INSERT INTO product VALUES ?";
            con.query(insert_row, [newrow], (error, results, fields) => {
                if (error) {
                    return console.error(error.message);
                }
                res.sendStatus(200);
            });
        });
    });
});

module.exports = router;
