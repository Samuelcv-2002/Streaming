import * as fs from 'fs';
import * as childProcess from 'child_process';

export class LiveServices {
    

    constructor () {
        this.Dispositivos = []
        this.contador = 0;
        this.imagesPath = './images/';
        this.videoPath = './output.mp4';
        this.fps = 30;
    }

    createVideo = () => {
        return
        // Crea el comando FFmpeg para convertir las imágenes en un video
        const ffmpegCommand = `ffmpeg -framerate ${this.fps} -analyzeduration 10M -probesize 10M -i ${this.imagesPath}%d.png -c:v libx264 -crf 18 ${this.videoPath}`;

        // Ejecuta el comando FFmpeg
        childProcess.exec(ffmpegCommand, (error, stdout, stderr) => {
            if (error) {
                console.error(error);
            } else {
                console.log(`Video creado con éxito: ${this.videoPath}`);
            }
        });
    }

    
    emitir = (socket, io, data) => {
        const buffer = Buffer.from(data.image, 'base64');
        const decodedString = buffer.toString('base64');

      /*      // Crea un nuevo archivo para cada imagen
            const file = fs.createWriteStream(`${this.imagesPath}${this.contador}.png`);
            this.contador++;

            // Escribe el buffer en el archivo

  file.write(buffer);

  // Cierra el archivo
  file.end(() => {
    // Verifica si hay suficientes imágenes para crear un video
    if (this.contador >= 10) this.createVideo();
  });*/

        io.emit(`newImage_${socket.id}`, {
            id: socket.id,
            frame: `data:image/png;base64,${decodedString}`
        })
  
    }

    newDevice = (socket, io, data) => {
        if(socket.handshake.headers['user-agent'] == "python-requests/2.32.3"){
            const buffer = Buffer.from(data.image, 'base64');
            const decodedString = buffer.toString('base64');

            this.Dispositivos.push({
                id: socket.id,
                socket: socket.handshake.address,
                img: `data:image/png;base64,${decodedString}`
            })
        }
        io.emit("newDevice", {Dispositivos: this.Dispositivos})
    }

    disconnect = (socket, io) => {
        if(socket.handshake.headers['user-agent'] == "python-requests/2.32.3"){
            this.Dispositivos = this.Dispositivos.filter(element => element.socket != socket.handshake.address)
        }
        io.emit("newDevice", {Dispositivos: this.Dispositivos})
    }
}