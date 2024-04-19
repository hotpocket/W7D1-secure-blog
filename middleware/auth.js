console.log("controllers/auth.js");
const e = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
    const jwtToken = req.headers.token;
    if (jwtToken) {
        jwt.verify(jwtToken, process.env.JWT_SECRET, (err, user) => {
            if (err) {
              res.status(403).json("Token is not valid!");
            }else{
              req.user = user.user;
            }
            next();
        });
    } else {
        return res.status(401).json("You are not authenticated!");
    }
};

module.exports = { verifyToken };
