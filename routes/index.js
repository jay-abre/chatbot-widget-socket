const express = require('express');
const router = express.Router();
const path = require('path');

// Serve the main HTML file
router.get('/main.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/main.html'));
});

module.exports = router;