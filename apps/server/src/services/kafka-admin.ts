import {kafka} from "./kafka-client";

export  async function connectKafka(){
    const admin = kafka.admin();
    console.log('connecting to admin...');
    await admin.connect();
    console.log('connected to admin');
    await admin.createTopics({
        topics: [{
            topic: 'MESSAGES',
            numPartitions: 1
        }]
    });

    await admin.disconnect();
};

