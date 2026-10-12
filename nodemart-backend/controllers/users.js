const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken')
const SECRET_KEY= process.env.SECRET_KEY;
const User= require('../models/User');


const signup = async (req,res)=>{
    try{
      
      const {name, email, password} = req.body;

      const normalizedEmail = email?.trim().toLowerCase();

      const existingUser= await User.findOne({
         email: normalizedEmail
      });

      if(existingUser){
         return res.status(400).json({ message: 'User already exists'});
      }

      const hashedPassword= await bcrypt.hash(password, 12);

    const newUser= await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword
    });

    res.status(201).json({message: 'Account created', id: newUser._id});

    }
    catch(error){
        res.status(400).json({message: error.message});
    }
};


const login = async (req,res)=>{
    try{
     const {email, password}= req.body;
     const normalizedEmail = email?.trim().toLowerCase();

     const user= await User.findOne({
      email: normalizedEmail
    });

     if(!user){
        return res.status(404).json({message: 'user not found'});
     }
     const isMatch= await bcrypt.compare(password, user.password);
     if(!isMatch){
        return res.status(401).json({message: 'invalid password'});
     }    
     const token= jwt.sign({id: user._id.toString(), email: user.email}, SECRET_KEY, {expiresIn: '24h'});   
     res.status(200).json({message: 'Login successful', token});
     }
     catch(error){
        res.status(500).json({message: error.message});
     }
}

module.exports= {signup, login};