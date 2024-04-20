const express = require('express');
const app = express();

// env
require('dotenv').config();

// server middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// server routes
app.use("/api/user", require("./routes/auth"));
app.use("/api/post", require("./routes/posts"));

// server start
const port = process.env.MONGO_DB_PORT || 5000
app.listen(port, () => {
    console.log(`Express listening on port ${port}`);
});

// database connect
const mongoConnect = require("./config/mongoose");
mongoConnect(process.env.MONGO_DB_URL);

