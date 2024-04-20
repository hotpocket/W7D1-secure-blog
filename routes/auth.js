const router = require("express").Router();
const user = require("../controllers/user");


router.post("/login", user.Login);
router.post("/register", user.Register);

module.exports = router;
