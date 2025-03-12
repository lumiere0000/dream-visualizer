function setupDrivingEffect() {
    console.log("🚗 Driving effect started!");

    // Remove existing driving canvas if present
    let existingCanvas = document.getElementById("drivingCanvas");
    if (existingCanvas) {
        existingCanvas.remove();
    }

    // Create the driving effect canvas
    var canvas = document.createElement("canvas");
    canvas.id = "drivingCanvas";
    document.body.appendChild(canvas);

    var w = canvas.width = window.innerWidth,
        h = canvas.height = window.innerHeight,
        ctx = canvas.getContext('2d');

    var opts = {
        len: 50, // **🚀 Increased line length**
        count: 60, // **🚀 More lines for a denser effect**
        baseTime: 10,
        addedTime: 15,
        dieChance: 0.05,
        spawnChance: 1,
        lineThickness: 5, // **🚀 Thicker lines**
        color: 'hsl(hue, 100%, light%)',
        baseLight: 50,
        addedLight: 10,
        shadowToTimePropMult: 6,
        baseLightInputMultiplier: 0.01,
        addedLightInputMultiplier: 0.02,
        cx: w / 2,
        cy: h / 2,
        repaintAlpha: 0.05,
        hueChange: 0.1
    };

    var tick = 0,
        lines = [],
        dieX = w / 2 / opts.len,
        dieY = h / 2 / opts.len,
        baseRad = Math.PI * 2 / 4; // **🚀 Adjusted for more direction changes**

    function loop() {
        window.requestAnimationFrame(loop);
        ++tick;

        // Clear screen (Keep transparent)
        ctx.clearRect(0, 0, w, h);

        if (lines.length < opts.count && Math.random() < opts.spawnChance)
            lines.push(new Line());

        lines.forEach(line => line.step());
    }

    function Line() {
        this.reset();
    }

    Line.prototype.reset = function () {
        this.x = 0;
        this.y = 0;
        this.addedX = 0;
        this.addedY = 0;
        this.rad = 0;
        this.lightInputMultiplier = opts.baseLightInputMultiplier + opts.addedLightInputMultiplier * Math.random();
        this.color = opts.color.replace('hue', tick * opts.hueChange);
        this.cumulativeTime = 0;
        this.beginPhase();
    };

    Line.prototype.beginPhase = function () {
        this.x += this.addedX;
        this.y += this.addedY;
        this.time = 0;
        this.targetTime = (opts.baseTime + opts.addedTime * Math.random()) | 0;
        this.rad += baseRad * (Math.random() < 0.5 ? 1 : -1);
        this.addedX = Math.cos(this.rad);
        this.addedY = Math.sin(this.rad);

        if (Math.random() < opts.dieChance || this.x > dieX || this.x < -dieX || this.y > dieY || this.y < -dieY)
            this.reset();
    };

    Line.prototype.step = function () {
        ++this.time;
        ++this.cumulativeTime;

        if (this.time >= this.targetTime)
            this.beginPhase();

        let prop = this.time / this.targetTime,
            wave = Math.sin(prop * Math.PI / 2),
            x = this.addedX * wave,
            y = this.addedY * wave;

        ctx.shadowBlur = prop * opts.shadowToTimePropMult;
        ctx.strokeStyle = ctx.shadowColor = this.color.replace(
            'light',
            opts.baseLight + opts.addedLight * Math.sin(this.cumulativeTime * this.lightInputMultiplier)
        );

        ctx.lineWidth = opts.lineThickness; // **🚀 Bigger Lines**
        ctx.beginPath();
        ctx.moveTo(opts.cx + this.x * opts.len, opts.cy + this.y * opts.len);
        ctx.lineTo(opts.cx + (this.x + x) * opts.len, opts.cy + (this.y + y) * opts.len);
        ctx.stroke();
    };

    loop();

    window.addEventListener('resize', function () {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        ctx.clearRect(0, 0, w, h);
        opts.cx = w / 2;
        opts.cy = h / 2;
        dieX = w / 2 / opts.len;
        dieY = h / 2 / opts.len;
    });

    // **Ensure canvas is fully transparent and positioned correctly**
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.zIndex = "10";
    canvas.style.pointerEvents = "none";
    canvas.style.background = "transparent"; // **🚀 Fully Transparent**
}
