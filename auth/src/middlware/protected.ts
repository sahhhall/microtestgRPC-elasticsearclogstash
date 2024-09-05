import JWT from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User, UserDoc } from "../models/user";

import { NotFoundError } from '@sahhhallecom/common'
interface AuthenticatedRequest extends Request {
    user?: UserDoc | null;
}


const protectedAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.cookies?.accessToken;
    console.log(req.cookies)
    if (!token) {
        return res.status(401).json({ message: "Unauthorized - No token found" });
    }

    try {
        const secret = "hahahhaha";
        const decoded = JWT.verify(token, secret) as { id: string };

        req.user = await User.findById(decoded.id).select("-password");

        if (!req.user) {
            throw new NotFoundError()
        }
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        throw new NotFoundError()
    }
};

export { protectedAuth };
