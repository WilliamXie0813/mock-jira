module.exports = (req, res, next) => {
	if (req.method === "POST" && req.path === "/login") {
		return res.status(200).json({ user: { token: 123 } });
	}
	next();
};
