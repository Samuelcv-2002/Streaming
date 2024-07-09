export class LiveServices {
    emitir = (socket, io, data) => {
        const arrayBuffer = new Uint8Array(data.image).buffer;
        const decodedString = Buffer.from(arrayBuffer, 'base64').toString('utf-8');
        io.emit("newImage", decodedString)
    }

}