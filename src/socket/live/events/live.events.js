import { live_services } from "../dependencies.js"

export default (socket, io) => {

    socket.on("emitir", (data) => live_services.emitir(socket, io, data))
    socket.on("newDevice", (data) => live_services.newDevice(socket, io, data))
    socket.on('disconnect', () => live_services.disconnect(socket, io));

}