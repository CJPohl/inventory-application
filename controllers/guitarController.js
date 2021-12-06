var Guitar = require('../models/guitar');
var GuitarInstance = require('../models/guitarinstance');
var Manufacturer = require('../models/manufacturer');
var Pickup = require('../models/pickup');

var async = require('async');

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

// Display page for a specific guitar
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
    res.send('NOT IMPLEMENTED: Guitar create GET');
};

// Handle guitar create on POST
exports.guitar_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Guitar create POST');
};

// Display guitar delete form on GET
exports.guitar_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Guitar delete GET');
};

// Handle guitar delete form on POST
exports.guitar_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Guitar delete POST');
};

// Display guitar update form on GET
exports.guitar_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Guitar update GET');
};

// Handle guitar update form on POST
exports.guitar_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Guitar update POST');
};