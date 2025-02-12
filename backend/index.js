const express = require("express");
const dbConnect = require("./db/db");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth.route");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
dbConnect();

// Routes
app.use("/api/auth", authRoutes);

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
