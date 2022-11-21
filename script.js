let winningText = document.getElementById("winningText")
let attemptCount = document.getElementById("attempts")
let game = document.getElementById("game")

let cardClosed = "./cards/cardClosed.jpg"

let attempts = 0
let points = 0

let images = []
let opened = []

for (let i = 0; i < 12; i++) {
    images.push("card" + i + ".jpg")
    images.push("card" + i + ".jpg")
}

for (let i = images.length - 1; i > 0; i--) {
    let randomNumber = Math.floor(Math.random() * (i + 1))
    // randomNumber = i
    let temporary = images[i]
    images[i] = images[randomNumber]
    images[randomNumber] = temporary
}

for (let i = 0; i < 24; i++) {
    let img = document.createElement("img")
    img.src = cardClosed
    game.appendChild(img)

    img.ondragstart = function () {
        return false;
    }

    img.onclick = function () {
        console.log(images[i]);
        img.src = "./cards/" + images[i]
        opened.push(img)
        if (opened.length > 1) {
            attempts += 1
            attemptCount.innerHTML = "Attempts: " + attempts
            if (opened[0].src == opened[1].src) {
                console.log("correct");
                points += 1
                opened = []
                if (points > 11) {
                    winningText.style.transform = "scale(1)"
                    setTimeout(function(){
                        winningText.style.animation = "glow 3s ease-in-out infinite alternate"
                    }, 1000)
                }
            }
            else {
                console.log("incorrect");
                setTimeout(() => {
                    opened[0].src = cardClosed
                    opened[1].src = cardClosed
                    opened = []
                }, 1000);
            }
        }
    }
}