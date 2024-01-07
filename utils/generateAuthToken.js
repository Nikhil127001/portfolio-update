
const jwt = require('jsonwebtoken')


const generateAuthToken = ({ _id, email }) => {
    return jwt.sign({ _id, email }, process.env.JWT_SECRET, { expiresIn: "7h" }
    );
}


const verifyAuthToken = (req, res, next) => {
    const token = req.headers.auth_token;

    try {
        if (!token) {
            const err = new Error('a token is required for authentication');
            next(err);
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = decoded;
            next()
        } catch (err) {
            next(err);
        }
    } catch (err) {
        next(err)
    }
}


module.exports = {generateAuthToken, verifyAuthToken}