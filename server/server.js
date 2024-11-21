const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const socketController = require('../controllers/socketController');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 5000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/', require('../routes/index'));
app.use('/api', require('../routes/api'));

// Socket.IO logic
io.on('connection', socketController);

// Start the server with error handling
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}).on('error', (err) => {
    console.error('Server error:', err);
});