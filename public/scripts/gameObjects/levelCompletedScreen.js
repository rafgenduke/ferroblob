import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../global.js"

class LevelCompletedScreen extends BaseGameObject {
    name = "LevelCompletedScreen";

    draw = function () {
        global.ctx.font = "80px Arial";
        global.ctx.fillStyle = "lightgreen";
        let levelCompletedText = `Level Completed!`;
        let textMetrics = global.ctx.measureText(levelCompletedText);
        let textX = (global.canvas.width - textMetrics.width) / 2;
        let textY = global.canvas.height / 2;
        global.ctx.fillText(levelCompletedText, textX, textY);
        global.ctx.font = "30px Arial";
        global.ctx.fillStyle = "lightgreen";
        levelCompletedText = `Press SPACE to continue`;
        textMetrics = global.ctx.measureText(levelCompletedText);
        textX = (global.canvas.width - textMetrics.width) / 2;
        textY = (global.canvas.height / 2) + 50;
        global.ctx.fillText(levelCompletedText, textX, textY);
    }

    constructor() {
        super(0, 0, 0, 0, []);
    }
}

export { LevelCompletedScreen };