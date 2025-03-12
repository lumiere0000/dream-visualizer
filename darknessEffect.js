let darknessActive = false;
let darknessCanvas;
let eyes = [];

function setupDarknessEffect() {
    console.log("✅ Darkness Effect Activated!");
    darknessActive = true;

    if (!darknessCanvas) {
        darknessCanvas = createGraphics(windowWidth, windowHeight);
        darknessCanvas.clear(); // Transparent background
    }

    eyes = [];

    let numEyes = 30; // Number of eyes
    let minDist = 80; // Minimum distance between eyes

    for (let i = 0; i < numEyes; i++) {
        let validPosition = false;
        let x, y, ebRadius;

        while (!validPosition) {
            x = random(50, width - 50);
            y = random(50, height - 50);
            ebRadius = random(25, 70); // Random eye sizes
            validPosition = true;

            for (let other of eyes) {
                let d = dist(x, y, other.x, other.y);
                if (d < (ebRadius + other.ebRadius + minDist)) {
                    validPosition = false;
                    break;
                }
            }
        }
        eyes.push(new Eye(ebRadius, ebRadius * 0.3, x, y));
    }
}

class Eye {
    constructor(ebRadius, irRadius, x, y) {
        this.x = x;
        this.y = y;
        this.ebRadius = ebRadius;
        this.irRadius = irRadius;
        this.rr = ebRadius - irRadius - 3;
        this.irisX = x;
        this.irisY = y;
    }

    update(mx, my) {
        let angle = atan2(my - this.y, mx - this.x);
        let distToMouse = dist(this.x, this.y, mx, my);
        if (distToMouse < this.rr) {
            this.irisX = mx;
            this.irisY = my;
        } else {
            this.irisX = this.x + cos(angle) * this.rr;
            this.irisY = this.y + sin(angle) * this.rr;
        }
    }

    display() {
        darknessCanvas.fill(0); // Black Eyeball
        darknessCanvas.stroke(255); // White Outline
        darknessCanvas.ellipse(this.x, this.y, this.ebRadius * 2); // Eyeball

        darknessCanvas.fill(255); // White Iris
        darknessCanvas.noStroke();
        darknessCanvas.ellipse(this.irisX, this.irisY, this.irRadius * 2); // Iris
    }
}

function drawDarknessEffect() {
    if (!darknessActive) return;

    darknessCanvas.clear(); // Transparent background

    for (let eye of eyes) {
        eye.update(mouseX, mouseY);
        eye.display();
    }

    image(darknessCanvas, 0, 0); // Draw on top of background without changing it
}

function stopDarknessEffect() {
    console.log("❌ Darkness Effect Deactivated!");
    darknessActive = false;
    if (darknessCanvas) darknessCanvas.clear();
}
