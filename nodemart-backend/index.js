require('dotenv').config();
if(!process.env.SECRET_KEY){
    throw new Error('SECRET_KEY is missing. Add it to the .env file.');
}
const express= require('express');
const productRoutes = require('./routes/products');
const userRoutes= require('./routes/users');
const cors= require('cors');
const mongoConnect = require('./config/db');
const PORT = process.env.PORT || 4000;
const app=express();

mongoConnect();

app.use((req, res, next)=>{console.log(`${req.method} request to ${req.url}`);
    next(); });
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.get('/', (req,res)=>{
    res.send('welcome')
});
app.use('/products', productRoutes);
app.use('/users', userRoutes);


app.listen(PORT, ()=>{
    console.log(`Express server running at ${PORT}`);
    
})