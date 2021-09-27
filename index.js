require('dotenv').config();

const express = require("express");
const app = express();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID;
const client = require('twilio')(accountSid, authToken);
const cors = require('cors');
const connectToMongo = require("./db");
connectToMongo();

const port = 3001;

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "localhost:3000"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// cors resolve
app.use(cors({
    origin: "http://127.0.0.1:3000" , 
    methods: ["GET" , "POST" ]
}));

// use json body of response
app.use(express.json());

// other routes
app.use("/" , require("./routes/auth"));
app.use("/api/users" , require("./routes/userCRUD"));
app.use("/api/orders" , require("./routes/orderCRUD"));


// login -> send sms
// app.get("/login" , cors() , (req , res , next) => {

//     // set phonenumber in to
//     client.verify.services(serviceSid)
//              .verifications
//              .create({
//                  to: `+91${req.query.phone}`, 
//                  channel: 'sms'
//                 })
//              .then(data => res.status(200).send(data));
// });

// app.get("/verify" , cors() , (req , res , next) => {

    
//     client.verify.services(serviceSid)
//         .verificationChecks
//         .create({
//             to: `+91${req.query.phone}`, 
//             code: `${req.query.code}`
//         })
//         .then(data => res.status(200).send(data));
// });


app.listen(port , ()=>{
    console.log(`App running at ${port}`);
});
