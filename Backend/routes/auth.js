const express= require("express");
const { query, validationResult } = require('express-validator');
const  { check } = require('express-validator');
const bcrypt = require('bcryptjs');
const router=express.Router();
const User=require('../models/User')
var jwt = require('jsonwebtoken');

const JWT_SECRET="MynameisMurtaza@"


//Create a  user using post "/api/aut/createuser"  no login required
router.post('/createuser',[  
    check('name',"Enter valid name having atleast 3 characters").isLength({min:3})  ,       
    check('password',"password should contain atleast 3 characters").isLength({min:5}),        
    check('email',"It should be Email Id").isEmail()         
], async (req, res) => {
    
    const result = validationResult(req);
     //to check validation given below
    if (result.isEmpty()) {
       
        try{
                //check whether users with this email exits already
                let user=await User.findOne({email:req.body.email});

                console.log(user);
                if(user){
                        // console.log(user)
                        res.status(500).json({Error:"Email Exits Already"});
                }else{
                     //user created at database
                     var salt = await bcrypt.genSaltSync(10);
                     var securePassword = await bcrypt.hashSync(req.body.password, salt);
                      user= await User.create({
                            name: req.body.name,
                            email:req.body.email,
                            password: securePassword,
                        })
                    data={
                        user:{
                        id:user.id
                        }
                    }
                    var authtoken = jwt.sign(data, JWT_SECRET);
                     res.json({authtoken});
                    }
                 } catch(error)
                 {
                        console.error(error.message);
                        res.status(500).send("some error occured");

                 }
        
            }
    else
       res.send({ errors: result.array() });
  });
module.exports= router 