require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./src/config/dbConfig');
const createAdminAccount = require('./src/script/admin');
const handleError = require('./src/middlewares/handleError');

const app = express();
const PORT = process.env.PORT || 3000;

// parser & cors set-up
app.use(express.json());
app.use(cors({
    origin: "https://valholic.github.io",
    methods: ["POST", "GET", "DELETE", "PUT", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));
app.options("*", cors());

// Routes field
const signupRoute = require('./src/routes/signup');
const loginRoute = require('./src/routes/login');
const userRoute = require('./src/routes/user');
const galleryRoute = require('./src/routes/gallery');
const shopRoute = require('./src/routes/shop');
const testimonyRoute = require('./src/routes/testimony');

app.use('/v1/user', signupRoute);
app.use('/v1/auth', loginRoute);
app.use('/v1/api', userRoute);
app.use('/v1/gallery', galleryRoute);
app.use('/v1/shop', shopRoute);
app.use('/v1/testimony', testimonyRoute);

createAdminAccount();

// Error handle
app.use(handleError);

module.exports = app;
// connectDB().then(() => {
//     app.listen(PORT, () => {
//         console.log(`Server is running at http://localhost:${PORT}`);
//     });
// });