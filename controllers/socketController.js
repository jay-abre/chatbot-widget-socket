module.exports = (socket) => {
    console.log('A user connected');

    socket.join("some room");

    // Listen for messages from the client
    socket.on('message', (data) => {
        console.log('Message received:', data);

        // Send a response back to the same client
        socket.to("some room").emit('response', `${data}`);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
};