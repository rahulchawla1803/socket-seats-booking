/** Requires */
const express = require('express');
const router = express.Router();

/** Routes */
router.get('/list', (req, res) => {
	res.status(200);
	return res.sendFile(process.cwd() + '/public/index.html');
});

router.get('/select', (req, res) => {
	const { id } = req.query;

	res.status(200);
	return res.sendFile(process.cwd() + `/public/${id}.html`);
});


/** Exports */
module.exports = router;