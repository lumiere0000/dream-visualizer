let monsters = [];
let monsterActive = false;
let monsterCanvas;
let yOffset = [];
let flashIntensity = 0; // Controls flash brightness
let flashDecay = 5; // Speed at which the flash fades
let flashTriggered = false; // If true, the background is in flash mode

function setupMonstersEffect() {
    console.log("✅ Monsters Effect Activated!");
    monsterActive = true;

    if (!monsterCanvas) {
        monsterCanvas = createGraphics(windowWidth, windowHeight);
    }

    monsters = [];
    yOffset = [];

    let numMonsters = floor(random(8, 15)); // Adjust range for a fuller effect
    let minSpacing = 200; // Minimum spacing between monsters to avoid overlap

    for (let i = 0; i < numMonsters; i++) {
        let safeX, safeY, size, validPosition;
        let attempts = 0;

        do {
            validPosition = true;
            safeX = random(50, width - 50);
            safeY = random(100, height - 100);
            size = random(120, 250); // Varying sizes

            for (let other of monsters) {
                let distance = dist(safeX, safeY, other.x, other.y);
                if (distance < minSpacing) {
                    validPosition = false;
                    break;
                }
            }
            attempts++;
        } while (!validPosition && attempts < 50);

        monsters.push(new Monster(safeX, safeY, size));
        yOffset.push(random(0, 100)); // Random floating effect start point
    }
}

class Monster {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.yOriginal = y;
        this.vibrationOffset = 0;
    }

    update(index) {
        this.y = this.yOriginal + sin(frameCount * 0.02 + yOffset[index]) * 10;

        // **Unsteady Vibration Effect**
        if (random() > 0.85) {
            this.vibrationOffset = random(-5, 5); // Shake randomly
        } else {
            this.vibrationOffset = 0;
        }
    }

    display() {
        // **Flashes Effect (Random Disappearance)**
        if (random() > 0.92) {
            return; // Skip drawing this frame to create flickering
        }

        monsterCanvas.push();
        monsterCanvas.translate(this.x + this.vibrationOffset, this.y + this.vibrationOffset); // Apply vibration

        // Monster Body with Gradient
        let gradient = monsterCanvas.drawingContext.createLinearGradient(0, -this.size * 0.5, 0, this.size);
        gradient.addColorStop(0, "black");
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        monsterCanvas.drawingContext.fillStyle = gradient;
        monsterCanvas.noStroke();
        monsterCanvas.ellipse(0, this.size * 0.3, this.size * 0.6, this.size * 1.5);

        // Face
        monsterCanvas.fill(200);
        monsterCanvas.ellipse(0, -this.size * 0.3, this.size * 0.4, this.size * 0.3);

        // Eyes (Segmented Rings - Red)
        monsterCanvas.stroke(255, 0, 0);
        monsterCanvas.strokeWeight(2);
        monsterCanvas.noFill();
        let eyeX = this.size * 0.1;
        let eyeY = -this.size * 0.3;
        for (let i = 0; i < 3; i++) {
            monsterCanvas.ellipse(-eyeX, eyeY, this.size * 0.05 * (i + 1));
            monsterCanvas.ellipse(eyeX, eyeY, this.size * 0.05 * (i + 1));
        }

        // Nose (Simple Dots)
        monsterCanvas.fill(0);
        monsterCanvas.noStroke();
        monsterCanvas.ellipse(0, -this.size * 0.25, this.size * 0.02, this.size * 0.03);
        monsterCanvas.ellipse(-this.size * 0.03, -this.size * 0.25, this.size * 0.02, this.size * 0.03);
        monsterCanvas.ellipse(this.size * 0.03, -this.size * 0.25, this.size * 0.02, this.size * 0.03);

        // Mouth with Sharp Teeth
        monsterCanvas.fill(0);
        monsterCanvas.ellipse(0, -this.size * 0.15, this.size * 0.2, this.size * 0.08);
        for (let i = -2; i <= 2; i++) {
            monsterCanvas.fill(255);
            monsterCanvas.triangle(
                i * this.size * 0.04, -this.size * 0.13,
                (i - 0.5) * this.size * 0.02, -this.size * 0.08,
                (i + 0.5) * this.size * 0.02, -this.size * 0.08
            );
        }

        monsterCanvas.pop();
    }
}

function drawMonstersEffect() {
    if (!monsterActive) return;

    // **Flashing Effect (Background Manipulation)**
    if (random() > 0.97 && flashIntensity === 0) { 
        flashTriggered = true;
        flashIntensity = 255; // Brightest flash
    }

    if (flashTriggered) {
        background(flashIntensity); // Overwrite background color with flash
        flashIntensity -= flashDecay; // Gradually fade flash
        if (flashIntensity <= 0) {
            flashIntensity = 0;
            flashTriggered = false;
        }
    } else {
        // **Normal Background** (Dark Gray Noise for Spooky Effect)
        background(random(10, 20));
    }

    monsterCanvas.clear();

    for (let i = 0; i < monsters.length; i++) {
        monsters[i].update(i);
        monsters[i].display();
    }

    image(monsterCanvas, 0, 0);
}

function stopMonstersEffect() {
    console.log("❌ Monsters Effect Deactivated!");
    monsterActive = false;
    if (monsterCanvas) monsterCanvas.clear();
}
