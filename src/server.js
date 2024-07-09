import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

import liveEvents from './socket/live/events/live.events.js';
import { elements } from './elements.js';

const app = express()
const serverNode = createServer(app)

app.get("/", (req, res) => {
    res.sendFile(`${process.cwd()}/index.html`)
})

app.get("/dispositivos", (req, res) => {
    res.status(200).json({
        "dispositivos": elements
    })
})

const io = new Server(serverNode,{
    cors: "*"
})


io.on('connection', (socket) => {
    try {
        if(socket.handshake.headers['user-agent'] == "python-requests/2.32.3"){
            elements.push({
                id: socket.id,
                socket: socket.handshake.address
            })
        }
        console.log('a user connected');
        liveEvents(socket, io)
    } catch (error) {
        //elements = elements.filter(element => id != socket.id)
        socket.disconnect()
    }
});







export default serverNode