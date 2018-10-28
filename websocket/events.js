/** Requires */
function socketEvents(io) {
    io.on('connection', function(socket) {
		// ON join-room
		socket.on('join-room', function(details) {
			const { roomId } = details;
			socket.join(roomId);

			// Fetches Seats from DB
			let seats = { 1: 'A', 2: 'A', 3: 'B', 4: 'A', 5: 'A' };

			socket.emit('get-seat', { seats });
		})

		// ON hover-seat
		socket.on('hover-seat', function(details) {
			const { roomId, hoverSeat, option } = details;

			// Emit hover-seat
			io.in(roomId).emit('hover-seat', { initiatorId: socket.id, hoverSeat, option });
		});
	
		// ON set-unset-seat		
		socket.on('set-unset-seat', function(details) {
			const { roomId, setSeat, option } = details;

			// Update DB

			// Broadcast in the room
			io.in(roomId).emit('set-unset-seat', { initiatorId: socket.id, setSeat, option });
		})

	});

}

/** Exports */
module.exports = socketEvents