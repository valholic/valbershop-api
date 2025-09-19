require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./src/config/dbConfig');
const createAdminAccount = require('./src/script/admin');
const cleanOrphan = require('./src/script/cleanOrphan');
const handleError = require('./src/middlewares/handleError');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up akses image
app.use('/public/images/gallery', express.static(path.join(__dirname, '/public/images/gallery')));
app.use('/public/images/products', express.static(path.join(__dirname, '/public/images/products')));
app.use('/public/images/services', express.static(path.join(__dirname, '/public/images/services')));
app.use('/public/images/reviewImages', express.static(path.join(__dirname, '/public/images/reviewImages')));

// parser & cors set-up
app.use(express.json());
app.use(cors());

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

// create admin account
createAdminAccount();

// clean orphan image files
cleanOrphan();

// Error handle
app.use(handleError);


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
});