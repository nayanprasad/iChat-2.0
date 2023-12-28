import {Server} from "socket.io";
import Redis from "ioredis";
import {produceMessage} from "./kafka-producer";
import {configDotenv} from "dotenv";
import {UserType} from "../type";



configDotenv();

const redisUri = process.env.REDIS_URI || "redis://localhost:6379";
const pub = new Redis(redisUri);
const sub = new Redis(redisUri);

class SocketService {
    private _io: Server;
    constructor() {
        console.log("initializing socket service")
        this._io = new Server({
            cors: {
                allowedHeaders: "*",
                origin: "*"
            }
        });
        sub.subscribe("MESSAGES");
        console.log("subscribed to messages");
    }
    get io(): Server {
        return this._io;
    }

    public initListeners() {
        console.log("initializing socket listeners")
        const io = this._io;
        io.on("connect", (socket) => {
            console.log(`new connection : ${socket.id}`);
            socket.on("event:message", async (data: UserType) => {
                console.log(`${data.user}: ${data.message}`);
                // pub.set("message", message)
                await pub.publish("MESSAGES", JSON.stringify(data), (err, res) => {
                    console.log("published message to redis", res);
                });
            })
        });

        sub.on("message", (channel, data) => {
            if(channel === "MESSAGES") {
                console.log("message received from redis", data);
                io.emit("event:message", JSON.parse(data));
                produceMessage(JSON.parse(data)).then(() => {
                    console.log("message published to kafka");
                }).catch((err) => {
                    console.error(err);
                });
            }
        })
    }
}

export default new SocketService();
