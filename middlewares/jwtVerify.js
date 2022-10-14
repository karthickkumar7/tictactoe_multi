const jwt = require("jsonwebtoken");

const jwtVerify = (req, res, next) => {
    try {
        const headers = req.headers.authorization;
        if (!headers)
            return res.status(401).json({ msg: "token is required!" });
        const token = headers.split(" ")[1];
        const user = jwt.verify(token, process.env.ACCESS);
        req.user = user;
        next();
    } catch (err) {
        return res.status(403).json({ msg: "forbidden!" });
    }
};

module.exports = jwtVerify;
