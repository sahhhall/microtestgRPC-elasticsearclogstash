import mongoose from "mongoose";
import { app } from "./app";
import { DatabaseConnectionError } from "@sahhhallecom/common";
import { KafkaConsumer } from "./utills/consumer";
import { consumeEvent } from "./events/consumers/product-created";
import { consumeupdatedEvent } from "./events/consumers/product-updated";

let port: number = 4004;


  


export async function startKafkaConsumer() {
    const consumer = new KafkaConsumer('wishlist-service');
    await consumer.connect();
    await consumeEvent(consumer)
    await consumeupdatedEvent(consumer);
    await consumer.run();
  }

(async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/wishlist');
        console.log("connected to mongodb");

        await startKafkaConsumer();
        console.log("Kafka Consumer started");
    } catch (err) {
        console.log(err)
        throw new DatabaseConnectionError()
    }
    app.listen(port, () => {
        console.log("server connected on port 4004!!!!!!!!");
    });
})();


// Graceful shutdown
process.on('SIGINT', async () => {
    process.exit(0);
  });