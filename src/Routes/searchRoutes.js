const express = require('express');
const { searchContactsByName, searchContactsByPhoneNumber } = require('../Controllers/searchController');

const router = express.Router();

router.get('/search/name', searchContactsByName);
router.get('/search/phone', searchContactsByPhoneNumber);

module.exports = router;
