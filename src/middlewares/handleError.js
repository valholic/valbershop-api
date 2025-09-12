const handleError = (err, req, res, next) => {
    const message = err.message || "Internal server error";
    const status = err.statusCode || 500;
    const data = err.data || null;

    res.status(status).json({
        message,
        data,
    });
};

module.exports = handleError;