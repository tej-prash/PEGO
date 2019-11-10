var express = require('express');
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "sumSVR@1",
    database: "pego",
    port: 3306
});
var router = express.Router();

//Setup a connection
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    sql = "";
});

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
    var features = 'Manual;TOO MUCH DATA';
    var available_flags = 1;
    var product_id = 'po012';

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
});

module.exports = router;
