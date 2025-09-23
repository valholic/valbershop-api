const userService = require('../services/user');
const AppError = require('../utils/appError');
const User = require('../models/user');

const getUsers = async (req, res, next) => {
    try {
        const users = await userService.getUsers();

        res.status(200).json({
            message: "User data successfully obtained",
            users
        })
    } catch(error) {
        next(new AppError("User data failed to obtained", 500));
    }
};

const getMe = async (req, res, next) => {
    try {
        const user = await userService.getUsers(req.user.id);

        res.status(200).json({
            message: "User data successfully obtained",
            user
        })
    } catch(error) {
        next(new AppError("User data failed to obtain", 500));
    }
};

const addHistory = async (req, res, next) => {
    try {
        const { name, goods_id, type, amount, date, hour, price } = req.body;
        const check_out_time = new Date().toLocaleString();
        const history = {
            name,
            goods_id,
            type,
            amount,
            price,
            receive_status: false,
            check_out_time,
            service_time: {
                date,
                hour
            }
        }

        const updatedUser = await User.findByIdAndUpdate(req.user.id, { $push: { history } }, { new: true, runValidators: true });
        res.status(200).json({
            message: "New history updated",
            updatedUser
        })
    } catch(error) {
        next(new AppError("History failed to update", 500));
    }
}

const addCart = async (req, res, next) => {
    try {
        const { product_name, product_id, product_type, amount, price, cart_image, date, hour } = req.body;
        
        const cart = {
            product_name,
            product_id,
            product_type,
            amount,
            price,
            cart_image,
            time: {
                date,
                hour
            },
        }
        
        const updatedCart = await User.findByIdAndUpdate(req.user.id, { $push: { cart } }, { new: true, runValidators: true });
        res.status(200).json({
            message: "Goods add to cart",
            updatedCart
        })
    } catch(error) {
        next(new AppError("Failed to add goods to the cart"));
    }
}

const editCart = async (req, res, next) => {
    try {
        const { cart_id } = req.params;
        const { ...fields } = req.body;
        const newData = {};
        Object.entries(fields).forEach(([key, value]) => {
            if(key === "date" || key === "hour") {
                return newData[`cart.$.time.${key}`] = value;
            } else {
                return newData[`cart.$.${key}`] = value;
            }
        });

        const editedCart = await User.findOneAndUpdate({ _id: req.user.id, "cart._id": cart_id }, { $set: newData }, { new: true });
        res.status(200).json({
            message: "Cart data edited",
            editedCart
        });
    } catch(error) {
        next(new AppError(error.message));
    }
}

const deleteCart = async (req, res, next) => {
    try {
        const { cart_id } = req.params;

        const deletedCart = await User.findByIdAndUpdate(req.user.id, { $pull: {
            cart: {
                _id: cart_id
            }
        }}, { new: true, runValidators: true });

        res.status(200).json({
            message: "Cart data deleted",
            deletedCart
        })
    } catch(error) {
        next(new AppError("Failed to delete goods from the cart"));
    }
}

module.exports = { getUsers, getMe, addHistory, addCart, editCart, deleteCart };