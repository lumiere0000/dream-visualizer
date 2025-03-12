let showFamilyEffect = false;
let familyCanvas;
let petals = [];

function setupFamilyEffect() {
    if (showFamilyEffect) return; // Prevent duplicate activation

    showFamilyEffect = true;
    createFamilyCanvas();
    if (!activeEffects.includes(drawFamilyEffect)) {
        activeEffects.push(drawFamilyEffect);
    }
}

// Function to create the glowing darker pink & soft pink heart-shaped petals
function createFamilyCanvas() {
    familyCanvas = createGraphics(windowWidth, windowHeight);
    familyCanvas.drawingContext.shadowBlur = 10; // Glow effect
    familyCanvas.drawingContext.shadowColor = "rgba(255, 105, 180, 0.8)"; // Soft pink glow

    class Petal {
        constructor(type) {
            this.type = type; // "darkPink" or "softHeart"
            this.x = random(width);
            this.y = random(height);
            this.size = random(5, 15);
            this.speedY = random(0.3, 0.7);
            this.wobble = random(0.02, 0.05);
            this.angle = random(-PI / 8, PI / 8); // Restrict rotation to a small tilt
            this.rotationSpeed = random(-0.005, 0.005); // Slow side-to-side movement
            this.speedX = random(-0.25, 0.25); // Slight drift for hearts
            this.glow = random(120, 200);
        }

        move() {
            this.y -= this.speedY;
            this.x += sin(this.angle) * 0.5 + this.speedX;
            
            if (this.type === "softHeart") {
                this.angle += this.rotationSpeed; // Side-to-side tilt ONLY
                if (this.angle > PI / 8) this.rotationSpeed = -abs(this.rotationSpeed);
                if (this.angle < -PI / 8) this.rotationSpeed = abs(this.rotationSpeed);
            }

            if (this.y < 0) this.y = height; // Loop petals to top
            if (this.x > width) this.x = 0;
            if (this.x < 0) this.x = width;
        }

        draw() {
            familyCanvas.noStroke();

            if (this.type === "darkPink") {
                // 🌸 Darker Pink Glowing Petals
                familyCanvas.fill(219, 112, 147, this.glow);
                familyCanvas.beginShape();
                familyCanvas.vertex(this.x, this.y);
                familyCanvas.bezierVertex(
                    this.x - this.size, this.y - this.size, 
                    this.x - this.size * 1.5, this.y + this.size / 2, 
                    this.x, this.y + this.size
                );
                familyCanvas.bezierVertex(
                    this.x + this.size * 1.5, this.y + this.size / 2, 
                    this.x + this.size, this.y - this.size, 
                    this.x, this.y
                );
                familyCanvas.endShape(CLOSE);
            } else {
                // 💖 Soft Pink Heart-Shaped Glowing Petals (No full rotation, just sway)
                familyCanvas.fill(255, 105, 180, 180);
                familyCanvas.push();
                familyCanvas.translate(this.x, this.y);
                familyCanvas.rotate(this.angle); // Swaying effect only
                drawHeart(familyCanvas, 0, 0, this.size);
                familyCanvas.pop();
            }
        }
    }

    // Create 60 darker pink glowing petals
    for (let i = 0; i < 60; i++) {
        petals.push(new Petal("darkPink"));
    }

    // Create 40 heart-shaped glowing pink petals
    for (let i = 0; i < 40; i++) {
        petals.push(new Petal("softHeart"));
    }
}

// Function to draw a small heart shape with smooth curves
function drawHeart(pg, x, y, size) {
    pg.beginShape();
    for (let t = 0; t < TWO_PI; t += 0.2) { 
        let px = size * 0.2 * (16 * pow(sin(t), 3)); 
        let py = -size * 0.2 * (13 * cos(t) - 5 * cos(2 * t) - 2 * cos(3 * t) - cos(4 * t));
        pg.vertex(x + px, y + py);
    }
    pg.endShape(CLOSE);
}

// Function to draw the petals continuously
function drawFamilyEffect() {
    if (!showFamilyEffect || !familyCanvas) return;

    familyCanvas.clear(); // Keeps background transparent

    petals.forEach((petal) => {
        petal.move();
        petal.draw();
    });

    image(familyCanvas, 0, 0);
}
