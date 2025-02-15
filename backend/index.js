const express = require("express");
const dbConnect = require("./db/db");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth.route");
const showsRoutes = require("./routes/shows.route");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(
	cors({
		origin: [process.env.APP_URL, 'https://fletnix-ankit.netlify.app'],
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);
app.use(express.json());

// Database Connection
dbConnect();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/shows", showsRoutes);

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
