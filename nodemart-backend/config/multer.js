const multer = require('multer')
const path= require('path')
const crypto = require('node:crypto')

const storage = multer.diskStorage({

    destination: (req, file , callback) =>{
        callback(null, 'uploads/');
    },

     filename: (req, file, callback) =>{
        const extension = path.extname(file.originalname).toLowerCase();

        const uniqueFileName = `product-${Date.now()}-${crypto.randomUUID()}${extension}`;

         callback(null, uniqueFileName);
     }
});

const fileFilter = (req, file , callback) => {
    if(file.mimetype.startsWith('image/')){
        callback(null, true);
    }
    else{
        callback(new Error('Only image files are allowed'));
    }
}

const upload= multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});


module.exports = upload;