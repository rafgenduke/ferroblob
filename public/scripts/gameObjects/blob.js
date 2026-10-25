import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../global.js"
import { LevelCompletedScreen } from "./levelCompletedScreen.js";
import { GameOverScreen } from "./gameOverScreen.js";

class Blob extends BaseGameObject {
    name = "Blob";
    isColliding = false;

    update = function () {
        this.x += this.xVelocity * global.deltaTime;
        this.y += this.yVelocity * global.deltaTime;
        this.reactToMagneticForce();
    }

    applyKnockback = function (target, sourceX) {
        const dx = target.x + target.width / 2 - sourceX;

    }

    reactToCollision = function (collidingObject) {
        if (collidingObject.name === "Magnet" || collidingObject.name === "Barrier") {
            this.x = this.previousX;
            this.y = this.previousY;
            this.xVelocity = 0;
            this.yVelocity = 0;
            this.isColliding = true;
        } else if (collidingObject.name === "Finish") {
            this.active = false;
            if (global.nextLevel === 0) {
                document.querySelector("#finishMenu").style.display = "flex";
            } else {
                global.isLevelCompleted = true;
                new LevelCompletedScreen();
            }
        } else if (collidingObject.name === "DeadlyBarrier" || collidingObject.name === "Enemy") {
            new GameOverScreen();
            this.active = false;
            global.isLevelFailed = true;
        }
    }

    /**
     * Checks which magnet attarcts the blob and sets its velocity accordingly
     */
    reactToMagneticForce = function () {
        let attractingMagnet = null;

        if (global.activeMagnetIndex >= 0 && global.activeMagnetIndex < global.magnets.length) {
            attractingMagnet = global.magnets[global.activeMagnetIndex];
        }

        // No attracting magnet found -> reset velocity
        if (attractingMagnet == null) {
            this.xVelocity = 0;
            this.yVelocity = 0;
            return;
        }

        // Set velocity towards the attracting magnet
        let distanceX = this.getXDistanceToMagnet(attractingMagnet);
        let distanceY = this.getYDistanceToMagnet(attractingMagnet);

        if (!this.isColliding) {
            this.xVelocity = distanceX * -2;
            this.yVelocity = distanceY * -2;
        }

        if (this.xVelocity === 0 && this.yVelocity === 0) {
            if (this.animationData.firstSpriteIndex === 0 && this.animationData.lastSpriteIndex === 8) {
                return;
            }
            this.setAnimationSprites(0, 8);
        } else if (Math.abs(this.xVelocity) > Math.abs(this.yVelocity)) {
            if (this.animationData.firstSpriteIndex === 9 && this.animationData.lastSpriteIndex === 11) {
                return;
            }
            this.setAnimationSprites(9, 11);
        } else {
            if (this.animationData.firstSpriteIndex === 12 && this.animationData.lastSpriteIndex === 14) {
                return;
            }
            this.setAnimationSprites(12, 14);
        }
    }

    /**
     * calcuates the distance from the blob to a given magnet
     * @param {Magnet} magnet The Magnet you want to know the distance to
     * @returns the distance between the blob and the magnet
     */
    getDistanceToMagnet = function (magnet) {
        let distanceX = this.getXDistanceToMagnet(magnet);
        let distanceY = this.getYDistanceToMagnet(magnet);

        let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        return distance;
    }

    /**
     * calcuates the X distance from the blob to a given magnet
     * @param {Magnet} magnet The Magnet you want to know the distance to
     * @returns the distance between the blob and the magnet
     */
    getXDistanceToMagnet = function (magnet) {
        let blobCenterX = this.x + this.width / 2;
        let magnetCenterX = magnet.x + magnet.width / 2;

        let distanceX = blobCenterX - magnetCenterX;
        return distanceX;
    }

    /**
     * calcuates the Y distance from the blob to a given magnet
     * @param {Magnet} magnet The Magnet you want to know the distance to
     * @returns the distance between the blob and the magnet
     */
    getYDistanceToMagnet = function (magnet) {
        let blobCenterY = this.y + this.height / 2;
        let magnetCenterY = magnet.y + magnet.height / 2;

        let distanceY = blobCenterY - magnetCenterY;
        return distanceY;
    }
}

export { Blob };