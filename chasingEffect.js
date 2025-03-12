let chasingEffectCanvas;
let showChasingEffect = false;
let chasingElements = [];
const numElements = 15; // Number of chasing trails
const maxTrailLength = 50; // How long the trails persist
const speedFactor = 2.5; // Movement speed
const noiseIntensity = 0.02; // More fluid distortion

function setupChasingEffect() {
    if (!chasingEffectCanvas) {
        chasingEffectCanvas = createGraphics(windowWidth, windowHeight);
        chasingEffectCanvas.clear(); // Keep transparency
    }
    showChasingEffect = true;
    
    chasingElements = [];
    for (let i = 0; i < numElements; i++) {
        chasingElements.push({
            x: random(width),
            y: random(height),
            speedX: random(-speedFactor, speedFactor),
            speedY: random(-speedFactor, speedFactor),
            trail: [],
            color: color(random(100, 255), random(50, 200), random(200, 255), 100), // Soft glow effect
            noiseOffset: random(1000)
        });
    }
}

function drawChasingEffect() {
    if (!showChasingEffect) return;

    chasingEffectCanvas.noFill();
    chasingEffectCanvas.strokeWeight(2);

    for (let e of chasingElements) {
        // Apply Perlin noise for organic movement
        let nX = noise(e.noiseOffset) - 0.5;
        let nY = noise(e.noiseOffset + 1000) - 0.5;
        e.x += e.speedX + nX * width * noiseIntensity;
        e.y += e.speedY + nY * height * noiseIntensity;
        e.noiseOffset += 0.005; // Slowly evolve the movement

        // Keep elements within bounds
        if (e.x < 0 || e.x > width) e.speedX *= -1;
        if (e.y < 0 || e.y > height) e.speedY *= -1;

        // Store positions in the trail
        e.trail.push({ x: e.x, y: e.y });

        // Limit trail length
        if (e.trail.length > maxTrailLength) {
            e.trail.shift();
        }

        // Draw fading, flowing trails
        for (let i = 0; i < e.trail.length - 1; i++) {
            let alpha = map(i, 0, e.trail.length, 20, 100); // Fade effect
            chasingEffectCanvas.stroke(red(e.color), green(e.color), blue(e.color), alpha);
            chasingEffectCanvas.line(e.trail[i].x, e.trail[i].y, e.trail[i + 1].x, e.trail[i + 1].y);
        }
    }

    image(chasingEffectCanvas, 0, 0);
}
