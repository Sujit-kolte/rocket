document.addEventListener("DOMContentLoaded", () => {
  // 1. Select elements
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".side-menu");
  const overlay = document.querySelector(".overlay");
  const menuLinks = document.querySelectorAll(".side-menu a");

  // 2. Safety Check
  if (!hamburger || !menu) {
    console.warn("Sidebar elements not found. Check your HTML class names.");
    return;
  }

  // 3. The Toggle Function
  function toggleMenu() {
    // Toggle the "active" class on the main elements
    hamburger.classList.toggle("active");
    menu.classList.toggle("active");

    if (overlay) {
      overlay.classList.toggle("active");
    }
  }

  // 4. Hamburger Click Event
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevents the document click from closing it immediately
    toggleMenu();
  });

  // 5. Close when clicking the Overlay
  if (overlay) {
    overlay.addEventListener("click", () => {
      if (menu.classList.contains("active")) {
        toggleMenu();
      }
    });
  }

  // 6. Close when clicking any Link inside the menu
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (menu.classList.contains("active")) {
        toggleMenu();
      }
    });
  });

  // 7. Close when clicking anywhere else on the screen
  document.addEventListener("click", (e) => {
    if (
      menu.classList.contains("active") &&
      !menu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      toggleMenu();
    }
  });
});
