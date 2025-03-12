let showAnimalEffect = false;
let animalCanvas;
let birds = [];

function setupAnimalEffect() {
    if (showAnimalEffect) return; // Prevent duplicate activation

    showAnimalEffect = true;
    createAnimalCanvas();
    if (!activeEffects.includes(drawAnimalEffect)) {
        activeEffects.push(drawAnimalEffect);
    }
}

// Function to create birds and canvas
function createAnimalCanvas() {
    animalCanvas = createGraphics(windowWidth, windowHeight);

    class Bird {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height * 0.6; // Birds stay in the sky
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.size = Math.random() * 15 + 8;
            this.wingOffset = Math.random() * 10;
            this.angle = Math.random() * Math.PI * 2;
        }

        move() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.angle += 0.05;
            this.y += Math.sin(this.angle) * 1.5;

            if (this.x > width) this.x = 0;
            if (this.x < 0) this.x = width;
            if (this.y > height) this.y = 0;
            if (this.y < 0) this.y = height;
        }

        draw() {
            let wingFlap = Math.sin(frameCount * 0.2 + this.wingOffset) * 5; // Wing animation

            animalCanvas.fill(255); // White birds
            animalCanvas.noStroke();
            animalCanvas.beginShape();
            animalCanvas.vertex(this.x, this.y); // Body
            animalCanvas.vertex(this.x - this.size, this.y - this.size / 2 + wingFlap); // Left wing
            animalCanvas.vertex(this.x, this.y - this.size / 3); // Center point
            animalCanvas.vertex(this.x + this.size, this.y - this.size / 2 + wingFlap); // Right wing
            animalCanvas.endShape(CLOSE);
        }
    }

    // Create 50 birds
    for (let i = 0; i < 50; i++) {
        birds.push(new Bird());
    }
}

// Function to draw the birds continuously
function drawAnimalEffect() {
    if (!showAnimalEffect || !animalCanvas) return;

    animalCanvas.clear(); // Keeps background transparent

    birds.forEach((bird) => {
        bird.move();
        bird.draw();
    });

    image(animalCanvas, 0, 0);
}
