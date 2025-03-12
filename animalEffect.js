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

// Function to create the birds and canvas
function createAnimalCanvas() {
    animalCanvas = createGraphics(windowWidth, windowHeight);
    
    class Bird {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.size = Math.random() * 12 + 8;
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
            animalCanvas.fill(255); // White birds
            animalCanvas.noStroke();
            animalCanvas.ellipse(this.x, this.y, this.size, this.size / 1.5);
        }
    }

    // Create 40 birds
    for (let i = 0; i < 40; i++) {
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
