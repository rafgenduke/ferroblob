let global = {};

global.canvas = document.querySelector("#canvas");
global.ctx = canvas.getContext("2d");
global.previousTotalTime = 0;
global.deltaTime = 0;
global.allGameObjects = [];
global.blob = null;
global.magnets = [];
global.activeMagnetIndex = -1;
global.nextLevel = 1;
global.currentLevel = global.nextLevel;
global.isLevelCompleted = false;
global.isLevelFailed = false;

global.getCanvasBounds = function () {
    let bounds = {
        left: 0,
        right: this.canvas.width,
        top: 0,
        bottom: this.canvas.height
    };
    return bounds;
};

global.checkCollisionWithAnyObject = function (givenObject) {
    for (let i = 0; i < this.allGameObjects.length; i++) {
        let currentOtherObject = this.allGameObjects[i];
        if (currentOtherObject == givenObject || currentOtherObject.active == false) {
            continue;
        }

        let isColliding = this.detectBoxCollision(givenObject, currentOtherObject);
        if (isColliding) {
            givenObject.reactToCollision(currentOtherObject);
            currentOtherObject.reactToCollision(givenObject);
        }
    }
}

global.detectBoxCollision = function (gameObject1, gameObject2) {
    let box1 = gameObject1.getBoxBounds();
    let box2 = gameObject2.getBoxBounds();

    if (box1.right >= box2.left &&
        box1.left <= box2.right &&
        box1.bottom >= box2.top &&
        box1.top <= box2.bottom) {
        return true;
    }
    else {
        return false;
    }

}

export { global }