const express = require('express');
const galleryController = require('../controllers/gallery');
const upload = require('../middlewares/upload');

const router = express.Router();

router.get('/get', galleryController.getPhotos );

router.post('/add', upload.fields([{name: 'photo', maxCount: 10}]), galleryController.addPhoto);
router.post('/delete', upload.none(), galleryController.deletePhoto);

module.exports = router;
