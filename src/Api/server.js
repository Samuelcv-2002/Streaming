import express from 'express';
import { createServer } from 'node:http';

const app = express()
const serverNode = createServer(app)

app.use("/assets", express.static("./dist/assets")) // dir estatico

app.get("/", (req, res) => {
    res.sendFile(`${process.cwd()}/dist/index.html`)
})

export default serverNode