import express, { Request, Response } from 'express';
import { BadRequestError, validateRequest } from '@sahhhallecom/common';
import { User } from '../models/user';

import { body } from "express-validator";
import generateAccessToken from '../utils/generateToken';


const router = express.Router();

router.post("/register", [
    body("email").isEmail().withMessage("email must be vaid"),
    body('password').trim().isLength({ min: 3, max: 20 }).
    withMessage("password must be 3 to 20 characters")
], validateRequest, async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new BadRequestError("Email already in use");
    };
    const user = User.build({ email, password });
    await user.save();
    //generate jwt
    generateAccessToken(res, user.id , user.email )
    res.status(201).send(user);
})

export { router as registerUser }