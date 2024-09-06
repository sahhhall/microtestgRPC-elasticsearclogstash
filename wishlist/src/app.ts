import express from "express";
import {
    errorHandler,
    userDataMiddleware
} from "@sahhhallecom/common";
import { wishlistCreate } from "./routes/create";
import { wishlistShow } from "./routes/show";

const app = express();

// app.all("*", async (req, res, next) => {
//   throw new NotFoundError();
// });

app.use(userDataMiddleware)
app.use(express.json());


app.use(wishlistCreate);
app.use(wishlistShow)


app.use(errorHandler);

export { app };
