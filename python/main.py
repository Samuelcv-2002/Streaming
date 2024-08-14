import asyncio
import cv2
import socketio
from aiortc import RTCPeerConnection, VideoStreamTrack
from aiortc.contrib.media import MediaPlayer

sio = socketio.AsyncClient()

class VideoStreamTrack(VideoStreamTrack):
    """
    A video stream track that captures video from the camera.
    """
    def __init__(self):
        super().__init__()  # Construct the base class
        self.cap = cv2.VideoCapture(0)  # Capture from the default camera

    async def recv(self):
        # Capture a frame
        ret, frame = self.cap.read()
        if not ret:
            raise RuntimeError("No se pudo leer el frame")

        # Convert the frame to the correct format
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        return frame

    def stop(self):
        self.cap.release()  # Release the camera when done

async def run():
    # Create the WebRTC connection
    pc = RTCPeerConnection()

    # Add the video track
    video_track = VideoStreamTrack()
    pc.addTrack(video_track)

    # Signal handling
    @sio.event
    async def connect():
        print("Connected to the server.")

    @sio.event
    async def disconnect():
        print("Disconnected from the server.")

    @sio.event
    async def signal(data):
        # Handle signaling here
        print("Received signal:", data)

    await sio.connect('http://192.168.1.25:3000')

    # Wait for the connection to be established
    await sio.wait()  # This will block until the client disconnects

    # Here you should handle the creation of offers and answers
    # for the WebRTC signaling process

    try:
        await sio.emit('signal', {'sdp': pc.localDescription})  # Emit after being connected
    except Exception as e:
        print(f"Error emitting signal: {e}")

    # Keep the connection alive
    try:
        while True:
            await asyncio.sleep(1)
    except KeyboardInterrupt:
        pass
    finally:
        video_track.stop()  # Cleanup
        await pc.close()  # Close the connection

if __name__ == "__main__":
    asyncio.run(run())