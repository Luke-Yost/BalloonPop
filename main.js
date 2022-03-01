// #region Game Data
let clickCount = 0
let height = 130
let width = 110
let inflationRate = 25
let maxSize = 330
let highestPopCount = 0
let currentPopCount = 0
let gameLength = 6000
let clockId = 0
let timeRemaining = 0
let currentPlayer = {}
let currentColor = "blue"
let possibleColors = ["green", "yellow", "red", "blue"]
// #endregion

// #region Game Logic 

function startGame() {

    document.getElementById("game-controls").classList.remove("hidden")
    document.getElementById("main-controls").classList.add("hidden")
    document.getElementById("scoreboard").classList.add("hidden")
    startClock()

    setTimeout(stopGame, gameLength)
}

function startClock() {
    timeRemaining = gameLength
    drawClock()
    clockId = setInterval(drawClock, 1000)
}

function stopClock() {
    clearInterval(clockId)
}

function drawClock() {
    let countdownElem = document.getElementById("countdown")
    countdownElem.innerText = (timeRemaining / 1000)
    timeRemaining -= 1000
}

function inflate() {
    clickCount++
    height += inflationRate
    width += inflationRate
    checkBalloonPop()
    draw()
}

function checkBalloonPop() {
    if (height >= maxSize) {
        console.log("pop the balloon")
        let balloonElement = document.getElementById("balloon")
        balloonElement.classList.remove(currentColor)
        getRandomColor()
        balloonElement.classList.add(currentColor)

        document.getElementById("pop-sound").play()

        currentPopCount++
        height = 40
        width = 0
    }
}

function getRandomColor() {
    let i = Math.floor(Math.random() * possibleColors.length);
    currentColor = possibleColors[i]

}

function draw() {
    let balloonElement = document.getElementById("balloon")
    let clickCountElem = document.getElementById("click-count")
    let popCountElem = document.getElementById("pop-count")
    let highPopCountElem = document.getElementById("highest-pop-count")
    let playerNameElem = document.getElementById("player-name")

    balloonElement.style.height = height + "px"
    balloonElement.style.width = width + "px"

    clickCountElem.innerText = clickCount.toString()
    popCountElem.innerText = currentPopCount.toString()
    highPopCountElem.innerText = currentPlayer.topScore

    playerNameElem.innerText = currentPlayer.name

}

function stopGame() {
    console.log("GAME OVER")

    document.getElementById("main-controls").classList.remove("hidden")
    document.getElementById("scoreboard").classList.remove("hidden")
    document.getElementById("game-controls").classList.add("hidden")

    clickCount = 0
    height = 130
    width = 110

    if (currentPopCount > currentPlayer.topScore) {
        currentPlayer.topScore = currentPopCount
        savePlayers()
    }

    currentPopCount = 0

    stopClock()
    draw()
    drawScoreboard()
}

// #endregion 

let players = []
loadPlayers()

function setPlayer(event) {
    event.preventDefault()

    let form = event.target

    let playerName = (form.playerName.value)

    currentPlayer = players.find(player => player.name == playerName)

    if (!currentPlayer) {
        currentPlayer = { name: playerName, topScore: 0 }
        players.push(currentPlayer)
        savePlayers()
    }

    form.reset()
    document.getElementById("game").classList.remove("hidden")
    form.classList.add("hidden")
    draw()
    drawScoreboard()
}

function changePlayer() {
    document.getElementById("player-form").classList.remove("hidden")
    document.getElementById("game").classList.add("hidden")
}

function savePlayers() {
    window.localStorage.setItem("players", JSON.stringify(players))
}

function loadPlayers() {
    let playerData = JSON.parse(window.localStorage.getItem("players"))

    if (playerData) {
        players = playerData
    }
}

function drawScoreboard() {
    let template = ""

    players.sort((p1, p2) => p2.topScore - p1.topScore)

    players.forEach(player => {
        template += `
        <div class="d-flex space-between mt-1">
        <span>
            <i class="fa fa-user-circle" aria-hidden="true"></i>
            ${[player.name]}
        </span>
        <span>Score: ${player.topScore} </span>
    </div>
        `
    })

    document.getElementById("players").innerHTML = template

}

drawScoreboard()