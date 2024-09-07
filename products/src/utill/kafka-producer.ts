import { Producer } from "kafkajs";
import { kafka, Topic } from "./kafka";

let producer: Producer;

export async function connectProducer() {
    producer = kafka.producer();
    await producer.connect();
    console.log('Kafka Producer connected');
}

// export async function connectToKafka() {
//     await producer.connect();
// }

export async function disconnectProducer() {
    await producer.disconnect();
    console.log('Kafka Producer disconnected');
}
export async function sendMessage(topic: Topic, message: any) {
    return producer.send({
        topic,
        messages: [{ value: JSON.stringify(message) }],
    });
}