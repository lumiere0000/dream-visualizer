let stars = [];
let cloudGradient;
let t = 0;

if (typeof activeEffects === "undefined") {
    var activeEffects = []; // Ensure global storage for effects
}

function startDream() {
    gsap.to("#startScreen", { opacity: 0, duration: 1, onComplete: () => {
        document.getElementById("startScreen").style.display = "none";
    }});
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    pixelDensity(2);

    for (let i = 0; i < 200; i++) {
        stars.push({ x: random(width), y: random(height), size: random(1, 3), speed: random(0.2, 0.5) });
    }
}

function draw() {
  background(13, 27, 42);

  
    
    for (let star of stars) {
        fill(255);
        noStroke();
        ellipse(star.x, star.y, star.size, star.size);
        star.y += star.speed;
        if (star.y > height) star.y = 0;
    }

    // Run all active effects
    for (let effect of activeEffects) {
        effect();
    }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function saveDream() {
  const uiElements = document.querySelectorAll(".keyword-buttons, .start-button, button");

  // Hide UI elements before capturing
  uiElements.forEach(el => el.style.display = "none");

  // Get all p5.js, WebGL, and other effect canvases
  let canvases = document.querySelectorAll("canvas");
  let canvasList = Array.from(canvases);

  // Get HTML effects (Mystical Creatures, Forget Effect, etc.)
  let effectElements = document.querySelectorAll("#mysticalCreaturesEffect, .ghost-container, .desert-container");

  // Create a final merged canvas
  let finalCanvas = document.createElement("canvas");
  let finalCtx = finalCanvas.getContext("2d");

  // Set canvas size to match window dimensions
  finalCanvas.width = window.innerWidth;
  finalCanvas.height = window.innerHeight;

  // **1️⃣ Capture HTML elements first (Mystical Creatures, Forget, etc.)**
  html2canvas(document.body, {
      backgroundColor: null, // Keeps transparency
      logging: false,
      useCORS: true
  }).then(htmlCanvas => {
      finalCtx.drawImage(htmlCanvas, 0, 0); // Draw HTML elements first

      // **2️⃣ Function to draw all canvases one by one**
      function drawCanvas(index) {
          if (index >= canvasList.length) {
              // **3️⃣ Save final image after all layers are drawn**
              let link = document.createElement("a");
              link.download = "dream_visual.png";
              link.href = finalCanvas.toDataURL("image/png");
              link.click();

              // Restore UI elements
              uiElements.forEach(el => el.style.display = "");
              return;
          }

          let currentCanvas = canvasList[index];

          // **Fix for WebGL (Swimming Effect)**
          let gl = currentCanvas.getContext("webgl") || currentCanvas.getContext("experimental-webgl");
          if (gl) {
              let pixels = new Uint8Array(currentCanvas.width * currentCanvas.height * 4);
              gl.readPixels(0, 0, currentCanvas.width, currentCanvas.height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

              let imgData = new ImageData(new Uint8ClampedArray(pixels), currentCanvas.width, currentCanvas.height);
              let webglCanvas = document.createElement("canvas");
              webglCanvas.width = currentCanvas.width;
              webglCanvas.height = currentCanvas.height;
              webglCanvas.getContext("2d").putImageData(imgData, 0, 0);

              finalCtx.drawImage(webglCanvas, 0, 0);
          } else {
              let img = new Image();
              img.src = currentCanvas.toDataURL("image/png");

              img.onload = function () {
                  finalCtx.drawImage(img, 0, 0);
                  drawCanvas(index + 1); // Draw the next canvas
              };
          }
      }

      drawCanvas(0); // Start layering process
  });
}







function addEffect(effectName) {
  if (effectName === "room" && typeof setupRoomEffect === "function") {
      setupRoomEffect();
      if (!activeEffects.includes(drawRoomEffect)) {
          activeEffects.push(drawRoomEffect);
      }
  }
  if (effectName === "chasing" && typeof setupChasingEffect === "function") {
      setupChasingEffect();
      if (!activeEffects.includes(drawChasingEffect)) {
          activeEffects.push(drawChasingEffect);
      }
  }
  if (effectName === "running" && typeof setupRunningEffect === "function") {
      setupRunningEffect();
      if (!activeEffects.includes(drawRunningEffect)) {
          activeEffects.push(drawRunningEffect);
      }
  }
  if (effectName === "flying" && typeof setupFlyingEffect === "function") {
      setupFlyingEffect();
      if (!activeEffects.includes(drawFlyingEffect)) {
          activeEffects.push(drawFlyingEffect);
      }
  }
  if (effectName === "driving" && typeof setupDrivingEffect === "function") {
      setupDrivingEffect();
      if (!activeEffects.includes(drawDrivingEffect)) {
          activeEffects.push(drawDrivingEffect);
      }
  }
  if (effectName === "swimming" && typeof setupSwimmingEffect === "function") {
      setupSwimmingEffect();
      if (!activeEffects.includes(drawSwimmingEffect)) {
          activeEffects.push(drawSwimmingEffect);
      }
  }
  if (effectName === "animals" && typeof setupAnimalEffect === "function") {
      setupAnimalEffect();
      if (!activeEffects.includes(drawAnimalEffect)) {
          activeEffects.push(drawAnimalEffect);
      }
  }
  if (effectName === "family" && typeof setupFamilyEffect === "function") {
      setupFamilyEffect();
      if (!activeEffects.includes(drawFamilyEffect)) {
          activeEffects.push(drawFamilyEffect);
      }
  }
  if (effectName === "weapons" && typeof setupWeaponsEffect === "function") {
      setupWeaponsEffect();
      if (!activeEffects.includes(drawWeaponsEffect)) {
          activeEffects.push(drawWeaponsEffect);
      }
  }
  if (effectName === "forget" && typeof setupForgetEffect === "function") { 
      setupForgetEffect();
      if (!activeEffects.includes(drawForgetEffect)) {
          activeEffects.push(drawForgetEffect);
      }
  }
  if (effectName === "forest" && typeof setupForestEffect === "function") {
      setupForestEffect();
      if (!activeEffects.includes(drawForestEffect)) {
          activeEffects.push(drawForestEffect);
      }
  }
  if (effectName === "desert" && typeof setupDesertEffect === "function") {
      setupDesertEffect();
      if (!activeEffects.includes(drawDesertEffect)) {
          activeEffects.push(drawDesertEffect);
      }
  }
  if (effectName === "darkness" && typeof setupDarknessEffect === "function") {
      setupDarknessEffect();
      if (!activeEffects.includes(drawDarknessEffect)) {
          activeEffects.push(drawDarknessEffect);
      }
  }
  if (effectName === "monsters" && typeof setupMonstersEffect === "function") {
      setupMonstersEffect();
      if (!activeEffects.includes(drawMonstersEffect)) {
          activeEffects.push(drawMonstersEffect);
      }
  }
  if (effectName === "mysticalCreatures" && typeof setupMysticalCreaturesEffect === "function") {
      setupMysticalCreaturesEffect();
      if (!activeEffects.includes(drawMysticalCreaturesEffect)) {
          activeEffects.push(drawMysticalCreaturesEffect);
      }
  }
  if (effectName === "house" && typeof setupHouseEffect === "function") {
      setupHouseEffect();
      if (!activeEffects.includes(drawHouseEffect)) {
          activeEffects.push(drawHouseEffect);
      }
  }
}


