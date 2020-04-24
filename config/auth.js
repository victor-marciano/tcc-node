const jwt = require('jsonwebtoken');

exports.verifyJWT = (req, res, next) => {
    const requestToken = req.headers['Authorization'];
    const token = requestToken && requestToken.split(' ')[1];

    if (token === null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) {
            res.sendStatus(403);
        }
        
        req.user = user;
        next();
    })
}