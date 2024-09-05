import express, { Request, Response } from "express";

import { UserDoc } from "../models/user";
const router = express.Router();
interface AuthenticatedRequest extends Request {
    user?: UserDoc | null;
}

router.get("/currentuser", async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user;
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.status(200).send(user);
});

export { router as currentUserRouter };
