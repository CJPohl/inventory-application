var Guitar = require('../models/guitar');
var GuitarInstance = require('../models/guitarinstance');
var Manufacturer = require('../models/manufacturer');
var Pickup = require('../models/pickup');

var async = require('async');
const { body,validationResult } = require('express-validator');

exports.index = function(req, res) {
    async.parallel({
        guitar_count: function(callback) {
            Guitar.countDocuments({}, callback);
        },
        manufacturer_count: function(callback) {
            Manufacturer.countDocuments({}, callback);
        },

        guitar_instance_count: function(callback) {
            GuitarInstance.countDocuments({}, callback);
        },
        guitar_instance_refurbished_count: function(callback) {
            GuitarInstance.countDocuments({status:'Refurbished'}, callback);
        },
    }, function(err, results) {
        res.render('index', { error: err, data: results });
    });
};

// Display List of all guitars
exports.guitar_list = function(req, res, next) {
    Guitar.find({}, 'model manufacturer pickup')
    .sort({model: 1})
    .populate('manufacturer')
    .exec(function(err, list_guitar) {
        if (err) { return next(err); }
        // Success
        res.render('guitar_list', {title: 'All Guitar Models', guitar_list: list_guitar})
    });
};

// Display page for a specific guitar on GET
exports.guitar_detail = function(req, res, next) {

    async.parallel({
        guitar: function(callback) {
            
            Guitar.findById(req.params.id)
            .populate('manufacturer')
            .populate('pickup')
            .exec(callback);
        },
        guitar_instance: function(callback) {
             GuitarInstance.find({'guitar': req.params.id})
            .exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        // no results
        if (results.guitar==null) { // No results.
            var err = new Error('Guitar not found');
            err.status = 404;
            return next(err);
        }
        // Sucess
        res.render('guitar_detail', {title: results.guitar.model, guitar: results.guitar, guitar_instances: results.guitar_instance});
    });
    
};

// Display guitar create form on GET
exports.guitar_create_get = function(req, res) {

    async.parallel({

        manufacturers: function(callback) {
            Manufacturer.find()
            .exec(callback);
        },

        pickups: function(callback) {
            Pickup.find()
            .exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        // Success
        res.render('guitar_form', {title: 'Create Form', manufacturers: results.manufacturers, pickups: results.pickups});
    });

}

// Handle guitar create on POST
exports.guitar_create_post = [

    // Validation and Sanitation
    body('guitar_model', 'Model must not be empty.').trim().isLength({ min: 1}).escape(),
    body('guitar_manufacturer', 'Manufacturer must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('guitar_description', 'Description must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('guitar_price', 'Description must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('guitar_pickup', 'Pickup must not be empty').trim().isLength({ min: 1 }).escape(),

    // Process req
    (req, res, next) => {

        // Extract errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            async.parallel({

                manufacturers: function(callback) {
                    Manufacturer.find()
                    .exec(callback);
                },
        
                pickups: function(callback) {
                    Pickup.find()
                    .exec(callback);
                },
            }, function(err, results) {
                if (err) { return next(err); }
                // Success
                res.render('guitar_form', {title: 'Create Form', guitar: req.body, manufacturers: results.manufacturers, pickups: results.pickups});
            });
            
            return;
        }
        else {
            // Form data is valid

            // Guitar Object
            var guitar = new Guitar(
                {
                    model: req.body.guitar_model,
                    manufacturer: req.body.guitar_manufacturer,
                    description: req.body.guitar_description,
                    price: req.body.guitar_price,
                    pickup: req.body.guitar_pickup
                }
            );
            
            guitar.save(function (err) {
                if (err) { return next(err); }
                // Success
                res.redirect(guitar.url);
            });
        }
    }
]

// Display guitar delete form on GET
exports.guitar_delete_get = function(req, res) {
    
    async.parallel({

        guitar: function(callback) {
            Guitar.findById(req.params.id)
            .exec(callback);
        },

        guitar_instance: function(callback) {
            GuitarInstance.find({'guitar': req.params.id})
            .exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        // Success
        res.render('guitar_delete', {guitar: results.guitar, guitar_instance: results.guitar_instance});
    });

}

// Handle guitar delete form on POST
exports.guitar_delete_post = function(req, res, next) {
    
    Guitar.findById(req.body.guitarid)
    .exec(function(err, guitar) {
        if (err) { return next(err); }
        Guitar.findByIdAndDelete(req.body.guitarid, function(err) {
            if (err) { return next(err); }
            // Success and redirect
            res.redirect('/inventory/guitar/all');
        });
    });
    
};

// Display guitar update form on GET
exports.guitar_update_get = function(req, res, next) {
    async.parallel({
        guitar: function(callback) {
            Guitar.findById(req.params.id)
            .exec(callback);
        },
        manufacturers: function(callback) {
            Manufacturer.find()
            .exec(callback);
        },
        pickups: function(callback) {
            Pickup.find()
            .exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        // Success
        res.render('guitar_form', {title: 'Update Form', guitar: results.guitar, manufacturers: results.manufacturers, pickups: results.pickups});
    });
};

// Handle guitar update form on POST
exports.guitar_update_post = [

    // Validation and Sanitation
    body('guitar_model', 'Model must not be empty.').trim().isLength({ min: 1}).escape(),
    body('guitar_manufacturer', 'Manufacturer must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('guitar_description', 'Description must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('guitar_price', 'Description must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('guitar_pickup', 'Pickup must not be empty').trim().isLength({ min: 1 }).escape(),

    // Process req
    (req, res, next) => {

        // Extract errors
        const errors = validationResult(req);

         // Guitar Object
         var guitar = new Guitar(
            {
                model: req.body.guitar_model,
                manufacturer: req.body.guitar_manufacturer,
                description: req.body.guitar_description,
                price: req.body.guitar_price,
                pickup: req.body.guitar_pickup,
                _id: req.params.id
            }
        );

        if (!errors.isEmpty()) {
            async.parallel({
                manufacturers: function(callback) {
                    Manufacturer.find()
                    .exec(callback);
                },
                pickups: function(callback) {
                    Pickup.find()
                    .exec(callback);
                },
            }, function(err, results) {
                if (err) { return next(err); }
                // Success
                res.render('guitar_form', {title: 'Update Form', guitar: req.body, manufacturers: results.manufacturers, pickups: results.pickups});
            });
            return;
        }
        else {
            Guitar.findByIdAndUpdate(req.params.id, guitar, {}, function (err, theguitar) {
                if (err) { return next(err); }
                // Success
                res.redirect(theguitar.url);
            });
        }
    }    
]