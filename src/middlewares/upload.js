const multer = require('multer');

const fileFilter = (req, file, cb) => {
    if(file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/webp") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(file.fieldname === "photo") {
            cb(null, 'public/images/gallery');
        } else if(file.fieldname === "image") {
            switch(req.body.type) {
                case "product": 
                    cb(null, 'public/images/products');
                    break;
                case "service":
                    cb(null, 'public/images/services');
                    break;
            }
        } else if(file.fieldname === "review_img") {
            cb(null, 'public/images/reviewImages');
        }
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname);
    }
});

const upload = multer({storage: fileStorage, fileFilter});

module.exports = upload;