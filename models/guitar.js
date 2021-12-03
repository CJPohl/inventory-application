var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GuitarSchema = new Schema(
    {
        model: {type: String, required: true},
        manufacturer: {type: Schema.Types.ObjectId, ref: 'Manufacturer', required: true},
        description: {type: String, required: true},
        price: {type: Number, required: true},
        pickup: {type: Schema.Types.ObjectId, ref: 'Pickup', required: true}
    }
);

// URL Virtual
GuitarSchema
.virtual('url')
.get(function() {
    return '/inventory/guitar/' + this._id;
});

// Export model
module.exports = mongoose.model('Guitar', GuitarSchema);