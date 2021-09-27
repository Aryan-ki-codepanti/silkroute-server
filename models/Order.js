
const mongoose = require("mongoose");
const {model , Schema} = mongoose;


const OrderSchema = new Schema({
    phone:  {
        type: String,
        required: true
    },
    items: {
        type: [{
            name: String,
            quantity: Number,
            price: Number
        }],
        required: true
    },
    amount: Number,
    status: {
        type: String,
        default: "billed"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const order = model('order' , OrderSchema);

module.exports = order;