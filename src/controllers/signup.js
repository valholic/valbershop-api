const userService = require('../services/signup');
const AppError = require('../utils/appError');

const createUser = async (req, res, next) => {
    try {
        const userData = req.body;
        const user = await userService.createUser(userData);
        res.status(201).json({
            user,
            message: "User created successfully"
        })
    } catch (error) {
        next(new AppError("Failed to create user", 400));
    }
}

module.exports = { createUser };