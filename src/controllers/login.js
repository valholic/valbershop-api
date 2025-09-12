const authService = require('../services/login');
const AppError = require('../utils/appError');

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const token = await authService.login(email, password);
        res.status(200).json({
            message: "Login successfully",
            token
        });
    } catch (error) {
        next(new AppError("Invalid credentials", 401));
    }
}

const refreshToken = async (req, res, next) => {
    try {
        const { token } = req.body;
        const newToken = await authService.refreshToken(token);
        res.status(200).json({
            message: "Token refreshed",
            newToken
        });
    } catch (error) {
        next(new AppError("Invalid credentials", 401));
    }
}

module.exports = { login, refreshToken };