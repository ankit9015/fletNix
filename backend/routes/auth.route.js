const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/register", async (req, res) => {
	try {
		const { email, password, age } = req.body;
		const hashedPassword = await bcrypt.hash(
			password,
			parseInt(process.env.BCRYPT_SALT)
		);
		const user = new User({ email, password: hashedPassword, age });
		await user.save();
		res.status(201).json({ message: "User registered successfully" });
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ message: "Registration failed", error: error.message });
	}
});

router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		const passwordMatch = await bcrypt.compare(password, user.password);

		if (!passwordMatch) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		const token = jwt.sign(
			{ userId: user._id, age: user.age },
			process.env.JWT_SECRET,
			{ expiresIn: "1h" }
		);

		res.json({ message: "Login successful", token });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Login failed", error: error.message });
	}
});

module.exports = router;
