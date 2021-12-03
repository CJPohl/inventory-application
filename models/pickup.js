var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PickupSchema = new Schema(
    {
        name: {type: String, enum: ['Single Coil', 'Humbucker'], required: true},
        description: {type: String, required: true, maxlength: 10000}
    }
);

// URL Virtual
PickupSchema
.virtual('url')
.get(function() {
    return '/inventory/pickup/' + this._id;
});

// Export model
module.exports = mongoose.model('Pickup', PickupSchema);

