var Pickup = require('../models/pickup');
var Guitar = require('../models/guitar');

var async = require('async');

// Displays list of all pickups GET
exports.pickup_list = function(req, res, next) {

    Pickup.find()
        .sort([['name', 'descending']])
        .exec(function (err, list_pickups) {
            if (err) { return next(err); }
            // Success
            res.render('pickup_list', {title: 'The Two Main Pickups', pickup_list: list_pickups});
    });
    
}

// Display one pickup GET
exports.pickup_detail = function(req, res, next) {

    async.parallel({

        pickup: function(callback) {
            Pickup.findById(req.params.id)
            .exec(callback)
        },
        guitar_list: function(callback) {
            Guitar.find({'pickup': req.params.id})
            .populate('manufacturer')
            .sort([['model', 'descending']])
            .exec(callback)
        },

    }, function(err, results) {
        if (err) { return next(err); }
        // Success
        res.render('pickup_detail', {title: results.pickup.name, pickup: results.pickup, guitars: results.guitar_list});
    });

}