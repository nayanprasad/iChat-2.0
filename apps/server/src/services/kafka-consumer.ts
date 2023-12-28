import {kafka} from "./kafka-client";
import DB from "./prisma";

export  async function consumeMessages(){
    const consumer = kafka.consumer({groupId: 'consumer-group'});
    console.log('connecting to consumer...');
    await consumer.connect();
    console.log('connected to consumer');
    await consumer.subscribe({topic: 'MESSAGES', fromBeginning: true});

    await consumer.run({
        autoCommit: true,
        eachMessage: async ({topic, partition, message, heartbeat, pause}: any) => {
            console.log(`consumer-group: [${topic}]: PART:${partition}:`, message?.value.toString());
            const data = JSON.parse(message?.value.toString());
            await DB.message.create({
                data: {
                    message: data.message,
                    user: data.user
                }
            })
        },
    });
};
