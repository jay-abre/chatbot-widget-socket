const express = require('express');
const router = express.Router();

// Basic API route
router.get('/', (req, res) => {
    res.json({ message: 'Hello, world!' });
});

module.exports = router;