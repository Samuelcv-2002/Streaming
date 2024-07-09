import socketio
import cv2
import base64
import numpy as np
import pyautogui

def openCam ():
    while True:
        img = pyautogui.screenshot(region=None)
        frame = np.array(img)
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        retval, buffer = cv2.imencode('.webp', frame)
        jpg_as_text = base64.b64encode(buffer)
        cv2.imshow('stream',frame)
        sio.emit("emitir", {"image": jpg_as_text})
        if (cv2.waitKey(1) == ord('s')):
            sio.disconnect()      
            break
    
    cv2.destroyAllWindows()



# Crear una instancia del cliente Socket.IO
sio = socketio.Client()

# Definir un manejador para el evento de conexión exitosa
@sio.event
def connect():
    print('Conexión establecida')
    openCam()

try:
    sio.connect('http://192.168.1.25:3000')
    sio.wait()
except Exception as e:
    print(f'Ocurrió un error al conectar: {e}')
