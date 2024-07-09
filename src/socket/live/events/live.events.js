import { LiveServices } from "../services/live.services.js"

const live_services = new LiveServices()

export default (socket, io) => {

    socket.on("emitir", (data) => live_services.emitir(socket, io, data))

}