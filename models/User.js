
const mongoose = require("mongoose");
const {model , Schema} = mongoose;

const UserSchema = new Schema({
    phone:  {
        type: String,
        required: true
    }
});

const user = model('user' , UserSchema);

module.exports = user;