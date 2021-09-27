const express = require("express");
const router = express.Router();


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