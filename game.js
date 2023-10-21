var gamePattern = []
var userClickedPattern = []
var buttonColors = ["red", "blue", "green", "yellow"]
var level = 1
var currentIdx = 0

function pushColor() {
    var randomNumber = Math.floor(Math.random() * 4)
    gamePattern.push(buttonColors[randomNumber])
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function playSequence(sequence) {
    for(i = 0; i < sequence.length; i++) {
        var color = sequence[i]
        var sound = new Audio("./sounds/" + color + ".mp3")
        $("." + color).fadeOut().fadeIn()
        sound.play()
        await sleep(1000)
    }
    console.log()
}

function gameOver() {
    $("body").addClass("game-over")
    gamePattern = []
    userClickedPattern = []
    currentIdx = 0
    level = 1
}

function checkAnswer() {
    
    if (gamePattern[currentIdx] !== userClickedPattern[currentIdx]) {
        gameOver()
        var audio = new Audio("./sounds/faustao-errou.mp3")
        $("h1")[0].innerHTML = "MAS JÁ ERROOU!!!? KKKK BEM FEITO <br /> <br /> Esperava mais de você heim mulé"
        audio.play()
        return 0
    }
    else {
        currentIdx++
        return 1
    }
}

$(".btn").click(async function() {
    var userChosenColor = this.id
    userClickedPattern.push(userChosenColor)
    if (checkAnswer() == 1) {
        $("#" + userChosenColor).fadeOut().fadeIn()
        var sound = new Audio("./sounds/" + userChosenColor + ".mp3")
        sound.play()
        if(currentIdx == gamePattern.length) {
            $("h1")[0].innerText = "Parabéns, você acertou!"
            await sleep(3000)
            startGame()
        }
    }
})

$(document).keypress(function() {
    if (level == 1) {
        startGame()
    }})

function startGame() {
    $("body").removeClass("game-over")
    $("h1")[0].innerText = "Level " + level
    pushColor()
    playSequence(gamePattern)
    currentIdx = 0
    userClickedPattern = []
    level++
}