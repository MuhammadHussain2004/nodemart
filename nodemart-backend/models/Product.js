const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required: true,
            trim: true
        },
        price:{
            type: Number,
            required: true,
            min:0
        },
        image:{
           type: String,
           default: ''
        },
        owner:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true
    }
);


module.exports= mongoose.model('Product', productSchema);