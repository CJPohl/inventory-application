var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GuitarInstanceSchema = new Schema(
    {
        guitar: { type:Schema.Types.ObjectId, ref: 'Guitar', required: true },
        status: {type: String, required: true, enum: ['New', 'Refurbished', 'Used']}
    }
);

// URL Virtual
GuitarInstanceSchema
.virtual('url')
.get(function() {
    return '/inventory/guitarinstance/' + this._id;
});

// Export model
module.exports = mongoose.model('GuitarInstance', GuitarInstanceSchema);