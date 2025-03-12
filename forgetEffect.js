let showForgetEffect = false;

function setupForgetEffect() {
    if (showForgetEffect) return; // Prevent multiple activations

    showForgetEffect = true;

    // Create ghost container if it doesn't exist
    let ghostContainer = document.getElementById("ghostContainer");
    if (!ghostContainer) {
        ghostContainer = document.createElement("div");
        ghostContainer.id = "ghostContainer";
        ghostContainer.classList.add("ghost-container");
        ghostContainer.innerHTML = `
            <svg class="ghost" viewBox="0 0 26.458333 26.458334">
                <g transform="translate(0 -270.542)">
                    <path d="M4.63 279.293c0-4.833 3.85-8.751 8.6-8.751 4.748 0 8.598 3.918 8.598 8.75H13.23zM4.725 279.293h16.914c.052 0 .19.043.19.096l-.095 14.329c0 .026-.011.05-.028.068a.093.093 0 0 1-.067.028c-.881 0-1.235-1.68-2.114-1.616-.995.072-1.12 2.082-2.114 2.154-.88.064-1.233-1.615-2.115-1.615-.881 0-1.233 1.615-2.114 1.615-.881 0-1.233-1.615-2.114-1.615-.882 0-1.236 1.679-2.115 1.615-.994-.072-1.12-2.082-2.114-2.154-.88-.063-1.41 1.077-2.114 1.616-.021.016-.05-.01-.067-.028a.097.097 0 0 1-.028-.068v-14.33c0-.052.042-.095.095-.095z" fill="#f1eedb"/>
                </g>
            </svg>
            <h1>403</h1>
            <p>Access Not Granted</p>
        `;
        document.body.appendChild(ghostContainer);
    }

    // Show the ghost effect
    ghostContainer.style.display = "flex";
    ghostContainer.style.opacity = "0";

    gsap.to(ghostContainer, {
        opacity: 1,
        duration: 1.5,
        ease: "power2.inOut"
    });

    
}
