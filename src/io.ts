import { Server } from 'socket.io';
import liveEvents from './socket/live/events/live.events';
import serverNode from "./Api/server";

export const server = serverNode

export const io = new Server(server)

io.on('connection', (socket) => {
    try {
        //liveEvents(socket)
        liveEvents()
    } catch (error) {
        socket.disconnect()
    }
});
