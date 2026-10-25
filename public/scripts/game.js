import { Blob } from "./gameObjects/blob.js";
import { global } from "./global.js";
import { Magnet } from "./gameObjects/magnet.js";
import { Barrier } from "./gameObjects/barrier.js";
import { Finish } from "./gameObjects/finish.js";
import { DeadlyBarrier } from "./gameObjects/deadlyBarrier.js";
import { Enemy } from "./gameObjects/enemy.js";
import { Background } from "./gameObjects/background.js";

function gameLoop(totalTime) {
    global.deltaTime = totalTime - global.previousTotalTime;
    global.previousTotalTime = totalTime;
    global.deltaTime /= 1000;

    global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height);

    for (let i = 0; i < global.allGameObjects.length; i++) {
        let currentGameobject = global.allGameObjects[i];
        if (currentGameobject.active == false) {
            continue;
        }
        currentGameobject.storePreviousPosition();
        currentGameobject.update();
        global.checkCollisionWithAnyObject(currentGameobject);
        currentGameobject.draw();
    }

    requestAnimationFrame(gameLoop);
}

const initializeGame = async function () {
    //reset global variables
    global.allGameObjects = [];
    global.magnets = [];
    global.blob = null;
    global.activeMagnetIndex = -1;

    const levelData = await loadLevel(global.nextLevel);

    const background = new Background(0, 0, global.canvas.width, global.canvas.height, [levelData.background.image]);
    background.animationData.timePerSprite = 0.2;
    background.useImagesAsSpritesheet(levelData.background.sprites, 1);
    background.setAnimationSprites(0, levelData.background.sprites - 1);

    for (let barrier of levelData.barriers) {
        new Barrier(barrier.x, barrier.y, barrier.width, barrier.height, []);
    }
    for (let deadlyBarrier of levelData.deadlyBarriers) {
        new DeadlyBarrier(deadlyBarrier.x, deadlyBarrier.y, deadlyBarrier.width, deadlyBarrier.height, []);
    }
    for (let magnet of levelData.magnets) {
        global.magnets.push(new Magnet(magnet.x, magnet.y, magnet.width, magnet.height, [`./images/magnet_${magnet.side}.png`]));
        global.magnets[global.magnets.length - 1].useImagesAsSpritesheet(2, 1);
    }
    new Finish(levelData.finish.x, levelData.finish.y, levelData.finish.width, levelData.finish.height, []);
    for (let enemy of levelData.enemies) {
        const enemyObject = new Enemy(enemy.x, enemy.y, enemy.width, enemy.height, [`./images/enemy.png`], enemy.isHorizontal, enemy.direction);
        enemyObject.animationData.timePerSprite = 0.2;
        enemyObject.useImagesAsSpritesheet(5, 1);
        enemyObject.setAnimationSprites(0, 4);
    }
    global.blob = new Blob(levelData.blob.x, levelData.blob.y, levelData.blob.width, levelData.blob.height, ["./images/blob_spritesheet.png"]);
    global.blob.animationData.timePerSprite = 0.12;
    global.blob.useImagesAsSpritesheet(15, 1);
    global.blob.setAnimationSprites(0, 8);

    global.currentLevel = global.nextLevel;
    global.nextLevel = levelData.nextLevel;
}

const loadLevel = async function (levelNumber) {
    const response = await fetch(`levels/level${levelNumber}.json`)
    const levelData = await response.json();

    return levelData;
}

const keyEvent = function (event) {
    switch (event.key) {
        case "1":
            global.activeMagnetIndex = 0;
            global.blob.isColliding = false;
            break;
        case "2":
            if (global.magnets.length < 2) {
                break;
            }
            global.activeMagnetIndex = 1;
            global.blob.isColliding = false;
            break;
        case "3":
            if (global.magnets.length < 3) {
                break;
            }
            global.activeMagnetIndex = 2;
            global.blob.isColliding = false;
            break;
        case "4":
            if (global.magnets.length < 4) {
                break;
            }
            global.activeMagnetIndex = 3;
            global.blob.isColliding = false;
            break;
        case "5":
            if (global.magnets.length < 5) {
                break;
            }
            global.activeMagnetIndex = 4;
            global.blob.isColliding = false;
            break;
        case " ":
            if (global.isLevelCompleted) {
                global.isLevelCompleted = false;
                initializeGame();
            }
            if (global.isLevelFailed) {
                global.isLevelFailed = false;
                global.nextLevel = global.currentLevel;
                initializeGame();
            }
            break;
        default:
            break;
    }
}

initializeGame();

requestAnimationFrame(gameLoop);

document.addEventListener("keydown", keyEvent);
document.querySelector("#startButton").addEventListener("click", () => {
    document.querySelector("#startMenu").style.display = "none";
    global.canvas.style.display = "block";
});
document.querySelector("#tutorialButton").addEventListener("click", () => {
    document.querySelector("#startMenu").style.display = "none";
    document.querySelector("#tutorialMenu").style.display = "flex";
});
document.querySelector("#backButton").addEventListener("click", () => {
    document.querySelector("#tutorialMenu").style.display = "none";
    document.querySelector("#startMenu").style.display = "flex";
});
document.querySelector("#backToMenuButton").addEventListener("click", () => {
    document.querySelector("#finishMenu").style.display = "none";
    document.querySelector("#startMenu").style.display = "flex";
    global.nextLevel = 1;
    initializeGame();
});