const express = require('express');
const loginController = require('../controllers/login');
const multer = require('multer');
const upload = multer();

const router = express.Router();

router.post('/login', upload.none(), loginController.login);
router.post('/refresh', upload.none(), loginController.refreshToken);

module.exports = router;