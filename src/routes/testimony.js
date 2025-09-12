const express = require('express');
const multer = require('multer');
const testimonyController = require('../controllers/testimony');
const upload = multer();

const router = express.Router();

router.get('/get', testimonyController.getTestimonies);

router.post('/add', upload.none(), testimonyController.addTestimony);

router.delete('/delete/:testimony_id', testimonyController.deleteTestimony);

module.exports = router;
