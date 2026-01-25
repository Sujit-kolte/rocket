// Parallax Effect
window.addEventListener("scroll", function () {
  const rockets = document.querySelectorAll(".rocket");

  rockets.forEach((rocket) => {
    const rocketPosition = rocket.getBoundingClientRect().top;

    // Parallax Effect
    const offset = rocketPosition * 0.3;
    rocket.style.transform = `translateY(${offset}px)`;
  });
});

// Adjust thruster flame size and intensity based on scroll position
window.addEventListener("scroll", () => {
  const flame = document.getElementById("thrusterFlame");
  const scrollY = window.scrollY;
  const intensity = Math.min(scrollY / 150, 1); // Adjust for faster intensity

  flame.style.height = `${80 + intensity * 100}px`;
  flame.style.opacity = `${0.7 + intensity * 0.3}`;
  flame.style.filter = `blur(${2 + intensity * 4}px)`;
});