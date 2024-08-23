
import { io } from "../../../io"
import { streamInterface } from "../interfaces/stream.interface"

export class LiveServices {
    
    constructor (
        private Streams: any = []
    ) {}

    public ViewerConneted = () => {
        io.emit("Streams", {Streams: this.Streams})
    }

    public newStream = (stream: streamInterface) => {
        this.Streams.push(stream)
        io.emit("Streams", {Streams: this.Streams})
    }

   public disconnectStream = (id: string) => {
        this.Streams = this.Streams.filter((e: streamInterface) => e.id != id)
        io.emit("Streams", {Streams:  this.Streams})
    }
}