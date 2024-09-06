import express from "express";
import {
    errorHandler
} from "@sahhhallecom/common";

const app = express();

// app.all("*", async (req, res, next) => {
//   throw new NotFoundError();
// });

app.use(express.json());




app.use(errorHandler);

export { app };
