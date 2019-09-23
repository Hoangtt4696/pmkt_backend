process.env.NODE_ENV = "test"

import chai from "chai"
import chaiHttp from "chai-http"
import io from "socket.io-client"

import app from "../../src/app"

const expect = chai.expect


const socketUrl = "http://localhost:8080"
const options = {
    transports: ["websocket"],
    "force new connection": true
}

/*
|--------------------------------------------------------------------------
| Test socker server still alive
|--------------------------------------------------------------------------
*/
describe("Test socker server still alive", () => {
    it("it should say hello on connect", (done) => {
        const client1 = io.connect(socketUrl, options)

        // Set up event listener.  This is the actual test we"re running
        client1.on("get_user", function(msg){
            expect(msg).to.equal("ahihi user ne cu")
            client1.disconnect()
            done()
        })
    })
})
