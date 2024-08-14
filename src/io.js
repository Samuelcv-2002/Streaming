import { Server } from 'socket.io';
import liveEvents from './socket/live/events/live.events.js';
import serverNode from "./Api/server.js";

export const server = serverNode

export const io = new Server(server,{
    cors: "*"
})

io.on('connection', (socket) => {
    try {
        liveEvents(socket)
        
    } catch (error) {
        socket.disconnect()
    }
});
