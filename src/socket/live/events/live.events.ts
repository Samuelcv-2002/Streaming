import { live_services } from "../dependencies"

export default (/*socket : any*/) => {
     // SON EVENTOS QUE EMITE EL CLIENTE Y COMO VA A ACTUAR NODEJS, EN ESTE CASO ES EL FRONTEND (VUE)

    live_services.ViewerConneted()
    


   /* socket.on("emitir", (data) => live_services.emitir(socket, io, data))*/
    //socket.on("newDevice", (data) => live_services.newDevice(socket, io, data))

/*
    socket.on('disconnectStream', (data) => live_services.disconnectStream(data));
    */
}