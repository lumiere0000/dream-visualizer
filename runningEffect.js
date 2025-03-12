let runningEffectCanvas;
let showRunningEffect = false;
let runningParticles = [];

function setupRunningEffect() {
    if (!runningEffectCanvas) {
        runningEffectCanvas = createGraphics(windowWidth, windowHeight);
    }
    showRunningEffect = true;
}

function drawRunningEffect() {
    if (!showRunningEffect) return;
    
    runningEffectCanvas.clear();
    runningEffectCanvas.noStroke();
    
    runningParticles.push({
        x: mouseX,
        y: mouseY,
        size: 50,
        color: color(255, 100, 80, 200) // Red-orange color similar to image
    });
    
    for (let i = runningParticles.length - 1; i >= 0; i--) {
        let p = runningParticles[i];
        runningEffectCanvas.fill(p.color);
        runningEffectCanvas.ellipse(p.x, p.y, p.size);
        
        // Remove excess particles
        if (runningParticles.length > 10) {
            runningParticles.splice(0, 1);
        }
    }
    
    image(runningEffectCanvas, 0, 0);
}
