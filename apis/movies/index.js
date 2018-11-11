/** Requires */
const express = require('express');
const router = express.Router();

// Instantiate Redis
const redisClient = require('redis').createClient();

/** Routes */
router.get('/list', (req, res) => {
	res.status(200);
	return res.sendFile(process.cwd() + '/public/index.html');
});

router.get('/select', (req, res) => {
	const { id: roomId } = req.query;

	res.status(200);
	res.render('seat-layout', { roomId });
});

router.get('/init', (req, res) => {
	redisClient.hmset('seats.ddlj', ['1', 'A', '2', 'A', '3', 'A', '4', 'B', '5', 'A']);
	redisClient.hmset('seats.k3g', ['1', 'A', '2', 'A', '3', 'A', '4', 'A', '5', 'A']);

	redisClient.hgetall('user.ddlj', function(err,res) {
		if (!res) return;
		redisClient.hdel('user.ddlj', Object.keys(res));
	})

	redisClient.hgetall('user.k3g', function(err,res) {
		if (!res) return;
		redisClient.hdel('user.k3g', Object.keys(res));
	})

	res.send('Done');
});


/** Exports */
module.exports = router;