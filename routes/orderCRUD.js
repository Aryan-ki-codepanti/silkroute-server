const express = require("express");
const router = express.Router();
const orders = require("../models/Order");


// get all orders
router.get("/" , (req , res)=>{

    const getOrders = async ()=>{
        const data = await orders.find();
        res.json(data);
    }

    getOrders();

});

// get orders from particular phone number
router.post("/" , (req , res) => {

    const getData = async (phone)=>{
        const data = await orders.find({phone: phone});
        res.json(data);
    }

    const phone = req.body.phone;
    getData(phone);

}) ;

// create order from particular phone number , item array
router.post("/create" , (req , res) => {

    const createOrder = async (data) =>{
        const order = new orders(data);
        const response = await order.save();
        res.json(response);
    }

    const amount = req.body.items.reduce((x , y) => x.price + y.price);
    createOrder({
        ...req.body,
        amount
    });

}) ;

module.exports = router;