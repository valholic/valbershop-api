const bcrypt = require('bcrypt');
const User = require('../models/user');
const { generateToken } = require('../utils/jwtUtils');
const { verifyToken } = require('../middlewares/authMiddleware');
const AppError = require('../utils/appError');

const login = async (email, password) => {
    try {
        const existingUser = await User.findOne({ email });
        if(!existingUser) {
            throw new AppError('Invalid credentials', 401, null);
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordValid) {
            throw new AppError('Invalid credentials', 401, null);
        }

        const token = generateToken(existingUser);
        return token;
    } catch (error) {
        if(error instanceof AppError) {
            throw error;
        }
        throw new AppError('Internal server error', 500, null);
    }
};

const refreshToken = async (oldToken) => {
    try {
        const decodedToken = verifyToken(oldToken);
        const userData = await User.findById(decodedToken.id);
        if(!userData) {
            throw new AppError("User not found", 404, null);
        };
    
        const newToken = generateToken(userData);
        return newToken;
    } catch (error) {
        if(error instanceof AppError) {
            throw error;
        };

        throw new AppError("Invalid token", 401, null);
    }
};

module.exports = { login, refreshToken };