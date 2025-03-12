function setupMysticalCreaturesEffect() {
    console.log("✅ Mystical Creatures Effect Activated!");

    // Create a div container for the effect
    let container = document.createElement("div");
    container.id = "mysticalCreaturesEffect";
    container.style.position = "absolute";
    container.style.top = "50%";
    container.style.left = "50%";
    container.style.transform = "translate(-50%, -50%)";
    container.style.zIndex = "1000"; // Ensures it's above other content

    // Add the mouth HTML
    container.innerHTML = `
        <div id="mouth">
            <div class="drop"></div>
            <div class="drop"></div>
        </div>
    `;

    // Append the effect to the body
    document.body.appendChild(container);

    // Add styles dynamically
    let style = document.createElement("style");
    style.innerHTML = `
        #mouth {
            width: 600px; /* Increased width */
            height: 250px; /* Increased height */
            position: relative;
            transform-origin: 50% 0%;
            transition: .5s;
            border-radius: 5% / 30%;
            border-right: 2px solid rgba(255,255,255,.25);
            border-left: 2px solid rgba(255,255,255,.25);
            box-sizing: border-box;
            background: black;
        }

        #mouth:after {
            content: '';
            width: 100%;
            height: 200px; /* Increased size */
            background: linear-gradient(to top, red 30%, white 30%);
            clip-path: 
                polygon(0% 0%, 100% 0%, 90% 15%, 80% 100%, 75% 5%, 74% 25%, 65% 25%, 64% 5%, 63% 25%, 51% 25%, 50% 5%, 49% 25%, 37% 25%, 36% 5%, 35% 25%, 26% 25%, 25% 5%, 20% 100%, 10% 15%);
            position: absolute;
            left: 0%;
            top: -10%;
            border-radius: 50% / 15%;
            transition: .5s;
        }

        #mouth:before {
            content: '';
            width: 100%;
            height: 200px; /* Increased size */
            background: white;
            clip-path: 
                polygon(0% 0%, 100% 0%, 85% 10%, 80% 25%, 75% 5%, 74% 25%, 65% 25%, 64% 5%, 63% 25%, 51% 25%, 50% 5%, 49% 25%, 37% 25%, 36% 5%, 35% 25%, 26% 25%, 25% 5%, 20% 25%, 15% 10%);
            position: absolute;
            left: 0%;
            bottom: -10%;
            transform: scaleY(-1);
            border-radius: 50% / 15%;
            transition: .5s;
        }

        .drop {
            width: 100px; /* Increased size */
            aspect-ratio: 1/1;
            background: red;
            border-radius: 0 50% 50% 50%;
            transform-origin: 50% 0%;
            transform: rotate(45deg) scale(.5);
            position: absolute;
            left: 80px;
            top: 130px;
            opacity: 0;  
        }

        .drop:nth-child(2) {
            left: 420px;
        }

        @keyframes drop {
            25% { opacity: 1; top: 180px; }
            100% { opacity: 0; top: 250px; }
        }

        #mouth:hover {
            background: none;
            border-color: rgba(255,255,255,0);
        }

        #mouth:hover:before {
            animation: bite .5s linear infinite;
        }

        @keyframes bite {
            50% { bottom: 50px; }
        }

        #mouth:hover:after {
            animation: bite_top .5s linear infinite;
        }

        @keyframes bite_top {
            50% { top: 50px; }
        }

        #mouth:hover .drop {
            animation: drop .5s linear infinite;
        }

        #mouth:hover .drop:nth-child(2) {
            animation: drop .5s ease-in .25s infinite;
        }
    `;

    document.head.appendChild(style);
}

// Function to stop and remove the effect
function stopMysticalCreaturesEffect() {
    console.log("❌ Mystical Creatures Effect Stopped!");
    let effect = document.getElementById("mysticalCreaturesEffect");
    if (effect) effect.remove();
}
