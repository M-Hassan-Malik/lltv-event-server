const db = require("../models");

exports.getSuperAdmins = (req, res) => {
	let { limit, startFrom } = req.body.data;

	db.Registration.find()
		.skip(startFrom)
		.limit(limit)
		.exec((err, result) => {
			err && res.status(400).json({ error: err });
			result
				? res.status(400).json({ result: result })
				: res.status(400).json({ error: err });
		});
};
