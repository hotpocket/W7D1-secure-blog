const { userModel } = require("../models/user");

// Function to handle user registration
const Register = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    const rec = await userModel.findOne({ email });
    if (rec) {
      return res.status(400).json({ message: "User already exists." });
    }
    const newUser = new userModel({ fullname, email, password });
    await newUser.save();
    console.log(newUser);

    // Generate a JWT token
    const token = generateToken(newUser);

    // Send the token in the response
    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Function to handle user login
const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log(email, password);
    const user = await userModel.findOne({ email });
    console.log(user);
    // If user not found or password doesn't match, return an error
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = generateToken(user);

    // Send the token in the response
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
// Function to generate JWT token
function generateToken(user) {
  // console.log(user);
  // Generate a JWT token using the user's information
  const token = require("jsonwebtoken").sign(
    { "id": user._id, "email": user.email },
    process.env.JWT_SECRET,
    { "expiresIn": "1h" }
  );
  return token;
}

module.exports = { Register, Login };
