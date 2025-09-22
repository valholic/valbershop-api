const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "customer"],
        default: "customer",
    },
    history: [
        {
            name: {
                type: String,
                required: true
            },
            type: {
                type: String,
                required: true
            },
            goods_id: {
                type: String,
                required: true
            },
            amount: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            discount: {
                required: true
            },
            receive_status: {
                type: Boolean,
                default: false,
                required: true
            },
            check_out_time: {
                type: String,
                required: true
            },
            service_time: {
                type: Object,
                required: function () {
                    return this.type === "service"
                }
            }
        }
    ],
    cart: [
        {
            product_name: {
                type: String,
                required: true
            },
            product_id: {
                type: String,
                required: true,
            },
            product_type: {
                type: String,
                required: true
            },
            amount: {
                type: Number,
                required: true,
                min: 1
            },
            price: {
                type: Number,
                required: true
            },
            cart_image: {
                type: String,
                required: true
            },
            discount: {
                type: Number,
                required: true
            }
            ,
            time: {
                type: Object,
                required: function () {
                    return this.product_type === "service"
                }
            }
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);
