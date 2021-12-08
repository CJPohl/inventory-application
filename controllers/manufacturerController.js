var Manufacturer = require('../models/manufacturer');
var Guitar = require('../models/guitar');

var async = require('async');
const { body,validationResult } = require('express-validator');

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

exports.manufacturer_delete_get = function(req, res, next) {

    async.parallel({

        manufacturer: function(callback) {
            Manufacturer.findById(req.params.id)
            .exec(callback);
        },
        guitars: function(callback) {
            Guitar.find({'manufacturer': req.params.id})
            .populate('pickup')
            .exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        // Success
        res.render('manufacturer_delete', {manufacturer: results.manufacturer, guitars: results.guitars});
        }
    );

}

exports.manufacturer_delete_post = function(req, res, next) {

    Manufacturer.findById(req.body.manufacturerid)
    .exec(function(err, manufacturer) {
        if (err) { return next(err); }
        Manufacturer.findByIdAndDelete(req.body.manufacturerid, function(err) {
            if (err) { return next(err); }
            // Success and redirect
            res.redirect('/inventory/manufacturer/all');
        });
    });
    
}

exports.manufacturer_create_get = function(req, res, next) {
    res.render('manufacturer_form', {title: 'Create Form'});
}

exports.manufacturer_create_post = [

    // Validation and sanitation
    body('manufacturer_name').trim().isLength({ min: 1}).escape().withMessage('Manufacturer name must be specified.')
        .isAlphanumeric().withMessage('Manufacturer name has non-alphanumeric characters'),
    body('manufacturer_description').trim().isLength({ min: 1}).escape().withMessage('Manufacturer description must be specified.'),
    body('manufacturer_founding').isISO8601().toDate(),

    // Process req
    (req, res, next) => {

        // Extract errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render('manufacturer_form', {title: 'Create Form', manufacturer: req.body, errors: errors.array()});
            return;
        }
        else {
            // Form data is valid

            // Manufacturer Object
            var manufacturer = new Manufacturer(
                {
                    name: req.body.manufacturer_name,
                    description: req.body.manufacturer_description,
                    founding: req.body.manufacturer_founding
                }
            );
            
            manufacturer.save(function (err) {
                if (err) { return next(err); }
                // Success
                res.redirect(manufacturer.url);
            });
        }
    }
]

exports.manufacturer_update_get = function(req, res, next) {
    
    Manufacturer.findById(req.params.id)
    .exec(function(err, manufacturer) {
        if (err) { return next(err); }
        // Success
        res.render('manufacturer_form', {title: 'Update Form', manufacturer: manufacturer});
    });
}

exports.manufacturer_update_post = [

    // Validate and Sanitize
    body('manufacturer_name').trim().isLength({ min: 1}).escape().withMessage('Manufacturer name must be specified.')
        .isAlphanumeric().withMessage('Manufacturer name has non-alphanumeric characters'),
    body('manufacturer_description').trim().isLength({ min: 1}).escape().withMessage('Manufacturer description must be specified.'),
    body('manufacturer_founding').isISO8601().toDate(),

     // Process req
     (req, res, next) => {

        // Extract errors
        const errors = validationResult(req);

        // Manufacturer Object
        var manufacturer = new Manufacturer(
            {
                name: req.body.manufacturer_name,
                description: req.body.manufacturer_description,
                founding: req.body.manufacturer_founding,
                _id: req.params.id
            }
        );
        
        if (!errors.isEmpty()) {
            res.render('manufacturer_form', {title: 'Update Form', manufacturer: req.body, errors: errors.array()});
            return;
        }
        else {
            // Form data is valid
            Manufacturer.findByIdAndUpdate(req.params.id, manufacturer, {}, function (err, themanufacturer) {
                if (err) { return next(err); }
                // Success
                res.redirect(themanufacturer.url);
            }); 
        }
    }
]
