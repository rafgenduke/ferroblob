import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../global.js"

class Magnet extends BaseGameObject {
    name = "Magnet";
    index = 0;

    draw = function () {
        let nextSpriteIndex = this.getNextSpriteIndex();
        global.ctx.drawImage(this.animationData.animationSprites[nextSpriteIndex], this.x, this.y, this.width, this.height);
        this.drawKeyBindings();
    }

    update = function () {
        if (this.index === global.activeMagnetIndex) {
            this.setAnimationSprites(1, 1);
        } else {
            this.setAnimationSprites(0, 0);
        }
    }

    drawKeyBindings = function () {
        global.ctx.fillStyle = "white";
        global.ctx.font = "20px Arial";
        switch (this.index) {
            case 0:
                global.ctx.fillText("1", this.x + this.width / 2, this.y + this.height / 2);
                break;
            case 1:
                global.ctx.fillText("2", this.x + this.width / 2, this.y + this.height / 2);
                break;
            case 2:
                global.ctx.fillText("3", this.x + this.width / 2, this.y + this.height / 2);
                break;
            case 3:
                global.ctx.fillText("4", this.x + this.width / 2, this.y + this.height / 2);
                break;
            case 4:
                global.ctx.fillText("5", this.x + this.width / 2, this.y + this.height / 2);
                break;
            default:
                break;
        }
    }

    constructor(x, y, width, height, animationSprites) {
        super(x, y, width, height, animationSprites);
        this.index = global.magnets.length;
    }
}

export { Magnet };