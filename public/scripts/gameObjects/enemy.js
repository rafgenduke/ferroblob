import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../global.js"

class Enemy extends BaseGameObject {
    name = "Enemy";
    speed = 60;
    direction = 1;
    isHorizontal = true;

    update = function () {
        if (this.isHorizontal) {
            this.x += this.speed * this.direction * global.deltaTime;
        } else {
            this.y += this.speed * this.direction * global.deltaTime;
        }
    }

    reactToCollision = function (collidingObject) {
        if (collidingObject.name === "Barrier" || collidingObject.name === "DeadlyBarrier" || collidingObject.name === "Enemy"
            || collidingObject.name === "Finish" || collidingObject.name === "Magnet") {
            this.x = this.previousX;
            this.y = this.previousY;
            this.direction *= -1;
        }
    }

    constructor(x, y, width, height, animationSprites, isHorizontal = true, direction) {
        super(x, y, width, height, animationSprites);
        this.isHorizontal = isHorizontal;
        if (direction === 1 || direction === -1) {
            this.direction = direction;
        }
    }
}

export { Enemy };