let winningText = document.getElementById("winningText")
let balloons = document.getElementById("balloons")
let attemptCount = document.getElementById("attempts")
let game = document.getElementById("game")
let restart = document.getElementById("restart")

let cardClosed = "/cards/cardClosed.jpg"

let attempts = 0
let points = 0

let images = []
let opened = []

for (let i = 0; i < 20; i++) {
    let balloon = document.createElement("img")
    balloon.classList.add("balloon")
    balloon.src = "balloon.svg"
    balloons.appendChild(balloon)

    balloon.style.filter = "hue-rotate(" + Math.floor(Math.random() * 360) + "deg)"
    balloon.setAttribute("data-scale", Math.floor((Math.random() / 2 + 0.5) * 100) / 100)
    balloon.style.left = Math.random() * window.innerWidth - 100 + "px"
}

function winAnim() {
    for (let balloon of balloons.children) {
        let animTime = Math.random() * 3 + 3
        balloon.style.transition = animTime + "s"
        console.log("win animation");

        balloon.style.transform = "translateY(-" + (window.innerHeight + 550) + "px) " + "scale(" + balloon.dataset.scale + ")"
    }
    setTimeout(() => {
        for (let balloon of balloons.children) {
            balloon.style.transition = "0s"
            balloon.style.transform = "translateY(100%)"
            balloon.style.left = Math.random() * window.innerWidth - 100 + "px"
        }
    }, 6000);
}


restart.onclick = function () {
    opened = []
    points = 0
    attempts = 0
    attemptCount.innerHTML = "Attempts: " + attempts
    winningText.style.animation = "none"
    winningText.style.transform = "scale(0)"
    for (let card of game.children) {
        card.src = cardClosed
        card.style.pointerEvents = "auto"
        card.style.transition = "0.1s"
        card.style.transform = "scale(1)"
        card.style.filter = "saturate(1)"
    }
    for (let i = images.length - 1; i > 0; i--) {
        let randomNumber = Math.floor(Math.random() * (i + 1))
        let temporary = images[i]
        // randomNumber = i
        images[i] = images[randomNumber]
        images[randomNumber] = temporary
    }

}


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
        img.style.pointerEvents = "none"

        img.style.transform = "scaleX(0)"
        console.log(img.style);
        setTimeout(() => {
            img.src = "/cards/" + images[i]
            img.style.transform = "scaleX(1)"
            opened.push(img)

            if (opened.length > 1) {
                let cards = game.getElementsByTagName("img")
                attempts += 1
                attemptCount.innerHTML = "Attempts: " + attempts

                if (opened[0].src == opened[1].src) {
                    console.log("correct");
                    setTimeout(() => {
                        opened[0].style.transition = "1s"
                        opened[1].style.transition = "1s"
                        opened[0].style.transform = "scale(0.9)"
                        opened[1].style.transform = "scale(0.9)"
                        opened[0].style.filter = "saturate(0.6)"
                        opened[1].style.filter = "saturate(0.6)"
                        opened[0].style.pointerEvents = "none"
                        opened[1].style.pointerEvents = "none"
                        opened[0].classList.add("correct")
                        opened[1].classList.add("correct")
                        opened = []
                    }, 100);
                    points += 1


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
                        opened[0].style.transform = "scaleX(0)"
                        opened[1].style.transform = "scaleX(0)"
                        setTimeout(() => {
                            opened[0].src = cardClosed
                            opened[1].src = cardClosed
                            opened[0].style = "pointer-events: auto"
                            opened[1].style = "pointer-events: auto"
                            opened = []
                            for (let card of cards) {
                                if (card.src.includes(cardClosed)) {
                                    card.style.pointerEvents = "auto"
                                }
                            }
                        }, 100);
                    }, 1000);
                }
            }
        }, 100);


    }
}