import mongoose from "mongoose";
import { app } from "./app";
import { DatabaseConnectionError } from "@sahhhallecom/common";

let port: number = 4000;

(async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/products');
        console.log("connected to mongodb");
    } catch (err) {
        console.log(err)
        throw new DatabaseConnectionError()
    }
    app.listen(port, () => {
        console.log("server connected on port 4000!!!!!!!!");
    });
})();