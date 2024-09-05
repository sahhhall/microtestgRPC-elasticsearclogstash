import JWT, { SignOptions } from 'jsonwebtoken';
import { Response, NextFunction } from 'express';

const generateAccessToken = (
  res: Response,
  userId: string,
  mail: string
): void => {
  try {
    const secret = "hahahhaha";
    const payload = { id: userId, email: mail };
    const options: SignOptions = {
      expiresIn: "10d",
      issuer: "sahal.com",
    };

    const token = JWT.sign(payload, secret, options);

    res.cookie('accessToken', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV !== "development",
      sameSite: 'strict',
      maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
    });
  } catch (error) {
    console.error("Error generating access token:", error);
    res.status(500).send("Error generating access token");
  }
};

export default generateAccessToken;
