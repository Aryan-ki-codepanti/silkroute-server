const express = require("express");
const router = express.Router();
const users = require("../models/User");


// get all users
router.get("/" , (req , res)=>{

    const getUsers = async ()=>{
        const data = await users.find();
        res.json(data);
    }
    getUsers();
});


// get user data from particular phone number
router.post("/" , (req , res) => {

    const getData = async (phone)=>{
        const data = await users.findOne({phone: phone});
        res.json(data);
    }

    const phone = req.body.phone;
    getData(phone);

}) ;



// create user from particular phone number , item array
router.post("/create" , (req , res) => {

    const createUser = async (data) =>{
        const user = new users(data);
        const response = await user.save();
        res.json(response);
    }
    createUser(req.body);

}) ;

module.exports = router;