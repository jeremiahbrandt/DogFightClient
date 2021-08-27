// game variables
const selfPlayer = {
    id: 1,
    isActive: false
}
const players = []
let connectionTime = 0

// html elements
const status = document.getElementById("status")
const timer = document.getElementById("timer")
const userIdText = document.getElementById("userId")
const joinButton = document.getElementById("joinButton")
const leaveButton = document.getElementById("leaveButton")
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

// event listeners
joinButton.addEventListener("click", sendJoin)
leaveButton.addEventListener("click", sendLeave)

// web socket events
const URL = "wss://localhost:5001/ws"
const webSocket = new WebSocket(URL)
status.innerHTML = "Connecting..."
joinButton.style.display = "block"
leaveButton.style.display = "none"

webSocket.onopen = function(e) {
    status.innerHTML = "Connected"
    setInterval(function() {
        connectionTime++
        timer.innerHTML = connectionTime / 10
    }, 100)
}

webSocket.onclose = function(e) {
    status.innerHTML = "Closed"
    connectionTime = 0
}

webSocket.onmessage = function(e) {
    const data = JSON.parse(e.data)

    if(true || data.type === "gameBoard") {
        self.isActive = players.some(function(player) {
            return player.id === self.id
        })

        console.log(selfPlayer)
        
        if(self.isActive === true) {
            userIdText.style.display = "none"
            joinButton.style.display = "none"
            leaveButton.style.display = "block"
            
        } else {
            userIdText.style.display = "block"
            joinButton.style.display = "block"
            leaveButton.style.display = "none"
        }
    }

    players.filter(() => false)
    console.log(JSON.parse(e.data))
    players.push(...(JSON.parse(e.data)).map())
}

function drawPlayers() {
    for (var i = 0; i < players.length; i++) {
        ctx.beginPath()
        ctx.arc(players[i].x, players[i].y, players[i].radius, 0, 2 * Math.PI)
        ctx.fillStyle = players[i].color
        ctx.fill()
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawPlayers()
}

function sendJoin(e) {
    e.preventDefault()
    webSocket.send(JSON.stringify({
        type: "join",
        userId: userIdText.value
    }))
}

function sendLeave(e) {
    e.preventDefault()
    webSocket.send(JSON.stringify({
        type: "leave"
    }))
}

function sendMove(x, y) {
    webSocket.send(JSON.stringify({
        type: "move",
        x: x,
        y: y
    }))
}

let interval = setInterval(draw, 10);

// webSocket.close();