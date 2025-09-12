const Testimony = require('../models/testimony');
const AppError = require('../utils/appError');

const addTestimony = async (req, res, next) => {
    try {
        const { text, source } = req.body;
        const newTestimony = await new Testimony({
            text,
            source
        }).save();
    
        res.status(201).json({
            message: "Testimony added",
            newTestimony
        });
    } catch (error) {
        next(new AppError("Failed to add testimony", 500));
    }
}

const getTestimonies = async (req, res, next) => {
    try {
        const testimonies = await Testimony.find();
        
        res.status(200).json({
            message: "Testimonies data obtained",
            testimonies
        });
    } catch (error) {
        next(new AppError("Failed to obtained testimonies data"));
    }
}

const deleteTestimony = async (req, res, next) => {
    try {
        const { testimony_id } = req.params;
        const deletedTestimony = await Testimony.findByIdAndDelete(testimony_id);

        res.status(200).json({
            message: "Testimony deleted",
            deletedTestimony
        });
    } catch (error) {
        next(new AppError("Failed to delete testimony", 500));
    }
}

module.exports = {addTestimony, getTestimonies, deleteTestimony};