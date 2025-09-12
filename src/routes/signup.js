const express = require('express');
const multer = require('multer');
const signupController = require('../controllers/signup');
const upload = multer();

const router = express.Router();

router.post('/register', upload.none(), signupController.createUser);

module.exports = router;