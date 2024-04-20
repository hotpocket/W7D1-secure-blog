const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email:    { type: String, required: true },
  password: { type: String, required: true }
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Creating the User Object Data Model based on their schema
const userModel = mongoose.model("user", userSchema);

// Exporting the User model to be used by other modules
module.exports = { userModel };
