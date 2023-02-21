const express=require('express');
const User = require('../model/userSchema');
const router=express.Router();
const bcrypt=require('bcrypt');
router.post('/register',async (req,res)=>{

    try{
        const {name,email,phone,work,password,cpassword}=req.body;
        if(!name || !email || !phone || !work || !password || !cpassword){
            return res.status(421).json({'message':'failed'}); 
        }
        const findUser=await User.findOne({email:email});
        if(findUser){
            return res.json({"message":"user exist"});
        }
            const user=new User({name,email,phone,work,password,cpassword});
             const createUser=await user.save();
             return res.json({"message":"user added successfully"});
      
    }catch(err){
        console.log(err)

    }
   

})

router.post('/signin',async (req,res)=>{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(401).json({'message':'please enter your email address'});
        }

        const findUser=await User.findOne({email:email});

        const comparePassword=await bcrypt.compare(password,findUser.password)
      
        if(!comparePassword){
            res.status(401).json({'message':'user error'})
        }else{
            res.status(201).json({'message':'login success'})
        }

})

module.exports=router;