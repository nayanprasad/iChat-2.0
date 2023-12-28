import {Kafka} from "kafkajs"

export const kafka = new Kafka({
    clientId: 'iChat',
    brokers: ['localhost:9092']
});
