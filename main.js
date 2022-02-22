let startButton = document.getElementById('start-button')
let inflateButton = document.getElementById('inflate-button')

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

// #region Game Logic and Data

function startGame(){

    startButton.setAttribute("disabled", "true")
    inflateButton.removeAttribute("disabled")
  startClock()  
setTimeout(stopGame , gameLength)
}

function startClock(){
    timeRemaining = gameLength
    drawClock()
    clockId = setInterval(drawClock, 1000)
}

function stopClock(){
    clearInterval(clockId)
}

function drawClock(){
let countdownElem = document.getElementById("countdown")
countdownElem.innerText = (timeRemaining / 1000)
timeRemaining -= 1000
}

function inflate(){
   clickCount++ 
   height +=inflationRate
   width +=inflationRate
   
   if(height >= maxSize){
       console.log("pop the balloon")
       currentPopCount++
       height= 0 
       width =0 
    }
    draw()
    }

function draw(){
    let balloonElement = document.getElementById("balloon")
    let clickCountElem = document.getElementById("click-count")
    let popCountElem = document.getElementById("pop-count")
    let highPopCountElem = document.getElementById("highest-pop-count")
    
    balloonElement.style.height = height +"px"
    balloonElement.style.width = width + "px"
    
    clickCountElem.innerText = clickCount.toString()
    popCountElem.innerText = currentPopCount.toString()
    //why is .toString not needed here and why does adding it make an error?    
    highPopCountElem.innerText = highestPopCount.toString() 
}

function stopGame(){
    console.log("GAME OVER")

    inflateButton.setAttribute("disabled", "true")
    startButton.removeAttribute("disabled")

    clickCount = 0 
    height = 130
    width = 110

    if(currentPopCount > highestPopCount) {
        highestPopCount = currentPopCount
    }



    stopClock()
    draw()
}

// #endregion 

let players = []
loadPlayers()

function setPlayer(event){
    event.preventDefault()
    let form = event.target


    let playerName = (form.playerName.value)

   let currentPlayer = players.find(player => player.name == playerName)

    if(!currentPlayer) {
        currentPlayer= {name: playerName, topScore: 0}
        players.push(currentPlayer)
        savePlayers()
    }

    console.log(currentPlayer)

    form.reset()
}

function savePlayers(){
window.localStorage.setItem("players", JSON.stringify(players))
} 

function loadPlayers(){
    let playerData = JSON.parse(window.localStorage.getItem("players"))

    if(playerData){
        players = playerData
    }
}