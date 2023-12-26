import {Server} from "socket.io"

class SocketService {
    private _io: Server;
    constructor() {
        console.log("initializing socket service")
        this._io = new Server();
    }
    get io(): Server {
        return this._io;
    }

    public initListeners() {
        console.log("initializing socket listeners")
        const io = this._io;
        io.on("connect", (socket) => {
            console.log(`new connection : ${socket.id}`);
            io.on("event:message", async ({message}: {message: string}) => {
                console.log(message)
            })
        })
    }
}

export default new SocketService();
