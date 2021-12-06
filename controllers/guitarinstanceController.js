var Guitar = require('../models/guitar');
var GuitarInstance = require('../models/guitarinstance');
var Manufacturer = require('../models/manufacturer');
var Pickup = require('../models/pickup');

var async = require('async');

// Display list of all guitar instances GET
exports.guitarinstance_list = function(req, res, next) {

    GuitarInstance.find()
    .populate('guitar')
    .exec(function(err, list_guitarinstances) {
        if (err) { return next(err); }
        // Success
        res.render('guitarinstance_list', {title: 'Current Guitar Stock', guitarinstance_list : list_guitarinstances});
    });
}

// Display one guitar instance GET
exports.guitarinstance_detail = function(req, res, next) {

    GuitarInstance.findById(req.params.id)
    .populate('guitar')
    .exec(function(err, instance_guitar) {
        if (err) { return next(err); }
        // Success
        res.render('guitarinstance_detail', {title: instance_guitar.guitar.model, guitarinstance: instance_guitar});
    });

}

// Display guitar instance delete GET
exports.guitarinstance_delete_get = function(req, res, next) {

    GuitarInstance.findById(req.params.id)
    .populate('guitar')
    .exec(function(err, instance_guitar) {
        if (err) { return next(err); }
        // Success
        res.render('guitarinstance_delete', {guitarinstance: instance_guitar});
    });

}

// Handle guitar instance delete POST
exports.guitarinstance_delete_post = function(req, res, next) {

    GuitarInstance.findById(req.body.guitarinstanceid)
    .exec(function(err, guitarinstance) {
        if (err) { return next(err); }
        // Success
        GuitarInstance.findByIdAndDelete(req.body.guitarinstanceid, function(err) {
            if (err) { return next(err); }
            // Success and redirect
            res.redirect('/inventory/guitarinstance/all');
        });
    });

}