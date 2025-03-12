let roomEffectCanvas;
let showRoomEffect = false;
let particles = [];
const num = 1000;
const noiseScale = 0.01 / 2;
const particleSize = 8; // Increased by 15% from original

function setupRoomEffect() {
    if (!roomEffectCanvas) {
        roomEffectCanvas = createGraphics(windowWidth, windowHeight);
    }
    showRoomEffect = true;

    if (particles.length === 0) {
        for (let i = 0; i < num; i++) {
            particles.push(createVector(random(roomEffectCanvas.width), random(roomEffectCanvas.height)));
        }
    }
}

function drawRoomEffect() {
    if (!showRoomEffect) return;

    roomEffectCanvas.clear(); // Transparent background
    roomEffectCanvas.strokeWeight(particleSize); // Increased dot size

    for (let p of particles) {
        roomEffectCanvas.stroke(random(255), random(255), random(255));
        roomEffectCanvas.point(p.x, p.y);

        let n = noise(p.x * noiseScale, p.y * noiseScale, frameCount * noiseScale * noiseScale);
        let a = TAU * n;
        p.x += cos(a) * 2;
        p.y += sin(a) * 2;

        // Keep particles inside the full screen
        if (p.x < 0 || p.x > roomEffectCanvas.width || p.y < 0 || p.y > roomEffectCanvas.height) {
            p.x = random(roomEffectCanvas.width);
            p.y = random(roomEffectCanvas.height);
        }
    }

    image(roomEffectCanvas, 0, 0); // Now covers the entire screen
}
