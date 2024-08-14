import { io } from "../../../io.js"

export class LiveServices {
    
    constructor () {
        this.Streams = []
    }

    ViewerConneted = () => {
        io.emit("Streams", {Streams: this.Streams})
    }

    newStream = (stream) => {
        this.Streams.push(stream)
        io.emit("Streams", {Streams: this.Streams})
    }

    disconnectStream = ({id}) => {
        this.Streams = this.Streams.filter(e => e.id != id)
        io.emit("Streams", {Streams:  this.Streams})
    }
}