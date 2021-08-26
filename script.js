const URL = "wss://localhost:5001/ws"

const webSocket = new WebSocket(URL)

webSocket.onopen = function(e) {
    console.log("Open")
}

webSocket.onmessage = function(e) {
    console.log("Msg")
}

// webSocket.close();