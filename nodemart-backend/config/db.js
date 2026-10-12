const mongoose = require('mongoose');

const mongoConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MONGODB connected successfully');
    } catch (error) {
        console.error('MONGODB connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = mongoConnect;