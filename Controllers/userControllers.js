import asyncHandler from 'express-async-handler';
import User from '../Models/userModel.js';
import jwt from 'jsonwebtoken';



export const registerUser = asyncHandler(async (req, res) => {

    const { firstname, lastname, email, password } = req.body

    if (!firstname || !lastname || !email || !password) {
        res.status(400);
        throw new Error(`All fields are mandatory`)
    }

    const emailExist = await User.findOne({ email })

    if (emailExist) {
        res.status(403);
        throw new Error(`Email Already exist...Try another`)
    }

    const user = await User.create({
        firstname, lastname, email, password
    })

    if (user) {

        user.password = undefined;

        try {
            const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '30d' })

            res.status(201);
            res.json({
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                token
            })

        } catch (error) {
            res.status(500)
            throw new Error('Error in Generating Token');
        }

    } else {
        res.status(500)
        throw new Error(`Error in registering user`)
    }

})



export const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    if (!email || !password) {
        res.status(401);
        throw new Error(`Email and Password both are required`)
    }

    const user = await User.findOne({ email })

    if (user) {

        if (await user.matchPassword(password)) {

            user.password = undefined;

            try {
                const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '30d' })

                res.status(201);
                res.json({
                    id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    token
                })

            } catch (error) {
                res.status(500)
                throw new Error('Error in Generating Token');
            }


        } else {
            res.status(401);
            throw new Error(`Email and Password Do not match`)
        }

    } else {
        res.status(403);
        throw new Error(`Email does not exist`)
    }
})