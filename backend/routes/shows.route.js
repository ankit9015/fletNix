const express = require("express");
const router = express.Router();
const Show = require("../models/Show");
const authMiddleware = require("../middlewares/auth.middleware");

// filter shows
router.get("/", authMiddleware, async (req, res) => {
	try {
		const searchTerm = req.query.search?.trim();
		let query = {};
		if (searchTerm) {
			query.$or = [
				{ title: { $regex: searchTerm, $options: "i" } },
				{ cast: { $regex: searchTerm, $options: "i" } },
			];
		}
		if (req.query.type) {
			query.type = req.query.type;
		}

		if (req.user.age < 18) {
			query.rating = { $ne: "R" };
		}

		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.listSize) || 15;
		const skip = (page - 1) * limit;

		const shows = await Show.find(query).skip(skip).limit(limit);
		const totalShows = await Show.countDocuments(query);
		res.json({
			shows,
			total: totalShows,
			currentPage: page,
			totalPages: Math.ceil(totalShows / limit),
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Error", error: error.message });
	}
});

// get show by id
router.get("/:id", authMiddleware, async (req, res) => {
	try {
		const show = await Show.findById(req.params.id);
		if (!show) {
			return res.status(404).json({ message: "Show not found" });
		}
		res.json(show);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Error", error: error.message });
	}
});

module.exports = router;
