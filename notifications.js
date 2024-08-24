const express = require('express');
const {
  sendWebNotification,
  sendEmailNotification,
} = require('../controllers/notificationController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/web', protect, sendWebNotification);
router.post('/email', protect, sendEmailNotification);

module.exports = router;
