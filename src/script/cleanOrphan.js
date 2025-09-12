const path = require('path');
const fs = require('fs');
const Gallery = require('../models/gallery');
const Shop = require('../models/shop');

const uploadDir = [path.join(process.cwd(), "public/images/gallery"), path.join(process.cwd(), "public/images/products"), path.join(process.cwd(), "public/images/services"), path.join(process.cwd(), "public/images/reviewImages")];

const cleanOrphan = async () => {
    const gallery = (await Gallery.find({}, "photo")).flatMap(gal => gal.photo);
    const shopImages = (await Shop.find({}, "image")).flatMap(shop => shop.image || []);
    const reviewImages = (await Shop.find({}, "review.review_img")).flatMap(rev => rev.review.flatMap(img => {
        if(img.review_img !== undefined) {
            return img.review_img;
        } else {
            return [];
        }
    }));

    const allPathOnDB = [...gallery, ...shopImages, ...reviewImages].flatMap(img => img.replace(/\\/g, '/'));

    for (const dir of uploadDir) {
        const files = fs.readdirSync(dir);

        for(const file of files) {
            const relativePath = `public/images/${path.basename(dir)}/${file}`

            if(!allPathOnDB.includes(relativePath)) {
                fs.unlinkSync(path.join(dir, file));
                console.log(`Deleted orphan file: ${relativePath}`);
            }
        }
    }

    console.log("Cleanup finish✅")
}

module.exports = cleanOrphan;