import express from "express";
import {
    errorHandler
} from "@sahhhallecom/common";
import { createProduct } from "./routes/create";
import { getAllProducts } from "./routes/show";

const app = express();

// app.all("*", async (req, res, next) => {
//   throw new NotFoundError();
// });

app.use(express.json());

app.use(createProduct);
app.use(getAllProducts);
app.use(errorHandler);

export { app };
