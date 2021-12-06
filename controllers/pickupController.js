var Pickup = require('../models/pickup');

// Displays list of all pickups
exports.pickup_list = function(req, res, next) {

    Pickup.find()
        .sort([['name', 'descending']])
        .exec(function (err, list_pickups) {
            if (err) { return next(err); }
            // Success
            res.render('pickup_list', {title: 'The Two Main Pickups', pickup_list: list_pickups});
    });
    
}