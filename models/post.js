const { Schema, model } = require("mongoose");

const postSchema = new Schema({
    title:       { type: String, required: true },
    userId:      { type: String, required: true},
    description: { type: String, required: true }
});

// https://mongoosejs.com/docs/models.html
const postModel = model("post", postSchema);
module.exports = { postModel };
