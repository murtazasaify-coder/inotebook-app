const express= require("express");
const { query, validationResult } = require('express-validator');
const  { check } = require('express-validator');
const router=express.Router();
const User=require('../models/User')

// router.post('/',
//     query('name','enter a valid name').isLength({ min: 5 })
// ,(req,res)=>{
    
//     const result = validationResult(req);
//     if (result.isEmpty()) {
//         return res.send(`Hello, ${req.query.person}!`);
//     }
//     else
//     res.send({ errors: result.array() });
// })
router.post('/',[  
    check('name',"Enter valid name having atleast 3 characters").isLength({min:3})  ,       
    check('password',"password should contain atleast 3 characters").isLength({min:5}),        
    check('email',"It should be Email Id").isEmail()         
], (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        User.create({
            name: req.body.name,
            email:req.body.email,
            password: req.body.password,
          }).then(user => res.json(user))
          .catch(err => {console.log(err)
                res.json({error:"please enter unique value for email",errormsg:err.message});
    })
    }
    else
       res.send({ errors: result.array() });
  });
module.exports= router 