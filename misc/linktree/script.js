const bubblesContainer = document.querySelector(".bubbles");

function createBubble(x, y) {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");

  // Set random size (smaller than before)
  const size = Math.random() * 1.5 + 0.5; // Size between 0.5vw and 2vw
  bubble.style.width = `${size}vw`;
  bubble.style.height = `${size}vw`;

  // Set initial position at the cursor
  bubble.style.left = `${x}px`;
  bubble.style.top = `${y}px`;

  // Randomize movement offsets
  const scatterX = (Math.random() - 0.5) * 200;
  const scatterY = (Math.random() - 1) * 200;

  // Set CSS custom properties for animation
  bubble.style.setProperty("--scatter-x", `${scatterX}px`);
  bubble.style.setProperty("--scatter-y", `${scatterY}px`);

  // Set random animation duration
  const duration = Math.random() * 2 + 1;
  bubble.style.animation = `scatter ${duration}s forwards`;

  // Set random color
  const hue = Math.floor(Math.random() * 360); // Random hue
  const saturation = Math.floor(Math.random() * 30 + 70); // 70-100% saturation
  const lightness = Math.floor(Math.random() * 20 + 70); // 70-90% lightness
  const alpha = Math.random() * 0.85 + 0.98; // 0.2-0.5 opacity
  bubble.style.backgroundColor = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;

  bubblesContainer.appendChild(bubble);

  // Remove bubble after animation
  bubble.addEventListener("animationend", () => {
    bubble.remove();
  });
}

// Create bubbles on mouse move
let lastBubbleTime = 0;
const bubbleInterval = 70; // Reduced from 100 to 20 milliseconds
const bubblesPerEvent = 2; // Number of bubbles to create per event

document.addEventListener("mousemove", (event) => {
  const currentTime = Date.now();
  if (currentTime - lastBubbleTime > bubbleInterval) {
    for (let i = 0; i < bubblesPerEvent; i++) {
      // Create multiple bubbles per event
      createBubble(
        event.clientX + (Math.random() - 0.5) * 20, // Add some randomness to position
        event.clientY + (Math.random() - 0.5) * 20
      );
    }
    lastBubbleTime = currentTime;
  }
});

// Keyframes for the scattering effect
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(
  `
@keyframes scatter {
    0% {
        transform: translate(0, 0);
        opacity: 1;
    }
    100% {
        transform: translate(var(--scatter-x), var(--scatter-y));
        opacity: 0;
    }
}`,
  styleSheet.cssRules.length
);

// Link Hover effects
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

document.querySelectorAll(".links-circle a").forEach((link) => {
  link.addEventListener("mouseenter", () => {
    const randomColor = getRandomColor();
    link.style.setProperty("--glow-color", randomColor);
  });

  link.addEventListener("mouseleave", () => {
    link.style.animation = "none";
    link.offsetHeight; // Trigger reflow
    link.style.animation = null;
  });
});