/** Requires */
function socketEvents(io) {
    io.on('connection', function(socket) {
		console.log('SERVER says hello', socket.id);

		socket.on('room', function(details) {
			const { roomId } = details;
			socket.join(roomId);

			// Fetches Seats from redis
			let seats = { 1: 'A', 2: 'A', 3: 'B', 4: 'A', 5: 'A' };

			socket.emit('get-seats', { seats });
		})
		
		/*		
		socket.on('select-seat', function(details) {
			const { selectSeat } = details;

			// Change the hash

			// Identify room id for the socket

			// Broadcast in the room
			io.in(id).emit('get-seat', seats);
		})

		socket.on('remove-seat', function(details) {
			const { removedSeat } = details;

			// Change the hash

			// Identify room id for the socket

			// Broadcast in the room
			io.in(id).emit('get-seat', seats);

		})
	*/
	});

}

/** Exports */
module.exports = socketEvents