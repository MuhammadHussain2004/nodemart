const jwt= require('jsonwebtoken');
const SECRET_KEY=  process.env.SECRET_KEY;

const verifyToken= (req,res,next)=>{
    const authHeader= req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
       return res.status(401).json({message: 'no token provided'});
    }
    const  token= authHeader.split(' ')[1];
    try{
    const decoded= jwt.verify(token, SECRET_KEY);
    req.user=decoded;
    next();
    }
    catch(error){
       return  res.status(401).json({message: 'Invalid or expired token'});
    }
}

module.exports= verifyToken;