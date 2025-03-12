let flyingEffectCanvas;
let showFlyingEffect = false;
let skylines = [];
let dt = 1;

function setupFlyingEffect() {
    if (!flyingEffectCanvas) {
        flyingEffectCanvas = createGraphics(windowWidth, windowHeight);
    }
    showFlyingEffect = true;
    initializeSkyline();
}

function drawFlyingEffect() {
    if (!showFlyingEffect) return;

    flyingEffectCanvas.clear();
    updateSkyline();
    renderSkyline();
    
    image(flyingEffectCanvas, 0, 0);
}

// Buildings Class
class Building {
    constructor(config) {
        this.reset(config);
    }

    reset(config) {
        this.layer = config.layer;
        this.x = config.x;
        this.y = config.y;
        this.width = config.width;
        this.height = config.height;
        this.color = config.color;
        this.slantedTop = floor(random(0, 10)) === 0;
        this.slantedTopHeight = this.width / random(2, 4);
        this.slantedTopDirection = round(random(0, 1)) === 0;
        this.spireTop = floor(random(0, 15)) === 0;
        this.spireTopWidth = random(this.width * 0.01, this.width * 0.07);
        this.spireTopHeight = random(10, 20);
        this.antennaTop = !this.spireTop && floor(random(0, 10)) === 0;
        this.antennaTopWidth = this.layer / 2;
        this.antennaTopHeight = random(5, 20);
    }

    render() {
        flyingEffectCanvas.fill(this.color);
        flyingEffectCanvas.noStroke();
        flyingEffectCanvas.rect(this.x, this.y, this.width, this.height);
    }
}

// Skyline Class
class Skyline {
    constructor(config) {
        this.x = 0;
        this.buildings = [];
        this.layer = config.layer;
        this.width = config.width;
        this.height = config.height;
        this.speed = config.speed;
        this.color = config.color;
        this.populate();
    }

    populate() {
        let totalWidth = 0;
        while (totalWidth <= width + this.width.max * 2) {
            let newWidth = round(random(this.width.min, this.width.max));
            let newHeight = round(random(this.height.min, this.height.max));
            this.buildings.push(
                new Building({
                    layer: this.layer,
                    x: totalWidth,
                    y: height - newHeight,
                    width: newWidth,
                    height: newHeight,
                    color: this.color,
                })
            );
            totalWidth += newWidth;
        }
    }

    update() {
        this.x -= (mouseX * this.speed) * dt;

        let firstBuilding = this.buildings[0];
        if (firstBuilding.width + firstBuilding.x + this.x < 0) {
            let newWidth = round(random(this.width.min, this.width.max));
            let newHeight = round(random(this.height.min, this.height.max));
            let lastBuilding = this.buildings[this.buildings.length - 1];
            firstBuilding.reset({
                layer: this.layer,
                x: lastBuilding.x + lastBuilding.width,
                y: height - newHeight,
                width: newWidth,
                height: newHeight,
                color: this.color,
            });
            this.buildings.push(this.buildings.shift());
        }
    }

    render() {
        flyingEffectCanvas.push();
        flyingEffectCanvas.translate(this.x, (height - mouseY) / 20 * this.layer);
        for (let building of this.buildings) {
            building.render();
        }
        flyingEffectCanvas.pop();
    }
}

// Initialize Skyline
function initializeSkyline() {
    skylines = [];
    for (let i = 0; i < 5; i++) {
        skylines.push(
            new Skyline({
                layer: i + 1,
                width: { min: (i + 1) * 30, max: (i + 1) * 40 },
                height: { min: 150 - i * 35, max: 300 - i * 35 },
                speed: (i + 1) * 0.003,
                color: `hsl(200, ${10 + (i + 1) * 2}%, ${75 - i * 13}%)`,
            })
        );
    }
}

// Update Skyline
function updateSkyline() {
    dt = constrain(frameRate() / 60, 0.1, 5);
    for (let skyline of skylines) {
        skyline.update();
    }
}

// Render Skyline
function renderSkyline() {
    for (let skyline of skylines) {
        skyline.render();
    }
}
