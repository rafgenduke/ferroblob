import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../global.js"

class GameOverScreen extends BaseGameObject {
    name = "GameOverScreen";

    draw = function () {
        global.ctx.font = "80px Arial";
        global.ctx.fillStyle = "yellow";
        let gameOverText = `Game Over!`;
        let textMetrics = global.ctx.measureText(gameOverText);
        let textX = (global.canvas.width - textMetrics.width) / 2;
        let textY = global.canvas.height / 2;
        global.ctx.fillText(gameOverText, textX, textY);
        global.ctx.font = "30px Arial";
        global.ctx.fillStyle = "yellow";
        gameOverText = `Press SPACE to restart`;
        textMetrics = global.ctx.measureText(gameOverText);
        textX = (global.canvas.width - textMetrics.width) / 2;
        textY = (global.canvas.height / 2) + 50;
        global.ctx.fillText(gameOverText, textX, textY);
    }

    constructor() {
        super(0, 0, 0, 0, []);
    }
}

export { GameOverScreen };