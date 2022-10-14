const errorHandler = (err, req, res, next) => {
    res.status = err.statusCode ? err.statusCode : 500;
    console.log(err);
    return res.json({ msg: err.message });
};

module.exports = errorHandler;
