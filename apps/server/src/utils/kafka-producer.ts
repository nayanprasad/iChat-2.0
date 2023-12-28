import {kafka} from "./kafka-client";
import {UserType} from "../type";


export async function produceMessage(data: UserType) {
    const producer = kafka.producer();
    console.log('connecting to producer...');
    await producer.connect();
    console.log('connected to producer');

    await producer.send({
        topic: 'MESSAGES',
        messages: [
            {
                partition: 0,
                key: 'user-message',
                value: JSON.stringify({user: data.user, message: data.message})
            }
        ],
    });
    await producer.disconnect();

}
