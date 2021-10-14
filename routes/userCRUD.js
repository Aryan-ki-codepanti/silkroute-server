const express = require("express");
const router = express.Router();
const users = require("../models/User");


// get all users with GET: /api/users no login required
router.get("/" , (req , res)=>{

    const getUsers = async ()=>{
        const data = await users.find();
        res.json(data);
    }
    getUsers();
});


// get user data from particular phone number POST: /api/users login required
router.post("/" , (req , res) => {

    try{
        const getData = async (phone)=>{
            const data = await users.findOne({phone: phone});
            res.json(data);
        }
    
        const phone = req.body.phone;
        getData(phone);
    }
    catch(error){
        res.status(500).json({error})
    }

}) ;



// create user from particular phone number , item array POST: /api/users/create no login required
router.post("/create" , (req , res) => {

    const createUser = async (data) =>{

        
        // check if exists
        const checkUser = await users.findOne(data);

        if (!checkUser){
            const user = new users(data);
            const response = await user.save();
            return res.json(response);
        }
        return res.json(checkUser);


    }
    createUser(req.body);

}) ;

module.exports = router;