console.log("controllers/auth.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
    // Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ij...
    console.log("req.headers: ", req.headers);
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        console.log("token: ", token);
        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if (err) {
              res.status(403).json("Token is not valid!");
              return;
            }
            console.log("payload: ", payload);
            req.user = payload;
            next();
        });
    } else {
        return res.status(401).json({message: "You are not authenticated!"});
    }
};

module.exports = { verifyJWT };