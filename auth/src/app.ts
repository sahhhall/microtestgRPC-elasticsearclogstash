import express from "express";
import {
    errorHandler,
    userDataMiddleware
} from "@sahhhallecom/common";
import "express-async-errors";
import { currentUserRouter } from "./routes/currentuser";
import { registerUser } from "./routes/register";
import { signUser } from "./routes/signin";
import cookieParser from 'cookie-parser';

const app = express();

// user data extract and set in req.user
app.use(userDataMiddleware)

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(registerUser);
app.use(signUser)
app.use(currentUserRouter);

app.use(errorHandler);

export { app };
