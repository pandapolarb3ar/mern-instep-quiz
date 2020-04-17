
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//SECTION  collection and schema for Registration
let UserSchema = new Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    tested : {
      type: Boolean,
      required: true
    }
}, {
    collection: 'User'
});

module.exports = mongoose.model('User', UserSchema);