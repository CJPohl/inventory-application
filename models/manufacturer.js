var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ManufacturerSchema = new Schema(
    {
        name: {type: String, required: true, maxLength: 20},
        description: {type: String, required: true, maxLength: 10000},
        founding: {type: Date}
    }
);

// URL for Founding Date
ManufacturerSchema.virtual('founding').get(function() {
    var convertedFounding = '';
    convertedFounding += DateTime.fromJSDate(this.founding).toLocaleString(DateTime.DATE_MED);
    return convertedFounding;
});

// URL Virtual
ManufacturerSchema
.virtual('url')
.get(function () {
    return '/inventory/manufacturer/' + this._id;
});

// Export model
module.exports = mongoose.model('Manufacturer', ManufacturerSchema);