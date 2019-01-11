const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SavingSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
        max: 365
    },
    createdDate: {
        type: Date,
        required: true
    }
});


// Export the model
module.exports = mongoose.model('Saving', SavingSchema);