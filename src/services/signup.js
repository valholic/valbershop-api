const User = require('../models/user');
const bcrypt = require('bcrypt');
const AppError = require('../utils/appError');

const createUser = async (userData) => {
    const { name, email, password } = userData;
    const existingUser = await User.find({
        $or: [
            {name},
            {email},
        ]
    });

    if(existingUser.length > 0) {
        throw new AppError('User already registered with this name and email', 409);
    };

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = new User({
        name,
        email,
        password: hashedPassword,
        role: "customer"
    });

    const savedUser = await createdUser.save();
    return savedUser;
}

module.exports = { createUser };
