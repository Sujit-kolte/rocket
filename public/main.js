gsap.registerPlugin(ScrollTrigger);

// Animate content sections on scroll
document.querySelectorAll(".content").forEach((content) => {
  gsap.fromTo(
    content,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: content,
        start: "top center",
        end: "bottom center",
        toggleActions: "play none none reverse",
      },
    },
  );
});

// Parallax effect for backgrounds
document.querySelectorAll(".background").forEach((bg) => {
  gsap.to(bg, {
    yPercent: 30,
    ease: "none",
    scrollTrigger: {
      trigger: bg.parentElement,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
});

// Animate stats counting up
const stats = document.querySelectorAll(".stat-number");
stats.forEach((stat) => {
  const value = parseInt(stat.textContent);
  gsap.fromTo(
    stat,
    { textContent: 0 },
    {
      textContent: value,
      duration: 2,
      ease: "power1.out",
      snap: { textContent: 1 },
      scrollTrigger: {
        trigger: stat,
        start: "top center+=100",
        toggleActions: "play none none reverse",
      },
    },
  );
});

// Smooth scroll navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
const hamburger = document.querySelector(".hamburger");
const sideMenu = document.querySelector(".side-menu");
const overlay = document.querySelector(".overlay");
const menuLinks = document.querySelectorAll(".side-menu a");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  sideMenu.classList.toggle("active");
  overlay.classList.toggle("active");

  // Reset animations when closing
  if (!sideMenu.classList.contains("active")) {
    menuLinks.forEach((link) => {
      link.style.opacity = "0";
      link.style.transform = "translateX(50px)";
    });
  }
});

overlay.addEventListener("click", () => {
  hamburger.classList.remove("active");
  sideMenu.classList.remove("active");
  overlay.classList.remove("active");

  menuLinks.forEach((link) => {
    link.style.opacity = "0";
    link.style.transform = "translateX(50px)";
  });
});
