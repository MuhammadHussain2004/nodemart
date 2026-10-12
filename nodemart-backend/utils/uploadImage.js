const cloudinary = require('../config/cloudinary');

const uploadImage = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'nodemart/products' },
            (error, result) => {
                if (error) {
                    return reject(error);
                }

                resolve(result.secure_url);
            }
        );

        uploadStream.end(fileBuffer);
    });
};

module.exports = uploadImage;