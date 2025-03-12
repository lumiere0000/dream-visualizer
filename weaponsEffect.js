let showWeaponsEffect = false;
let lightningCanvas, lightningCtx;
let lightning = [];
let lightTimeCurrent = 0;
let lightTimeTotal = 2500; // Slower interval between strikes
let flashOpacity = 0; // Controls screen flash

function setupWeaponsEffect() {
    if (showWeaponsEffect) return;
    
    showWeaponsEffect = true;
    createLightningCanvas();
    if (!activeEffects.includes(drawWeaponsEffect)) {
        activeEffects.push(drawWeaponsEffect);
    }
}

// Function to create the canvas for the lightning effect
function createLightningCanvas() {
    lightningCanvas = document.createElement("canvas");
    lightningCanvas.id = "lightningCanvas";
    lightningCanvas.width = window.innerWidth;
    lightningCanvas.height = window.innerHeight;
    lightningCanvas.style.position = "absolute";
    lightningCanvas.style.top = "0";
    lightningCanvas.style.left = "0";
    lightningCanvas.style.pointerEvents = "none";

    document.body.appendChild(lightningCanvas);
    lightningCtx = lightningCanvas.getContext("2d");

    window.addEventListener("resize", () => {
        lightningCanvas.width = window.innerWidth;
        lightningCanvas.height = window.innerHeight;
    });
}

// Function to generate a random value in range
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to create a screen-wide flash when lightning strikes
function triggerFlash() {
    flashOpacity = rand(0.2, 0.6); // Random brightness intensity
}

// Function to create BIG lightning bolts
function createLightning(x, y) {
    let pathLimit = rand(50, 120); // Bolts last longer & go further
    let isFullStrike = Math.random() > 0.5; // Some bolts go all the way down
    let boltColor = "rgba(255, 255, 255, 0.9)"; // White glow

    lightning.push({
        x: x,
        y: y,
        xRange: rand(5, 20), // Keeps lightning slightly jagged
        yRange: rand(10, 40), // Controls downward growth
        path: [{ x: x, y: y }],
        pathLimit: pathLimit,
        fullStrike: isFullStrike,
        fadeOut: false,
        color: boltColor, // Store color per bolt
    });

    triggerFlash(); // Flash effect when lightning appears
}

// Function to update lightning bolts
function updateLightning() {
    let i = lightning.length;
    while (i--) {
        let light = lightning[i];

        light.path.push({
            x: light.path[light.path.length - 1].x + (rand(0, light.xRange) - light.xRange / 2),
            y: light.path[light.path.length - 1].y + light.yRange, // Always moves downward
        });

        // Make some bolts stop before hitting the bottom
        if (!light.fullStrike && light.path.length > light.pathLimit / 2) {
            light.fadeOut = true;
        }

        if (light.path.length > light.pathLimit) {
            light.fadeOut = true;
        }

        if (light.fadeOut && Math.random() < 0.1) {
            lightning.splice(i, 1);
        }
    }
}

// Function to render the lightning bolts with glow
function renderLightning() {
    lightningCtx.clearRect(0, 0, lightningCanvas.width, lightningCanvas.height);

    let i = lightning.length;
    while (i--) {
        let light = lightning[i];

        // Glow effect
        lightningCtx.shadowBlur = 50; // Intensity of glow
        lightningCtx.shadowColor = light.color;

        // Draw the bolt
        lightningCtx.strokeStyle = light.color;
        lightningCtx.lineWidth = rand(2, 4);

        lightningCtx.beginPath();
        lightningCtx.moveTo(light.x, light.y);

        for (let pathPoint of light.path) {
            lightningCtx.lineTo(pathPoint.x, pathPoint.y);
        }

        lightningCtx.stroke();
    }

    // Draw the screen-wide flash effect
    if (flashOpacity > 0) {
        lightningCtx.fillStyle = `rgba(255, 255, 255, ${flashOpacity})`;
        lightningCtx.fillRect(0, 0, lightningCanvas.width, lightningCanvas.height);
        flashOpacity -= 0.02; // Gradual fade-out effect
    }
}

// Function to control the timing of lightning strikes
function lightningTimer() {
    lightTimeCurrent++;
    if (lightTimeCurrent >= lightTimeTotal) {
        let newX = rand(100, window.innerWidth - 100);
        let newY = 0; // Always starts from the top
        let createCount = rand(2, 4); // More bolts per strike

        while (createCount--) {
            createLightning(newX, newY);
        }

        lightTimeCurrent = 0;
        lightTimeTotal = rand(2000, 5000); // Randomized delay for realism
    }
}

// Function to continuously draw the lightning effect
function drawWeaponsEffect() {
    if (!showWeaponsEffect || !lightningCanvas) return;

    updateLightning();
    lightningTimer();
    renderLightning();

    requestAnimationFrame(drawWeaponsEffect);
}
