const express = require("express");
const router = express.Router();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID;
const client = require('twilio')(accountSid, authToken);


// login -> send sms
router.get("/login" , (req , res) => {

    // set phonenumber in to
    client.verify.services(serviceSid)
             .verifications
             .create({
                 to: `+91${req.query.phone}`, 
                 channel: 'sms'
                })
             .then(data => res.status(200).send(data));
});

router.get("/verify" , (req , res) => {

    
    client.verify.services(serviceSid)
        .verificationChecks
        .create({
            to: `+91${req.query.phone}`, 
            code: `${req.query.code}`
        })
        .then(data => res.status(200).send(data));
});

module.exports = router;