let desertCanvas;
let cols, rows;
let scl = 30;
let w = 1000;
let h = 800;
let flying = 0;
let terrain = [];
let desertActive = false; // Ensure it starts OFF

function setupDesertEffect() {
    if (!desertCanvas) {
        desertCanvas = createGraphics(windowWidth, windowHeight, WEBGL);
        cols = w / scl;
        rows = h / scl;

        for (let i = 0; i < cols; i++) {
            terrain[i] = [];
        }
    }
    desertActive = true;
}

function drawDesertEffect() {
    if (!desertActive) return; // Only draw if active

    desertCanvas.clear(); // Prevents background issues
    desertCanvas.push();

    flying -= 0.05;

    let yoff = flying;
    for (let y = 0; y < rows; y++) {
        let xoff = 0;
        for (let x = 0; x < cols; x++) {
            terrain[x][y] = map(noise(xoff, yoff), 0, 1, -40, 40);
            xoff += 0.2;
        }
        yoff += 0.2;
    }

    desertCanvas.noFill();
    desertCanvas.stroke('#FFD700');

    desertCanvas.rotateX(PI / 3);
    desertCanvas.translate(-w / 2, -h / 2);

    for (let y = 0; y < rows - 1; y++) {
        desertCanvas.beginShape(TRIANGLE_STRIP);
        for (let x = 0; x < cols; x++) {
            desertCanvas.vertex(x * scl, y * scl, terrain[x][y]);
            desertCanvas.vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
        }
        desertCanvas.endShape();
    }

    desertCanvas.pop();
    image(desertCanvas, 0, 0);
}

function windowResized() {
    if (desertCanvas) {
        desertCanvas.resizeCanvas(windowWidth, windowHeight);
    }
}

function toggleDesert() {
    desertActive = !desertActive;
    if (!desertActive && desertCanvas) {
        desertCanvas.clear();
    }
}
