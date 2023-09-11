const express= require("express");
const router=express.Router();
var fetchuser=require("../middleware/fetchuser");
const Note=require('../models/Note')
const { query, validationResult } = require('express-validator');
const  { check } = require('express-validator');



// Route 1 :Get All Notes using get "/api/aut/fetchallnotes"   login required
router.get('/fetchallnotes',fetchuser, async (req,res)=>{
    try {
        //finding notes with related to particular user
        const note=await Note.find({user:req.user.id});
        res.json(note); 
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }

})
// Route 2 :add a new   Note for user using post  "/api/aut/addnote"   login required
router.post('/addnote',fetchuser,[
    check('title',"Title must have atleast 3 characters").isLength({min:3})  ,       
    check('description',"description should contain atleast 10 characters").isLength({min:10}),        
], async (req,res)=>{

    //getting from req destructuring
    const {title,description,tag}=req.body;
    const result = validationResult(req);
      //to check validation given above
      if (result.isEmpty()) {
       
            try{
                
                const note=new Note({user:req.user.id,title,description,tag});
                const notesave= await note.save();
                res.json(notesave);

               }catch(error)
                 {
                        console.error(error.message);
                        res.status(500).send("some error occured");

                 }
        
        }
    else
       res.send({ errors: result.array() });
    
   

})
module.exports= router 