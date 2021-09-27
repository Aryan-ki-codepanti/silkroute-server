require('dotenv').config();
const mongoose = require('mongoose');
const MongoURI = process.env.MONGO_URI ;


const connectToMongo = () => {
    mongoose.connect(MongoURI , ()=>{
        console.log("Connected successfully to MongoDB");
    });
};
module.exports = connectToMongo;