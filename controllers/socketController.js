module.exports = (socket) => {
    console.log('A user connected');

    // Listen for messages from the client
    socket.on('message', (data) => {
        console.log('Message received:', data);
        // Send a response back to the same client
        socket.emit('response', `Server says: ${data}`);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
};