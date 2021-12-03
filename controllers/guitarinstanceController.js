var Guitar = require('../models/guitar');
var GuitarInstance = require('../models/guitarinstance');
var Manufacturer = require('../models/manufacturer');
var Pickup = require('../models/pickup');

var async = require('async');

// Display list of all guitar instances
exports.guitarinstance_list = function(req, res, next) {

    GuitarInstance.find()
    .populate('guitar')
    .exec(function(err, list_guitarinstances) {
        if (err) { return next(err); }
        // Success
        res.render('guitarinstance_list', {title: 'Current Guitar Stock', guitarinstance_list : list_guitarinstances});
    });
}