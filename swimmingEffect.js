function setupSwimmingEffect() {
    console.log("Swimming effect started!");

    // Create the WebGL canvas
    var canvas = document.createElement("canvas");
    canvas.id = "swimmingCanvas"; // Prevent multiple creations
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    var gl = canvas.getContext("webgl", { premultipliedAlpha: false });

    if (!gl) {
        console.error("WebGL not supported.");
        return;
    }

    // Set WebGL to render with transparency
    gl.clearColor(0, 0, 0, 0); // Fully transparent background
    gl.clear(gl.COLOR_BUFFER_BIT);

    var numMetaballs = 30;
    var metaballs = [];

    for (var i = 0; i < numMetaballs; i++) {
        var radius = Math.random() * 60 + 10;
        metaballs.push({
            x: Math.random() * (canvas.width - 2 * radius) + radius,
            y: Math.random() * (canvas.height - 2 * radius) + radius,
            vx: (Math.random() - 0.5) * 3,
            vy: (Math.random() - 0.5) * 3,
            r: radius * 0.75
        });
    }

    var vertexShaderSrc = `
    attribute vec2 position;
    void main() {
        gl_Position = vec4(position, 0.0, 1.0);
    }`;

    var fragmentShaderSrc = `
    precision highp float;
    uniform vec3 metaballs[30];

    void main() {
        float x = gl_FragCoord.x;
        float y = gl_FragCoord.y;
        float sum = 0.0;

        for (int i = 0; i < 30; i++) {
            vec3 metaball = metaballs[i];
            float dx = metaball.x - x;
            float dy = metaball.y - y;
            float radius = metaball.z;
            sum += (radius * radius) / (dx * dx + dy * dy);
        }

        if (sum >= 0.99) {
            gl_FragColor = vec4(vec3(x / 800.0, y / 600.0, 1.0), sum * 0.8); // Transparency added
        } else {
            gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0); // Fully transparent background
        }
    }`;

    function compileShader(shaderSource, shaderType) {
        var shader = gl.createShader(shaderType);
        gl.shaderSource(shader, shaderSource);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            throw "Shader compile failed: " + gl.getShaderInfoLog(shader);
        }
        return shader;
    }

    function getUniformLocation(program, name) {
        var uniformLocation = gl.getUniformLocation(program, name);
        if (uniformLocation === -1) {
            throw 'Cannot find uniform ' + name;
        }
        return uniformLocation;
    }

    var vertexShader = compileShader(vertexShaderSrc, gl.VERTEX_SHADER);
    var fragmentShader = compileShader(fragmentShaderSrc, gl.FRAGMENT_SHADER);

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    var vertexData = new Float32Array([
        -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, -1.0
    ]);
    var vertexDataBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexDataBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);

    var positionHandle = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionHandle);
    gl.vertexAttribPointer(positionHandle, 2, gl.FLOAT, false, 0, 0);

    var metaballsHandle = getUniformLocation(program, "metaballs");

    function update() {
        for (var i = 0; i < numMetaballs; i++) {
            var metaball = metaballs[i];
            metaball.x += metaball.vx;
            metaball.y += metaball.vy;
            if (metaball.x < metaball.r || metaball.x > canvas.width - metaball.r) metaball.vx *= -1;
            if (metaball.y < metaball.r || metaball.y > canvas.height - metaball.r) metaball.vy *= -1;
        }

        var dataToSendToGPU = new Float32Array(3 * numMetaballs);
        for (var i = 0; i < numMetaballs; i++) {
            var baseIndex = 3 * i;
            var mb = metaballs[i];
            dataToSendToGPU[baseIndex] = mb.x;
            dataToSendToGPU[baseIndex + 1] = mb.y;
            dataToSendToGPU[baseIndex + 2] = mb.r;
        }

        gl.uniform3fv(metaballsHandle, dataToSendToGPU);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        requestAnimationFrame(update);
    }

    // Ensure the canvas is transparent
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.pointerEvents = "none"; // Prevent it from blocking clicks
    canvas.style.background = "transparent"; // Ensure transparency

    update();
}
