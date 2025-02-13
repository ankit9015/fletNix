const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
	const token = req.header("Authorization")?.replace("Bearer ", "");

	if (!token) {
		return res
			.status(401)
			.json({ message: "Authorization denied, no token provided" });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch (error) {
		console.error("Token verification error:", error);
		return res.status(401).json({ message: "Invalid token" });
	}
};

module.exports = authMiddleware;
