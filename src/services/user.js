const User = require('../models/user');

const getUsers = async (id = null) => {
    const userData = await (id ? User.findById(id) : User.find());
    return userData;
};

module.exports = { getUsers };