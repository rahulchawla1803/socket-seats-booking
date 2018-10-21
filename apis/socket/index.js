/** Requires */
function socketEvents(io) {
    io.on('connection', function(socket) {
		console.log('SERVER says hello', socket.id);
	});

}

/** Exports */
module.exports = socketEvents