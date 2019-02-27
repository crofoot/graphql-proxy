exports.logIP = (req, res, next) => {
    console.log('ip:', req.ip);
    next();
}