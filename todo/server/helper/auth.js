const authorizationRequired = "Authorization Required";
const invalidCredentials = "Invalid Credentials";

const auth = (req, res, next) => {
    if (!req.headers.authorization) {
        res.statusMessage = authorizationRequired;
        return res.status(401).json({ error: authorizationRequired });
    } else {
        try{
            const token = req.headers.authorization
            jwt.verify(token, process.env.JWT_SECRET_KEY)
            next();
        } catch (err) {
            res.statusMessage = invalidCredentials;
            return res.status(401).json({ error: invalidCredentials });
        }
    }
}

export { auth };