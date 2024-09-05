import express from "express";
import {
    errorHandler
} from "@sahhhallecom/common";
import { createOrder } from "./routes/create";


const app = express();

// app.all("*", async (req, res, next) => {
//   throw new NotFoundError();
// });

app.use(express.json());
app.use(createOrder)

app.use(errorHandler);

export { app };
