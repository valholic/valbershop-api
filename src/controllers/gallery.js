const Gallery = require('../models/gallery');
const AppError = require('../utils/appError');
const deleteImage = require('../utils/deleteImage');

const addPhoto = async (req, res, next) => {
    try {
        const photo = req.files.photo.map(file => ({ photo: file.path }))
        const newPhoto = await Gallery.insertMany(photo);

        res.status(201).json({
            message: "Photo added to gallery",
            newPhoto
        });
    } catch(error) {
        next(new AppError("Failed to add photo", 500, null));
    }
}

const getPhotos = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const skip = (page - 1) * limit;

        const gallery = await Gallery.find().skip(skip).limit(limit);
        res.status(200).json({
            message: "Gallery data obtained",
            gallery
        });
    } catch (error) {
        next(new AppError("Failed to obtained photo", 500, null));
    }
}

const deletePhoto = async (req, res, next) => {
    try{
        const { photo_id } = req.body;
        const photos = await Gallery.find({
            _id: {
                $in: photo_id
            }
        });

        for(const photo of photos) {
            await deleteImage(photo.photo);
        }

        const deletedPhoto = await Gallery.deleteMany({
            _id: {
                $in: photo_id
            }
        });
        
        res.status(200).json({
            message: "Photo deleted",
            deletedPhoto
        });
    } catch (error) {
        next(new AppError("Failed to delete photo", 500, null));
    }
}

module.exports = { addPhoto, getPhotos, deletePhoto };
