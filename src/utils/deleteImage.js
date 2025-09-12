const fs = require('fs');
const path = require('path');
const AppError = require('./appError');

const deleteImage = (filePath) => {
    return new Promise((resolve, reject) => {
        const absolutePath = path.join(__dirname, '../..', filePath);

        fs.unlink(absolutePath, (err) => {
            if(err) {
                if(err.code === "ENOENT") return resolve();
                return reject(new AppError(err.message, 500, null))
            }
            resolve();
        });
    })
};

module.exports = deleteImage;