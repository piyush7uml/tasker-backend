import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';




export const auth = asyncHandler((req, res, next) => {

    let token;

    token = (req.headers.authorization && req.headers.authorization.startsWith(`Bearer`) && req.headers.authorization.split(" ")[1]) ? req.headers.authorization.split(" ")[1] : null;


    if (token) {
        try {

            const decode = jwt.verify(token, process.env.SECRET);

            req.user = decode

        } catch (error) {
            res.status(401);
            throw new Error(`Token Failed`)
        }
    } else {
        res.status(404);
        throw new Error(`Token not found`)
    }

    next()
})