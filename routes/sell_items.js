var express = require('express');
var con = require('../dbconfig');
var formidable = require('formidable');
var fs = require('fs')
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
    console.log("entered sell")
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if(err){
            console.log(err);
        }
        var oldpath = files.filetoupload.path;
        var newpath = '../images/' + files.filetoupload.name;
        console.log("newpath"+newpath);
        fs.rename(oldpath, newpath, function (err) {
            var cost = fields['cost'];
            var category = fields['category'];
            var picture_url;
            var name_product = fields['description'];
            var description = fields['description'];
            var ownerid = req.session.user_id;
            var discount = 0;
            var features = 'Feature 1;Feature 2';
            var available_flags = 1;

            /* Code to extract max pkey in column and increase it by 1 (Format: po001 -->  po002) */
            let max_pkey = "SELECT product_id FROM `product` ORDER BY product_id DESC LIMIT 1";
            con.query(max_pkey, (error, results, fields) => {
                if (error) {
                    return console.error(error.message);
                }
                var last_part_id=parseInt(results[0].product_id.substr(2));
                product_id="po"+(last_part_id+1).toString();
                picture_url="/"+product_id;
                /*var pkey_max = results[0]['MAX(product_id)'];
                pkey_max = pkey_max.substr(2);

                var int_pkey_max = parseInt(pkey_max) + 1;
                var convert_to_string = String(int_pkey_max);
                var pkey_max_new = 'po' + convert_to_string.padStart(3, '0');*/
                console.log("product id"+product_id);

                /* Fetch Category_ID correponding to category from table */
                let category_sql = 'SELECT category_id FROM category WHERE name=?';
                con.query(category_sql, category, (error, results, fields) => {
                    if (error) {
                        return console.error(error.message);
                    }
                    var category_id = results[0].category_id;
                    console.log("category id"+category_id);

                    /*Insert Row in Table */
                    var newrow = [[product_id,name_product ,category_id, picture_url, description, cost, discount, features, ownerid, available_flags]]
                    console.log(newrow);
                    let insert_row = "INSERT INTO product VALUES ?";
                    con.query(insert_row, [newrow], (error, results, fields) => {
                        if (error) {
                            return console.error(error.message);
                        }
                        res.redirect('/sell');
                    });
                });
            });
        });
    });
    // form.on('end', function () {
    //     res.end('success');
    // });
});

module.exports = router;
