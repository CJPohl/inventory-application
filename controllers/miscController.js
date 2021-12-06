// Displays About us page
exports.about_get = function(req, res, next) {

    res.render('about_us', {title: 'About Us'});

}

// Displays all modifications page
exports.modifications_get = function(req, res, next) {
    
    res.render('modifications_all', {title: 'Inventory Modifications'});
    
}