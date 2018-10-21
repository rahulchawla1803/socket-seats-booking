/** Requires */
function socketEvents(io) {
    io.on('connection', function(socket) {
		console.log('SERVER says hello', socket.id);

		socket.on('room', function(details) {
			const { name } = details;
			socket.join(name);

			socket.emit('get-seat', seats);
		})
		
		socket.on('select-seat', function(details) {
			const { selectSeat } = details;

			// Change the hash

			// Identify room name for the socket

			// Broadcast in the room
			io.in(name).emit('get-seat', seats);
		})

		socket.on('remove-seat', function(details) {
			const { removedSeat } = details;

			// Change the hash

			// Identify room name for the socket

			// Broadcast in the room
			io.in(name).emit('get-seat', seats);

		})

	});

}

/** Exports */
module.exports = socketEvents