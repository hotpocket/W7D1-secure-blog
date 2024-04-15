const express = require('express');
const app = express();
const port = process.env.PORT || 5000

// hook middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// register routes
app.use("/api/user", require("./routes/auth"));
app.use("/api/post", require("./routes/posts"));

// start express server
app.listen(port, () => {
    console.log(`Express listening on port ${port}`);
});

// connect database
const connectToMongoDB = require("./config/mongoose");
connectToMongoDB(process.env.MONGO_DB_URL);
