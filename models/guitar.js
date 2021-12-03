var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GuitarSchema = new Schema(
    {
        model: {type: String, required: true},
        manufacturer: {type: Schema.Types.ObjectId, ref: 'Manufacturer', required: true},
        description: {type: String, required: true, maxLength: 10000},
        price: {type: Number, required: true},
        pickup: {type: Schema.Types.ObjectId, ref: 'Pickup', required: true},
        instock: {type: Schema.Types.ObjectId, ref: 'GuitarInstance', required: true}
    }
)