function setupHouseEffect() {
    console.log("🏠 House Effect Activated!");

    // Create the canvas
    let canvas = document.createElement("canvas");
    canvas.id = "houseCanvas";
    document.body.appendChild(canvas);
    
    let ctx = canvas.getContext("2d");
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    window.onresize = function() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        maxHeight = h * 0.9;
        minHeight = h * 0.5;
        dots = [];
        pushDots();
        ctx.globalCompositeOperation = "lighter";
    };

    // Generate effect when clicked
    document.body.onclick = function() {
        hue = Math.random() * 360;
        dots = [];
        pushDots();
    };

    let dots = [];
    let maxDots = 100;
    let maxWidth = 15;
    let minWidth = 2;
    let maxHeight = h * 0.9;
    let minHeight = h * 0.5;
    let maxSpeed = 35;
    let minSpeed = 6;
    let hue = 230;
    let hueRange = 50;
    let glow = 10; // Set to 0 for better performance

    ctx.globalCompositeOperation = "lighter";

    function pushDots() {
        for (let i = 0; i < maxDots; i++) {
            dots.push({
                x: Math.random() * w,
                y: Math.random() * h / 2,
                h: Math.random() * (maxHeight - minHeight) + minHeight,
                w: Math.random() * (maxWidth - minWidth) + minWidth,
                c: Math.random() * ((hue + hueRange) - (hue - hueRange)) + (hue - hueRange),
                m: Math.random() * (maxSpeed - minSpeed) + minSpeed
            });
        }
    }
    pushDots();

    function render() {
        ctx.clearRect(0, 0, w, h);
        for (let i = 0; i < dots.length; i++) {
            ctx.beginPath();
            let grd = ctx.createLinearGradient(dots[i].x, dots[i].y, dots[i].x + dots[i].w, dots[i].y + dots[i].h);
            grd.addColorStop(0, `hsla(${dots[i].c},50%,50%,0)`);
            grd.addColorStop(0.2, `hsla(${dots[i].c + 20},50%,50%,0.5)`);
            grd.addColorStop(0.5, `hsla(${dots[i].c + 50},70%,60%,0.8)`);
            grd.addColorStop(0.8, `hsla(${dots[i].c + 80},50%,50%,0.5)`);
            grd.addColorStop(1, `hsla(${dots[i].c + 100},50%,50%,0)`);

            ctx.shadowBlur = glow;
            ctx.shadowColor = `hsla(${dots[i].c},50%,50%,1)`;
            ctx.fillStyle = grd;
            ctx.fillRect(dots[i].x, dots[i].y, dots[i].w, dots[i].h);
            ctx.closePath();

            dots[i].x += dots[i].m / 100;
            if (dots[i].x > w + maxWidth) {
                dots[i].x = -maxWidth;
            }
        }
        requestAnimationFrame(render);
    }
    render();
}
