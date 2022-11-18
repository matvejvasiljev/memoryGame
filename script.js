let game = document.getElementById("game")
let cardClosed = "./cards/cardClosed.jpg"

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
            if (opened[0].src == opened[1].src) {
                console.log("correct");
                opened = []
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