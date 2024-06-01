const express = require('express');
const { markAsSpam, checkSpam} = require('../Controllers/spamController');
const protect = require('../Middleware/authMiddleware');
const   router = express.Router();

router.post('/mark',protect, markAsSpam);
router.get('/check/:phone',protect, checkSpam);

module.exports = router;