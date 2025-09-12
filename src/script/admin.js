const user = require('../models/user');
const bcrypt = require('bcrypt');
const AppError = require('../utils/appError');

const createAdminAccount = async () => {
    try{
        const existingAdmin = await user.findOne({email: "admin@gmail.com"});
        if(!existingAdmin) {
            const admin = new user({
                email: "admin@gmail.com",
                name: "admin",
                password: await bcrypt.hash("admin1234*", 10),
                role: "admin"
            });

            await admin.save();
            console.log('Admin account created successfully');
        } else {
            console.log('Admin already exist');
        }
    } catch(error) {
        next(new AppError("Invalid credentials"));
    }
}

module.exports = createAdminAccount;