
import socketIO from "socket.io"

import AppConfig from "../configs/AppConfig"

class SocketIO {
    constructor() {
        this.io = null
    }

    init(server) {
        const io = socketIO(server)
        io.on("connection", socket => {
            socket.emit("get_user", "tui là user")
            if( process.env.NODE_ENV !== "test") console.log(`|>>>>>>>>>>>>>>>>>>>>>>> Web socker is listening on port: ${AppConfig.API_SERVER_PORT}`)
        })
    }

    emit(event, message) {
        // this.io.on("connection", socket => {
        //     socket.emit("get_user", "tui là user")
        // })
    }
}

export default new SocketIO()