import http from 'http';
import express from 'express';
import SocketService from "./utils/socket-service.js";

const app = express();
const PORT = process.env.PORT || 8000;



(async () => {
    const httpServer = http.createServer();
    SocketService.io.attach(httpServer);
    httpServer.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
    SocketService.initListeners();
})();

