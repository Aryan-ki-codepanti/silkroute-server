const express = require("express");
const router = express.Router();
const orders = require("../models/Order");


// get all orders for all phone numbers GET: /api/orders/ no login
router.get("/" , (req , res)=>{

    const getOrders = async ()=>{
        const data = await orders.find();
        res.json(data);
    }

    getOrders();

});
// get a particular order from GET: /api/orders/order/:id no login
router.get("/order/:id" , async (req , res)=>{

    try{
        const data = await orders.findById(req.params.id);
    
        if (!data){
            return res.status(404).json({error: "Not Found"});
        }
        res.status(200).json(data);
    }
    catch(error){
        res.status(500).json({ error })
    }


});



// get orders from particular phone number  POST: /api/orders/ login required
router.post("/" , (req , res) => {

    const getData = async (phone)=>{
        const data = await orders.find({phone: phone});
        res.json(data);
    }

    const phone = req.body.phone;
    getData(phone);

}) ;

// create order from particular phone number , item array POST: /api/orders/create login required
router.post("/create" , (req , res) => {

    const createOrder = async (data) =>{
        const order = new orders(data);
        const response = await order.save();
        res.json(response);
    }

    const prices = req.body.items.map(x => x.price);
    const amount = prices.length === 0 ? 0 : prices.reduce((x , y) => x + y);
    createOrder({
        ...req.body,
        amount
    });

}) ;


module.exports = router;