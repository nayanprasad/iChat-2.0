import http from 'http';
import express from 'express';
import SocketService from "./utils/socket-service.js";
import {configDotenv} from "dotenv";
import {consumeMessages} from "./utils/kafka-consumer";
import {connectKafka} from "./utils/kafka-admin";

configDotenv();
const app = express();
const PORT = process.env.PORT || 8000;



(async () => {
    connectKafka().then(() => {
        console.log("connected to kafka");
    }).catch((err) => {
        console.error(err);
    });
    consumeMessages().then(() => {
        console.log("message consumed successfully");
    }).catch((err) => {
        console.error("CONSUME_MESSAGE: ", err);
    });
    const httpServer = http.createServer();
    SocketService.io.attach(httpServer);
    httpServer.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
    SocketService.initListeners();
})();

