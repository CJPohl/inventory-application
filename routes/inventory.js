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
router.get('/guitar/:id/delete', guitar_controller.guitar_delete_post);

// Update guitar GET
router.get('/guitar/:id/update', guitar_controller.guitar_update_get);

// Update guitar POST
router.get('/guitar/:id/update', guitar_controller.guitar_update_post)

// List all guitars GET
router.get('/guitarsall', guitar_controller.guitar_list);

// Display one guitar GET
router.get('/guitar/:id', guitar_controller.guitar_detail);

/// GUITAR INSTANCE ROUTES ///

// List all guitar instances GET
router.get('/guitarinstance/all', guitarinstance_controller.guitarinstance_list);

// Display one guitar instance GET
router.get('/guitarinstance/:id', guitarinstance_controller.guitarinstance_detail);

// Delete one guitar instance GET
router.get('/guitarinstance/:id/delete', guitarinstance_controller.guitarinstance_delete_get);

// Delete one guitar instance POST
router.post('/guitarinstance/:id/delete', guitarinstance_controller.guitarinstance_delete_post);

/// MANUFACTURER ROUTES ///

// List all manufacturers GET
router.get('/manufacturer/all', manufacturer_controller.manufacturer_list);

// Display one manufacturer GET
router.get('/manufacturer/:id', manufacturer_controller.manufacturer_detail);

// Delete one manufacturer GET
router.get('/manufacturer/:id/delete', manufacturer_controller.manufacturer_delete_get);

// Delete one manufacturer POST
router.post('/manufacturer/:id/delete', manufacturer_controller.manufacturer_delete_post);

/// PICKUPS ROUTES ///

// List all pickups GET
router.get('/pickup/all', pickup_controller.pickup_list);

// Display one pickup
router.get('/pickup/:id', pickup_controller.pickup_detail);

// Delete one pickup GET
router.get('/pickup/:id/delete', pickup_controller.pickup_delete_get);

// Delete one pickup POST
router.post('/pickup/:id/delete', pickup_controller.pickup_delete_post);

module.exports = router;