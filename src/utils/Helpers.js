class Helpers {
    /*
    |--------------------------------------------------------------------------
    | Initialize class
    |--------------------------------------------------------------------------
    */
    instance(request, response) {
        this.request = request
        this.response = response
    }

    /*
    |--------------------------------------------------------------------------
    | Get client's IP address
    |--------------------------------------------------------------------------
    */
    getRemoteIpAddress() {
        try {
            return this.request.connection.remoteAddress
        } catch {
            return null
        }
    }
    /*
    |--------------------------------------------------------------------------
    | Get node server IP address
    |--------------------------------------------------------------------------
    */
    getIPAddress() {
        let myIP = "0.0.0.0"
        const interfaces = require("os").networkInterfaces()
        for (let devName in interfaces) {
            const iface = interfaces[devName]

            iface.forEach( item => {
                if (item.family === "IPv4" && item.address !== "127.0.0.1" && !item.internal) myIP = item.address
            })
        }
        return myIP
    }

    /*
    |--------------------------------------------------------------------------
    | Generate number to string
    | Ex: getNumberPad(10, 5) => return "0010"
    |--------------------------------------------------------------------------
    */
    getNumberPad(number, length = 3) {
        return number.toLocaleString(undefined, {useGrouping: false, minimumIntegerDigits: length})
    }
}

export default new Helpers