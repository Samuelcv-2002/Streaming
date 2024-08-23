import express, { NextFunction, Request, Response } from 'express';
import { createServer } from 'node:http';
import AuthRouter from './Auth/routes/auth.routes';

const app = express()
const serverNode = createServer(app)

app.use((_req: Request, res: Response, next: NextFunction) => {
    res.append('Access-Control-Allow-Origin', '*'); // con el * se le dice "con cualquier origen puedo pedir los metodos de abajo"
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, PATCH');
    res.append('Access-Control-Allow-Headers', 'Content-Type, Authorization, url');
    next();
});

app.use("/assets", express.static("./dist/assets")) // dir estatico
app.use(express.json())

// routes

app.use("/auth", AuthRouter)

export default serverNode