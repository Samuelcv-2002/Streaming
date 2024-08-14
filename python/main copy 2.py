import socketio
import cv2
import base64
import numpy as np
import pyautogui
import pyaudio



# Set up audio capture

# Configuración de PyAudio
CHUNK = 1024
FORMAT = pyaudio.paInt16
CHANNELS = 1
RATE = 44100

p = pyaudio.PyAudio()

stream = p.open(format=FORMAT,
                channels=CHANNELS,
                rate=RATE,
                input=True,
                frames_per_buffer=CHUNK)


def openCam ():
    while True:
        img = pyautogui.screenshot(region=None)
        frame = np.array(img)
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        audio = stream.read(CHUNK)

        retval, buffer = cv2.imencode('.webp', frame)
        #jpg_as_text = base64.b64encode(buffer)
        cv2.imshow('stream', frame)

        
        sio.emit("emitir", {"image": buffer.tolist() })



        if (cv2.waitKey(1) == ord('s')):
            sio.disconnect()  
            stream.stop_stream()
            stream.close()
            p.terminate()    
            break
    
    cv2.destroyAllWindows()



# Crear una instancia del cliente Socket.IO
sio = socketio.Client()

# Definir un manejador para el evento de conexión exitosa
@sio.event
def connect():
    img = pyautogui.screenshot(region=None)
    frame = np.array(img)
    frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    retval, buffer = cv2.imencode('.webp', frame)
    #jpg_as_text = base64.b64encode(buffer)
    sio.emit("newDevice", {"image": buffer.tolist()})
    print('Conexión establecida')

try:
    sio.connect('http://192.168.1.25:3000')
    openCam()
    sio.wait()
except Exception as e:
    print(f'Ocurrió un error al conectar: {e}')
