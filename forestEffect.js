let forestCanvas;

function setupForestEffect() {
    if (!forestCanvas) {
        forestCanvas = createGraphics(windowWidth, windowHeight);
        forestCanvas.clear(); // Ensures transparency
    }
    generateForest();
}

function drawForestEffect() {
    if (forestCanvas) {
        image(forestCanvas, 0, 0);
    }
}

function generateForest() {
    let loss = 0.2; // Controls branch tapering
    let sleep = 5; // Faster growth timing
    let branchLoss = 0.85; // More thickness retained for branches
    let mainLoss = 0.9; // More thickness retained after branching
    let speed = 0.5; // Increased movement speed for dynamic growth

    let trunkColor = color(139, 69, 19); // Brown trunk
    let branchColor = color(34, 139, 34); // Green spikes/twigs

    function branch(x, y, angle, depth, thickness) {
        if (depth <= 0 || y < height * 0.05) return; // Stop when close to the top (5% from the top)

        let len = random(50, 100) * (depth / 10); // Extended branches to reach higher
        let newX = x + len * cos(angle);
        let newY = y + len * sin(angle);

        // Use brown for main branches, green for jagged spikes
        if (depth > 4) {
            forestCanvas.stroke(trunkColor);
        } else {
            forestCanvas.stroke(branchColor);
        }

        forestCanvas.strokeWeight(thickness);
        forestCanvas.line(x, y, newX, newY);

        // Create sharp, spiky twigs extending outwards
        let numSpikes = floor(random(2, 5)); // Number of spikes per branch
        for (let i = 0; i < numSpikes; i++) {
            let spikeAngle = angle + random(-PI / 3, PI / 3); // Randomize spike angle
            let spikeLength = random(len * 0.3, len * 0.6);
            let spikeX = newX + spikeLength * cos(spikeAngle);
            let spikeY = newY + spikeLength * sin(spikeAngle);

            forestCanvas.stroke(branchColor);
            forestCanvas.strokeWeight(thickness * 0.6);
            forestCanvas.line(newX, newY, spikeX, spikeY);
        }

        // Recursively generate more branches
        setTimeout(() => {
            branch(newX, newY, angle - random(PI / 6, PI / 4), depth - 1, thickness * 0.7);
            branch(newX, newY, angle + random(PI / 6, PI / 4), depth - 1, thickness * 0.7);
        }, sleep);
    }

    // Generate multiple trees with better spacing
    let numTrees = 4 + Math.floor(Math.random() * 3); // Between 4 and 6 trees
    for (let i = 0; i < numTrees; i++) {
        let treeX = random(windowWidth * 0.2, windowWidth * 0.8); // Spread across screen
        let treeHeight = random(14, 18); // Taller trees to reach near the top
        branch(treeX, windowHeight, -PI / 2, 12, 8); // Thicker initial trunks
    }
}
