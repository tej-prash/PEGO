var express = require('express');
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

module.exports = router;
