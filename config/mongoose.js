const mongoConnect = (url) => {
    // Mongoose is an ODM (Object Data Modeling) library for MongoDB.
    require("mongoose").connect(url)
    .then(  ()   => { console.log("Connected to MongoDB"); })
    .catch((err) => { console.log(err); });
};

module.exports = mongoConnect;
