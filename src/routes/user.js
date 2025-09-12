const express = require('express');
const userController = require('../controllers/user');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');

const router = express();

router.get('/users', authMiddleware.authenticateToken, userController.getUsers);
router.get('/me', authMiddleware.authenticateToken, userController.getMe);

router.patch('/history', authMiddleware.authenticateToken, upload.none(), userController.addHistory);
router.patch('/cart', authMiddleware.authenticateToken, upload.none(), userController.addCart);
router.patch('/cart/edit/:cart_id', authMiddleware.authenticateToken, upload.none(), userController.editCart);

router.delete('/cart/delete/:cart_id', authMiddleware.authenticateToken, upload.none(), userController.deleteCart);

module.exports = router;