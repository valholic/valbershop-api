const express = require('express');
const shopController = require('../controllers/shop');
const router = express.Router();
const upload = require('../middlewares/upload');

router.get('/get', shopController.getGoods);
router.get('/get/:goods_id', shopController.getGoodsDataById);

router.post('/add', upload.fields([{name: 'image', maxCount: 10}]), shopController.addGoods);

router.put('/edit/:goods_id', upload.fields([{name: 'image', maxCount: 10}]), shopController.editGoodsData);
router.patch('/review/:goods_id', upload.fields([{name: 'review_img', maxCount: 1}]), shopController.addReview);
router.patch('/review/edit/:goods_id/:review_id', upload.fields([{name: 'review_img', maxCount: 1}]), shopController.editReview);

router.delete('/delete/:goods_id', shopController.deleteGoodsData);
router.delete('/review/delete/:goods_id/:review_id', shopController.deleteReview);

module.exports = router;
