import {Server} from "socket.io";
import Redis from "ioredis";
import {configDotenv} from "dotenv";
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
        console.log("subscribed to messages")
    }
    get io(): Server {
        return this._io;
    }

    public initListeners() {
        console.log("initializing socket listeners")
        const io = this._io;
        io.on("connect", (socket) => {
            console.log(`new connection : ${socket.id}`);
            socket.on("event:message", async ({message}: {message: string}) => {
                console.log("message received", message);
                // pub.set("message", message)
                await pub.publish("MESSAGES", JSON.stringify({message}), (err, res) => {
                    console.log("published message to redis", res);
                });
            })
        });

        sub.on("message", (channel, message) => {
            if(channel === "MESSAGES") {
                console.log("message received from redis", message);
                io.emit("event:message", message);
            }
        })
    }
}

export default new SocketService();
