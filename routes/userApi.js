const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

router.get('/', (req, res) => {
    res.send('User Route');
}
);
router.post('/', [
    check("name","Name is Required").not().isEmpty(),
check("email","Please enter a valid email").isEmail(),
check("password","Please enter a password with 6 or more characters").isLength({min:6}),
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    try {
        const {name, email, password} = req.body;
        let user =  await User.findOne({email: email});
        if(user){
            return res.status(400).json({msg: "User already exists"});
        }
        user = new User({
            name,
            email,
            password
        });
        user.save();
        res.send('User Created');
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
);
module.exports=router;