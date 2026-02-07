const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let stars = []; // Array to store star data
const numStars = 800; // Number of stars
let width, height, cx, cy;

// Initialize canvas size and center point
function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  cx = width / 2;
  cy = height / 2;
}

// Create a single star object
function createStar() {
  return {
    x: Math.random() * width - cx, // Random position relative to center
    y: Math.random() * height - cy,
    z: Math.random() * width, // Random depth
    o: "0." + Math.floor(Math.random() * 99) + 1, // Random opacity
  };
}

// Initialize all stars
function initStars() {
  stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push(createStar());
  }
}

// Update star position (Move it closer)
function moveStars() {
  stars.forEach((star) => {
    star.z -= 2; // Speed of stars coming towards screen

    // If star passes the screen (z <= 0), reset it to the back
    if (star.z <= 0) {
      star.z = width;
      star.x = Math.random() * width - cx;
      star.y = Math.random() * height - cy;
    }
  });
}

// Draw stars on canvas
function drawStars() {
  // Clear canvas for next frame (Transparent background)
  ctx.clearRect(0, 0, width, height);

  stars.forEach((star) => {
    // 3D Projection Math: Calculate 2D x,y based on 3D z depth
    const k = 128.0 / star.z;
    const px = star.x * k + cx;
    const py = star.y * k + cy;

    // Only draw if within screen bounds
    if (px >= 0 && px <= width && py >= 0 && py <= height) {
      const size = (1 - star.z / width) * 2.5; // Stars get bigger as they get closer
      const shade = parseInt((1 - star.z / width) * 255); // Stars get brighter as they get closer

      ctx.fillStyle = `rgb(${shade},${shade},${shade})`;
      ctx.beginPath();
      ctx.arc(px, py, size, 0, Math.PI * 2); // Draw circle
      ctx.fill();
    }
  });
}

// Animation Loop
function animate() {
  moveStars();
  drawStars();
  requestAnimationFrame(animate);
}

// Handle Window Resize
window.addEventListener("resize", () => {
  resizeCanvas();
  initStars(); // Re-initialize stars to fill new size
});

// Start everything
resizeCanvas();
initStars();
animate();
