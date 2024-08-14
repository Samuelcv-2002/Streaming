import ffmpegPath from "ffmpeg-static";
import ffmpeg from "fluent-ffmpeg";
import NodeMediaServer from "node-media-server";
import * as fs from 'node:fs';
import { live_services } from "./socket/live/dependencies.js";

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    mediaroot: "./media", 
    allow_origin: '*'
  },

  trans: {
    ffmpeg: 'C:/ffmpeg/ffmpeg.exe',
    tasks: [
      {
        app: 'live',
        hls: true,
        hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
        hlsKeep: true, // to prevent hls file delete after end the stream
        dash: true,
        dashFlags: '[f=dash:window_size=3:extra_window_size=5]',
        dashKeep: true // to prevent dash file delete after end the stream
      }
    ]
  }
};


export let nms = new NodeMediaServer(config)


nms.on('postPublish', async (id, streamPath) => {

  const pathFile = `./screenshots/${streamPath.replace("/live/", "")}.png`

  const command = ffmpeg()
  .input(`./media${streamPath}/index.m3u8`)
  .outputOptions('-ss', '00:00:01') // Salta a 1 segundo
  .outputOptions('-vframes', '1') // Toma 1 cuadro
  .output(pathFile)
  .on('end', () => {

      const data = fs.readFileSync(pathFile);
      const image = data.toString('base64');
      fs.unlinkSync(pathFile);
      live_services.newStream({
          id,
          path: streamPath,
          image: `data:image/png;base64,${image}`
      })
  })
  .on('error', (err) => {
    console.error('Error capturing screenshot:', err);
  })
  .run()
  
});


nms.on('donePublish', async (id) => {
  live_services.disconnectStream({id})
});