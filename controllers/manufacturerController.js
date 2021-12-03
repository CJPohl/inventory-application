var Manufacturer = require('../models/manufacturer');

// Display list of all manufacturers
exports.manufacturer_list = function(req, res, next) {

    Manufacturer.find()
    .sort([['name', 'ascending']])
    .exec(function(err, list_manufacturers) {
        if (err) { return next(err); }
        // Sucess
        res.render('manufacturer_list', {title: 'Our Guitar Manufacturers', manufacturer_list: list_manufacturers});
    });
    
}