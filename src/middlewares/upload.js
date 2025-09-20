const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        let folder = '';

        if(file.fieldname === "photo") {
            folder = 'gallery';
        } else if(file.fieldname === "image") {
            switch(req.body.type) {
                case "product": 
                    folder = 'products';
                    break;
                case "service":
                    folder = 'services';
                    break;
            }
        } else if(file.fieldname === "review_img") {
            folder = 'reviewImages'
        }

        return {
            folder,
            allowed_format: ['jpg', 'jpeg', 'png', 'webp'],
            public_id: new Date().getTime() + '-' + file.originalname.split('.')[0]
        }
    }}
);

const upload = multer({ storage });

module.exports = upload;