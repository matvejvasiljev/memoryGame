let winningText = document.getElementById("winningText")
let balloons = document.getElementById("balloons")
let attemptCount = document.getElementById("attempts")
let game = document.getElementById("game")

let cardClosed = "./cards/cardClosed.jpg"

let attempts = 0
let points = 0

let images = []
let opened = []
function winAnim() {
    for (let i = 0; i < 20; i++) {
        let balloon = document.createElement("img")
        balloon.classList.add("balloon")
        balloon.src = "balloon.svg"
        balloons.appendChild(balloon)

        let animTime = Math.random() * 3 + 3

        balloon.style.left = Math.random() * window.innerWidth - 100 + "px"
        balloon.style.top = "0"
        balloon.style.transform = "translateY(-" + (window.innerHeight + 550) + "px) " + "scale(" + Math.floor((Math.random() / 2 + 0.5) * 100) / 100 + ")"
        // balloon.style.animation = "rise " + animTime + "s ease-in 1 normal"
        // setTimeout(() => {
        //     balloon.style.display = "none"
        // }, animTime * 1000 - 100);
        balloon.style.filter = "hue-rotate(" + Math.floor(Math.random() * 360) + "deg)"
    }
}



for (let i = 0; i < 12; i++) {
    images.push("card" + i + ".jpg")
    images.push("card" + i + ".jpg")
}

for (let i = images.length - 1; i > 0; i--) {
    let randomNumber = Math.floor(Math.random() * (i + 1))
    randomNumber = i
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

        img.style.pointerEvents = "none"

        if (opened.length > 1) {
            let cards = document.getElementsByTagName("img")
            attempts += 1
            attemptCount.innerHTML = "Attempts: " + attempts

            if (opened[0].src == opened[1].src) {
                console.log("correct");
                opened[0].style.transition = "1s"
                opened[1].style.transition = "1s"
                opened[0].style.transform = "scale(0.9)"
                opened[1].style.transform = "scale(0.9)"
                opened[0].style.filter = "saturate(0.6)"
                opened[1].style.filter = "saturate(0.6)"
                opened[0].style.pointerEvents = "none"
                opened[1].style.pointerEvents = "none"
                points += 1
                opened = []

                if (points > 11) {
                    winningText.style.transform = "scale(1)"
                    for (let card of cards) {
                        card.style.transform = "scale(1)"
                        card.style.filter = "saturate(1)"
                    }
                    setTimeout(function () {
                        winningText.style.animation = "glow 3s ease-in-out infinite alternate"
                    }, 1000)
                    winAnim()
                }
            }
            else {
                console.log("incorrect");
                for (let card of cards) {
                    card.style.pointerEvents = "none"
                }
                setTimeout(() => {
                    opened[0].src = cardClosed
                    opened[1].src = cardClosed
                    opened = []
                    for (let card of cards) {
                        card.style.pointerEvents = "auto"
                    }
                }, 1000);
            }
        }
    }
}