const URL = "wss://localhost:5001/ws"

const webSocket = new WebSocket(URL)
const submitButton = document.getElementById("submitButton")
const status = document.getElementById("status")
const messagesTable = document.getElementById("messagesTable")

status.innerHTML = "Connecting..."

webSocket.onopen = function(e) {
    status.innerHTML = "Connected"
    messagesTable.append(document.createElement("tr").innerHTML = document.createElement("td").innerHTML = "Connected")
}

webSocket.onclose = function(e) {
    status.innerHTML = "Closed"
}

webSocket.onmessage = function(e) {
    messagesTable.append(document.createElement("tr").innerHTML = document.createElement("td").innerHTML = e.data)
}

submitButton.addEventListener("click", function(e) {
    e.preventDefault()
    webSocket.send(document.getElementById("message").value)
})

// webSocket.close();