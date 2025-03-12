let foodPoints = [];
let foodActive = false;
let foodCanvas;
let tickSpeed = 5;
let base = 180;
let numPoints = 20;
let maxTicks = 3000;
let ticks = 0;

class FoodPoint {
    constructor(x = random(windowWidth), y = random(windowHeight), a = random(TWO_PI)) {
        this.x = x;
        this.y = y;
        this.a = a;
        this.dx = cos(a) * 1.2;
        this.dy = sin(a) * 1.2;
        this.hue = (random(100) + base) % 360;
        this.color = color(this.hue, 100, 100, 0.1);
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x < 0 || this.x >= windowWidth) this.dx *= -1;
        if (this.y < 0 || this.y >= windowHeight) this.dy *= -1;

        foodCanvas.stroke(this.color);
        foodCanvas.line(this.x, this.y, this.neighbor.x, this.neighbor.y);
    }
}

function setupFoodEffect() {
    console.log("✅ Food Effect Activated!");
    foodActive = true;

    if (!foodCanvas) {
        foodCanvas = createGraphics(windowWidth, windowHeight);
        foodCanvas.colorMode(HSB);
        foodCanvas.blendMode(ADD);
    }

    foodPoints = [];
    base = random(360);
    ticks = 0;

    for (let i = 0; i < numPoints; i++) foodPoints.push(new FoodPoint());

    for (let i = 0; i < foodPoints.length; i++) {
        let j;
        do {
            j = floor(random(foodPoints.length));
        } while (j === i);
        foodPoints[i].neighbor = foodPoints[j];
    }

    if (!activeEffects.includes(drawFoodEffect)) {
        activeEffects.push(drawFoodEffect);
    }
}

function drawFoodEffect() {
    if (!foodActive || ticks > maxTicks) return;

    foodCanvas.clear();
    foodCanvas.strokeWeight(1.5);

    for (let n = 0; n < tickSpeed; n++) {
        for (let i = 0; i < foodPoints.length; i++) {
            foodPoints[i].update();
        }
        ticks++;
    }

    image(foodCanvas, 0, 0);
}

function stopFoodEffect() {
    console.log("❌ Food Effect Deactivated!");
    foodActive = false;
    if (foodCanvas) foodCanvas.clear();
}
