const express = require('express');
const  router=  express.Router();
const {
    getProducts,
    getProduct,
    getMyProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/products');

const verifyToken= require('../middleware/verifyToken');
const uploads= require('../config/multer');

router.get('/', getProducts);
router.get('/my-products', verifyToken, getMyProducts)
router.get('/:id', getProduct);
router.post('/', verifyToken, uploads.single('image'), createProduct);
router.put('/:id', verifyToken,  updateProduct);
router.delete('/:id', verifyToken, deleteProduct);

module.exports=router;

