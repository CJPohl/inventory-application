var express = require('express');
var router = express.Router();

// Require Controller modules
var guitar_controller = require('../controllers/guitarController');
var guitarinstance_controller = require('../controllers/guitarinstanceController');
var manufacturer_controller = require('../controllers/manufacturerController');
var pickup_controller = require('../controllers/pickupController');
var misc_controller = require('../controllers/miscController');

/// MISC ROUTES ///

// About us GET
router.get('/about', misc_controller.about_get);

// Inventory mod GET
router.get('/modifications', misc_controller.modifications_get);

/// ALL INVENTORY ROUTES ///

// GET Inventory home page
router.get('/', guitar_controller.index);

/// GUITAR ROUTES ///

// Create guitar GET
router.get('/guitar/create', guitar_controller.guitar_create_get);

// Create guitar POST
router.post('/guitar/create', guitar_controller.guitar_create_post);

// Delete guitar GET
router.get('/guitar/:id/delete', guitar_controller.guitar_delete_get);

// Delete guitar POST
router.post('/guitar/:id/delete', guitar_controller.guitar_delete_post);

// Update guitar GET
router.get('/guitar/:id/update', guitar_controller.guitar_update_get);

// Update guitar POST
router.post('/guitar/:id/update', guitar_controller.guitar_update_post)

// List all guitars GET
router.get('/guitar/all', guitar_controller.guitar_list);

// Display one guitar GET
router.get('/guitar/:id', guitar_controller.guitar_detail);

/// GUITAR INSTANCE ROUTES ///

// Create one guitar instance GET
router.get('/guitarinstance/create', guitarinstance_controller.guitarinstance_create_get);

// Create one guitar instance POST
router.post('/guitarinstance/create', guitarinstance_controller.guitarinstance_create_post);

// List all guitar instances GET
router.get('/guitarinstance/all', guitarinstance_controller.guitarinstance_list);

// Display one guitar instance GET
router.get('/guitarinstance/:id', guitarinstance_controller.guitarinstance_detail);

// Delete one guitar instance GET
router.get('/guitarinstance/:id/delete', guitarinstance_controller.guitarinstance_delete_get);

// Delete one guitar instance POST
router.post('/guitarinstance/:id/delete', guitarinstance_controller.guitarinstance_delete_post);

// Update one guitar instance GET
router.get('/guitarinstance/:id/update', guitarinstance_controller.guitarinstance_update_get);

// Update one guitar instance POST
router.post('/guitarinstance/:id/update', guitarinstance_controller.guitarinstance_update_post);

/// MANUFACTURER ROUTES ///

// List all manufacturers GET
router.get('/manufacturer/all', manufacturer_controller.manufacturer_list);

// Create one manufacturer GET
router.get('/manufacturer/create', manufacturer_controller.manufacturer_create_get);

// Create one manufacturer POST
router.post('/manufacturer/create', manufacturer_controller.manufacturer_create_post);

// Display one manufacturer GET
router.get('/manufacturer/:id', manufacturer_controller.manufacturer_detail);

// Delete one manufacturer GET
router.get('/manufacturer/:id/delete', manufacturer_controller.manufacturer_delete_get);

// Delete one manufacturer POST
router.post('/manufacturer/:id/delete', manufacturer_controller.manufacturer_delete_post);

// Update one manufacturer GET
router.get('/manufacturer/:id/update', manufacturer_controller.manufacturer_update_get);

// Update one manufacturer POST
router.post('/manufacturer/:id/update', manufacturer_controller.manufacturer_update_post);

/// PICKUPS ROUTES ///

// List all pickups GET
router.get('/pickup/all', pickup_controller.pickup_list);

// Display one pickup
router.get('/pickup/:id', pickup_controller.pickup_detail);

module.exports = router;