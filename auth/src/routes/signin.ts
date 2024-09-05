import express, { Request, Response } from 'express';
import { BadRequestError, validateRequest } from '@sahhhallecom/common';
import { User } from '../models/user';

import { body } from "express-validator";
import generateAccessToken from '../utils/generateToken';
import { Password } from '../services/password';


const router = express.Router();

router.post("/signin", [
    body("email").isEmail().withMessage("Email must be valid"),
], validateRequest, async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        throw new BadRequestError("Inavlid credentials");
    }
    const passwordMatch = await Password.compare(existingUser.password, password);
    if (!passwordMatch) {
        throw new BadRequestError("Invalid password");
    }
    generateAccessToken(res, existingUser.id , existingUser.email)
    res.status(201).send(existingUser);
})

export {router as signUser}