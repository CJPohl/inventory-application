var Guitar = require('../models/guitar');
var GuitarInstance = require('../models/guitarinstance');
var Manufacturer = require('../models/manufacturer');
var Pickup = require('../models/pickup');

var async = require('async');
const { body,validationResult } = require('express-validator');

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

// Display guitar instance create GET
exports.guitarinstance_create_get = function(req, res, next) {
    
    Guitar.find()
    .exec(function(err, guitar_list) {
        if (err) { return next(err); }
        // Success
        res.render('guitarinstance_form', {title: 'Create Form', guitars: guitar_list});
    });

}

// Handle guitar instance create POST
exports.guitarinstance_create_post = [

    // Validation and Sanitation
    body('guitarinstance_guitar').trim().escape(),
    body('guitarinstance_status').trim().escape(),

    // Process req
    (req, res, next) => {


        // Extract errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            Guitar.find()
            .exec(function(err, guitar_list) {
                if (err) { return next(err); }
                // Success
                res.render('guitarinstance_form', {title: 'Create Form', guitarinstance: req.body, guitars: guitar_list});
            });

            return;
        }
        else {
             // Form data is valid

            // Guitar instance Object
            var guitarinstance = new GuitarInstance(
                {
                    guitar: req.body.guitarinstance_guitar,
                    status: req.body.guitarinstance_status
                }
            );

            guitarinstance.save(function (err) {
                if (err) { return next(err); }
                // Success
                res.redirect(guitarinstance.url);
            });
        }
    }
]

exports.guitarinstance_update_get = function(req, res, next) {

    async.parallel({
        guitarinstance: function(callback) {
            GuitarInstance.findById(req.params.id)
            .populate('guitar')
            .exec(callback)
        },
        guitars: function(callback) {
            Guitar.find()
            .exec(callback)
        },
    }, function (err, results) {
        if (err) { return next(err); }
        // Success
        res.render('guitarinstance_form', {title: 'Update Form', guitarinstance: results.guitarinstance, guitars: results.guitars})
    });
    
}

exports.guitarinstance_update_post = [

     // Validation and Sanitation
     body('guitarinstance_guitar').trim().escape(),
     body('guitarinstance_status').trim().escape(),

    // Process req
    (req, res, next) => {

        // Extract errors
        const errors = validationResult(req);

        var guitarinstance = new GuitarInstance({
                guitar: req.body.guitarinstance_guitar,
                status: req.body.guitarinstance_status,
                _id: req.params.id
            }
        );

        if (!errors.isEmpty()) {
            Guitar.find()
            .exec(function (err, guitar_list) {
                if (err) { return next(err); }
                // Success
                res.render('guitarinstance_form', {title: 'Update Form', guitarinstance: req.body, guitars: guitar_list});
                return;
                }
            );
        }
        else {
            // Form data is valid
            GuitarInstance.findByIdAndUpdate(req.params.id, guitarinstance, {}, function (err, theguitarinstance) {
                if (err) { return next(err); }
                // Success
                res.redirect(theguitarinstance.url);
            });
        }
    }
]