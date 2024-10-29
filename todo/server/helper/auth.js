const authorizationRequired = "Authorization Required";
const invalidCredentials = "Invalid Credentials";

const auth = (req, res, next) => {
    if (!req.headears.authorization){
        res.statusMessage = authorizationRequired;
        res.status(401).json({error: authorizationRequired});
    } else {
        try{
            const token = req.headers.authorization
            jwt.verify(token, process.env.JWT_SECRET)
            next();
        }
        catch (error){
            res.statusMessage = invalidCredentials;
            res.status(403).json({error: invalidCredentials});
        }
    }
}

export {auth};