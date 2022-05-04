const yourShip = document.querySelector('.player-shooter');
const playerArea = document.querySelector('#main-play-area');
const dragonsImg = ['imgs/monster-1.png', 'imgs/monster-2.png', 'imgs/monster-3.png'];
const instructionsText = document.querySelector('.game-instructions');
const startButton = document.querySelector('.start-button');
let dragonInterval;
// funcao movimenta e tiro
function flyShip(event) {
    if(event.key === 'ArrowUp') {
        event.preventDefault();
        moveUp();
    } else if(event.key === 'ArrowDown') {
        event.preventDefault();
        moveDown();
    } else if(event.key === " ") {
        event.preventDefault();
        fireLaser();
    }
}

//funcao de subir
function moveUp() {
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
    if(topPosition === "0px") {
        return;
    } else {
        let position = parseInt(topPosition);
        position -= 50;
        yourShip.style.top = '${position}px';
    }
}

//funcao de descer
function moveDown() {
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
    if(topPosition === "510px") {
        return;
    } else {
        let position = parseInt(topPosition);
        position += 50;
        yourShip.style.top = '${position}px';
    }
}

//funcao de tiro
function fireLaser() {
    let laser = createLaserElement();
    playerArea.appendChild(laser);
    moveLaser(laser);
}

function createLaserElement() {
    let xPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('left'));
    let yPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('top'));
    let newLaser = document.createElement('imgs');
    newLaser.src = 'imgs/shoot.png';
    newLaser.classList.add('laser');
    newLaser.style.left = '${xPosition}px';
    newLaser.style.top = '${yPosition = 10}px';
    return newLaser;
}

function moveLaser(laser) {
    let laserInterval = setInterval(() => {
        let xPosition = parseInt(laser.style.left);
        let dragons = document.querySelectorAll('.dragon');
        dragons.forEach((dragon) => {
            if(checkLaserCollision(laser, dragon)) {
                dragon.src = 'imgs/explosion.png';
                dragon.classList.remove('dragon');
                dragon.classList.add('dead-dragon');
            }
        })

        if (xPosition === 340) {
            laser.remove();
        } else {
            laser.style.left = '${xPosition + 8}px'
        }
    }, 10);
}

// funcao para crear o inimigo aleatorio
function createDragons() {
    let newDragons = document.createElement('imgs');
    let dragonSprite = dragonsImg[Math.floor(Math.random()*dragonsImg.length)];
    newDragons.src = dragonSprite;
    newDragons.classList.add('dragon');
    newDragons.classList.add('dragon-transition');
    newDragons.style.left = '370px';
    newDragons.style.top = '${Math.floor(Math.random()*330)+30}px';
    playerArea.appendChild(newDragons);
    moveDragons(newDragons);
}

function moveDragons(dragon) {
    let moveDragonInterval = setInterval (() => {
        let xPosition = parseInt(window.getComputedStyle(dragon).getPropertyValue('left'));
        if(xPosition <= 50) {
            if(Array.from(dragon.classList).includes('dead-dragon')) {
                dragon.remove();
            } else {
                gameOver();
            } 
            } else {
                dragon.style.left = '${xPosition - 4}px';
            }
    }, 30);
}

// funcao para colisao
function checkLaserCollision(laser, dragon) {
    let laserTop = parseInt(laser.style.top);
    let laserLeft = parseInt(laser.style.left);
    let laserBottom = laserTop - 20;
    let dragonTop = parseInt(dragon.style.top);
    let dragonLeft = parseInt(dragon.style.left);
    let dragonBottom = dragonTop - 30;
    if(laserLeft != 340 && laserLeft + 40 >= dragonLeft) {
        if(laserTop <= dragonTop && laserTop >= dragonBottom) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

startButton.addEventListener('click', (event) => {
    playGame();
})
// inicio do jogo
function playGame() {
    startButton.style.display = 'none';
    instructionsText.style.display = 'none';
    window.addEventListener('keydown', flyShip);
    dragonInterval = setInterval(() => {
        createDragons();
    }, 2000);
}

//funcao de gameOver
function gameOver() {
    window.removeEventListener('keydown', flyShip);
    clearInterval(dragonInterval);
    let.dragons = document.querySelectorAll('.dragon');
    dragons.forEach((dragon) => dragon.remove());
    let lasers = document.querySelectorAll('.laser');
    lasers.forEach((laser) => laser.remove());
    setTimeout(() => {
        alert('game over!');
        yourShip.style.top = "250px";
        startButton.style.display = "block";
        instructionsText.style.display = 'block';
    })
}