var Manufacturer = require('../models/manufacturer');
var Guitar = require('../models/guitar');

var async = require('async');

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

// Display one manufacturer
exports.manufacturer_detail = function(req, res, next) {

    async.parallel({
        manufacturer: function(callback) {

            Manufacturer.findById(req.params.id)
            .exec(callback);

        },
        guitar: function(callback) {

            Guitar.find({'manufacturer': req.params.id})
            .populate('pickup')
            .exec(callback);

        },
    }, function(err, results) {
        if (err) { return next(err); }
        // Success
        res.render('manufacturer_detail', {title: results.manufacturer.name, manufacturer: results.manufacturer, guitars: results.guitar});
        }
    );
    
}