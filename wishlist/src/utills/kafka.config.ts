import { Kafka } from 'kafkajs';

const brokers = ['0.0.0.0:9092'];
const clientId = 'wishlist-service';

export const kafka = new Kafka({
  clientId,
  brokers,
});

export const topics = ['product-created', 'product-updated'] as const;
export type Topic = typeof topics[number];