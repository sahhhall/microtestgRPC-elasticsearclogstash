import mongoose from "mongoose";
import { app } from "./app";
import { DatabaseConnectionError } from "@sahhhallecom/common";
import { connectProducer, disconnectProducer } from "./utill/kafka-producer";

let port: number = 4000;

(async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/products');
        console.log("connected to mongodb");

        await connectProducer();
        console.log("connected to kafka");
        
    } catch (err) {
        console.log(err)
        throw new DatabaseConnectionError()
    }
    app.listen(port, () => {
        console.log("server connected on port 4000!!!!!!!!");
    });
})();




process.on('SIGINT', async () => {
    await disconnectProducer();
    process.exit(0);
});