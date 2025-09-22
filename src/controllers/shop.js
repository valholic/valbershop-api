const Shop = require('../models/shop');
const AppError = require('../utils/appError');
const cloudinary = require('cloudinary').v2;

const addGoods = async (req, res, next) => {
    try {
        const { name, type, description, price, discount, stock, time } = req.body;
        const image = req.files.image.map(img => {
            return img.path;
        });

        const newGoods = await new Shop({
            name,
            image,
            type,
            description,
            price,
            discount: discount > 0 ? discount : null,
            stock,
            time
        }).save();
    
        res.status(201).json({
            message: "Your goods has been added to the shop",
            newGoods
        });
    } catch (error) {
        next(new AppError("Failed to add", 500));
    }
}

const getGoods = async (req, res, next) => {
    try {
        const shopData = await Shop.find();
        res.status(200).json({
            message: "Shop data obtained",
            shopData
        })
    } catch (error) {
        next(new AppError("Failed to obtain shop data", 500));
    }
}

const getGoodsDataById = async (req, res, next) => {
    try {
        const { goods_id } = req.params;
        const goodsData = await Shop.findById(goods_id);

        res.status(200).json({
            message: "Goods data found",
            goodsData
        })
    } catch (error) {
        next(new AppError("Goods data not found", 404));
    }
}

const deleteGoodsData = async (req, res, next) => {
    try {
        const { goods_id } = req.params; 
        const goodsImages = await Shop.findById(goods_id);
        for(const image of goodsImages.image) {
            await cloudinary.uploader.destroy(image);
        }
        
        const deletedGoods = await Shop.findByIdAndDelete(goods_id);

        res.status(200).json({
            message: "Goods data deleted",
            deletedGoods
        })
    } catch (error) {
        next(new AppError("Failed to deleted goods data", 500));
    }
}

const editGoodsData = async (req, res, next) => {
    try {
        const { goods_id } = req.params;
        const { ...fields } = req.body;
        const savedImages = await Shop.findById(goods_id);
        let oldImages = [];
        let newImages = [];
        if(fields.image) {
            oldImages = Array.isArray(fields.image) ? fields.image : [fields.image];
        }

        if(req.files?.image) {
            newImages = req.files.image.map(img => img.path);

        }

        fields.image = [...oldImages, ...newImages];

        for(const image of savedImages.image) {
            if(!fields.image.includes(image)) {
                await cloudinary.uploader.destroy(image);
            }
        }

        const updatedData = await Shop.findByIdAndUpdate(goods_id, fields, {new: true, runValidators: true});
        
        if(!updatedData) {
            throw new AppError("Goods not found", 404);
        }

        res.status(200).json({
            message: "Goods data updated",
            updatedData
        });
    } catch (error) {
        next(new AppError("Failed to update goods data", 500));
    }
}

const addReview = async (req, res, next) => {
    try {
        const { goods_id } = req.params;
        const { comment, user_id, star, name } = req.body;
        let review_img
        if(req?.files?.review_img) {
            review_img = req.files.review_img[0].path;
        }
    
        const review = {
            user_id,
            name,
            comment,
            star: parseInt(star),
            review_img
        };
    
        const updatedGoodsData = await Shop.findByIdAndUpdate(goods_id, { $push: { review } }, { new: true, runValidators: true });

        res.status(200).json({
            message: "Review added to the goods",
            updatedGoodsData
        });
    } catch(error) {
        next(new AppError(error.message, 500));
    }
}

const deleteReview = async (req, res, next) => {
    try {
        const { goods_id, review_id } = req.params;
        const deleteData = await Shop.findOne({ _id: goods_id, "review._id": review_id }, { "review.$": 1 });
        if(deleteData.review?.review_img) {
            await cloudinary.uploader.destroy(image);
        }

        const deletedReview = await Shop.findByIdAndUpdate(goods_id, { $pull: { review: { _id: review_id }}}, { new: true });

        res.status(200).json({
            message: "This review is already deleted",
            deletedReview
        });
    } catch(error) {
        next(new AppError(error.message, 500));
    }
}

module.exports = { addGoods, getGoods, getGoodsDataById, deleteGoodsData, editGoodsData, addReview, deleteReview };