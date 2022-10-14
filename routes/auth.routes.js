const router = require("express").Router();

const auth = require("../controllers/auth");

router.get("/", auth.getAllUsers);

router.post("/register", auth.register);

router.post("/login", auth.login);

module.exports = router;
