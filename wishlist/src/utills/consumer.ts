import { Consumer } from 'kafkajs';
import { kafka, Topic } from './kafka.config';

export type MessageHandler = (data: any) => void;

export class KafkaConsumer {
  private consumer: Consumer;
  private topicHandlers: Map<Topic, MessageHandler>;

  constructor( groupId: string) {
    this.consumer = kafka.consumer({ groupId });
    this.topicHandlers = new Map();
  }

  async connect() {
    await this.consumer.connect();
    console.log(`Kafka Consumer ${this.consumer} connected`);
  }

  async disconnect() {
    await this.consumer.disconnect();
    console.log(`Kafka Consumer ${this.consumer} disconnected`);
  }

  async subscribe(topic: Topic, handler: MessageHandler) {
    await this.consumer.subscribe({ topic, fromBeginning: true });
    this.topicHandlers.set(topic, handler);
  }

  async run() {
    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        if (!message || !message.value) return;
        
        const data = JSON.parse(message.value.toString());
        const handler = this.topicHandlers.get(topic as Topic);
        
        if (handler) {
          handler(data);
        }
      },
    });
  }
}