const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: [String],
        required: true
    },
    type: {
        type: String,
        enum: ["product", "service"],
        required: true
    }, 
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    discount: {
        type: Number,
        required: false,
        min: 1
    },
    stock: {
        type: Number,
        required: function () {
            return this.type === "product"
        },
        min: 1
    },
    time: {
        type: [String],
        required: function () {
            return this.type === "service"
        }
    },
    review: [
        {
            comment: {
                type: String,
                required: true
            },
            star: {
                type: Number,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            user_id: {
                type: String,
                required: true
            },
            review_img: {
                type: String,
                required: false
            }
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model("Shop", shopSchema);