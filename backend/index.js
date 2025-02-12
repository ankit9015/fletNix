const express = require("express");
const dbConnect = require("./db/db");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Database Connection
dbConnect();

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
