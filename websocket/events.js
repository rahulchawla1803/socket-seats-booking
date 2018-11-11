/** Requires */
function socketEvents(io, redisClient) {
    io.on('connection', function(socket) {
		// ON join-room
		socket.on('join-room', function(details) {
			const { roomId } = details;
			socket.roomId = roomId;

			socket.join(roomId);

			// Fetches Seats from DB
			redisClient.hgetall(`seats.${roomId}`, function(err,res) {
				const seats = res;

				// Emit get-seat
				socket.emit('get-seat', { seats });
			});
		})

		// ON hover-seat
		socket.on('hover-seat', function(details) {
			const { hoverSeat, option } = details;

			// Emit hover-seat
			io.in(socket.roomId).emit('hover-seat', { initiatorId: socket.id, hoverSeat, option });
		});
	
		// ON set-unset-seat		
		socket.on('set-unset-seat', function(details) {
			const { setSeat, option } = details;

			// Update DB
			const hash = {
				'unset': 'A',
				'set': 'B'
			};

			redisClient.hmset(`seats.${socket.roomId}`, [setSeat, hash[option]], function (err, res) {
				// Fetch existing seats of the user
				redisClient.hmget(`user.${socket.roomId}`, [socket.id], function (err,res) {
					const seats = res[0] ? res[0].split(',') : [];

					// if set
					if (option === 'set') {
						seats.push(setSeat);
					}

					// if unset
					if (option === 'unset') {
						const index = seats.indexOf(setSeat);
						seats.splice(index, 1);
					}
				
					// Set/Unset new seat of the user 
					redisClient.hmset(`user.${socket.roomId}`, [socket.id, seats]);
				})

				// Broadcast in the room
				io.in(socket.roomId).emit('set-unset-seat', { initiatorId: socket.id, setSeat, option });
			});

		});

		// ON disconnect
		socket.on('disconnect', function() {
			// Fetch existing seats of the user
			redisClient.hmget(`user.${socket.roomId}`, [socket.id], function (err,res) {
				const seats = res[0] ? res[0].split(',') : [];

				if (!seats.length) return;

				// Make seats available
				const input = [];
				for (const seat of seats) {
					input.push(seat, 'A');
				}

				redisClient.hmset(`seats.${socket.roomId}`, input, function (err, res) {
					// Fetch present seats
					redisClient.hgetall(`seats.${socket.roomId}`, function (err, res) {
						// Emit get-seat
						io.in(socket.roomId).emit('get-seat', { seats: res });

						// Remove socket.id from user set
						redisClient.hdel(`user.${socket.roomId}`, [socket.id]);
					})	
				})
			});

		});

	});
}

/** Exports */
module.exports = socketEvents