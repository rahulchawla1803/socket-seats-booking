/** Requires */
const express = require('express');
const router = express.Router();

/** Routes */
router.get('/list', (req, res) => {
	res.status(200);
	return res.sendFile(process.cwd() + '/public/index.html');
});

router.get('/select', (req, res) => {
	console.log(req.query);
	const { id: roomId } = req.query;

	res.status(200);
	res.render('seat-layout', { roomId });
});


/** Exports */
module.exports = router;