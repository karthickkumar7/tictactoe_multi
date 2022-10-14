const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

const register = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser)
        return res.status(409).json({ msg: "user already exists!" });

    const user = await User.create({
        username,
        password: await bcrypt.hash(password, 10),
    });

    const token = jwt.sign({ username, _id: user._id }, process.env.ACCESS, {
        expiresIn: "1d",
    });

    return res.status(201).json({ msg: "user created!", user, token });
});

const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).exec();

    if (!user)
        return res.status(400).json({ msg: "incorrect username/password!" });

    if (!(await bcrypt.compare(password, user.password)))
        return res.status(400).json({ msg: "incorrect username/password!" });

    const token = jwt.sign({ username, _id: user._id }, process.env.ACCESS, {
        expiresIn: "1d",
    });

    console.log(user);

    return res
        .status(200)
        .json({
            msg: "login success!",
            user: { username, _id: user._id },
            token,
        });
});

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select("-password").lean().exec();
    return res.status(200).json({ msg: "success!", users });
});

module.exports = {
    register,
    login,
    getAllUsers,
};
