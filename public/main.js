document.addEventListener("DOMContentLoaded", () => {
  // ✅ SAFETY CHECK: Ensure GSAP is loaded before running animations
  if (typeof gsap === "undefined") {
    console.warn("GSAP not loaded. Animations skipped.");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // 1. Animate Content Sections on Scroll
  const contentSections = document.querySelectorAll(".content");
  if (contentSections.length > 0) {
    contentSections.forEach((content) => {
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
  }

  // 2. Parallax Effect for Backgrounds
  const backgrounds = document.querySelectorAll(".background");
  if (backgrounds.length > 0) {
    backgrounds.forEach((bg) => {
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
  }

  // 3. Animate Stats (Fixed Logic: Uses a Proxy Object)
  // The previous method required the TextPlugin. This method works without it.
  const stats = document.querySelectorAll(".stat-number");
  if (stats.length > 0) {
    stats.forEach((stat) => {
      const rawText = stat.textContent;
      const endValue = parseInt(rawText, 10); // Get the number
      const suffix = rawText.replace(/[0-9]/g, ""); // Get text like '+' or '%'

      // Create a dummy object to animate
      let counter = { val: 0 };

      gsap.to(counter, {
        val: endValue,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: stat,
          start: "top 85%", // Starts slightly earlier for better UX
          toggleActions: "play none none reverse",
        },
        onUpdate: function () {
          // Update the text on screen
          stat.textContent = Math.ceil(counter.val) + suffix;
        },
      });
    });
  }

  // 4. Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // ❌ REMOVED: Sidebar/Hamburger Logic
  // Reason: This is already handled by 'sidebar.js'.
  // Keeping it here would cause the menu to break.
});
