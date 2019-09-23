class EventEmitter {
    
    constructor() {
        this.events = {}
    }

    dispatch(event, data) {
        if (!this.events[event]) return
        this.events[event].forEach(callback => callback(data))
    }

    subscribe(event, respsonse) {
        if (!this.events[event]) this.events[event] = []
        this.events[event].push(callback)
    }
}

export default new EventEmitter()