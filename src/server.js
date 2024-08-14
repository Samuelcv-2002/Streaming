import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

import liveEvents from './socket/live/events/live.events.js';
import { live_services } from './socket/live/dependencies.js';

const app = express()
const serverNode = createServer(app)

app.use("/assets", express.static("./dist/assets")) // dir estatico


app.get("/", (req, res) => {
    res.sendFile(`${process.cwd()}/dist/index.html`)
})

const io = new Server(serverNode,{
    cors: "*"
})


io.on('connection', (socket) => {
    try {
        liveEvents(socket, io)
        if(socket.handshake.headers['user-agent'] == "python-requests/2.32.3") return
        io.emit("newDevice", {Dispositivos: live_services.Dispositivos})
    } catch (error) {
        socket.disconnect()
    }
});







export default serverNode