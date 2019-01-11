const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        max: 100
    },
    password: {
        type: String,
        required: true,
        max: 25
    }
});


// Export the model
module.exports = mongoose.model('User', UserSchema);