var express = require('express');
var router = express.Router();

/* GET home page redirect. */
router.get('/', function(req, res, next) {
  res.redirect('/inventory');
});

module.exports = router;
