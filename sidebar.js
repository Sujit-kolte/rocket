document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const menu = document.querySelector(".side-menu");
    const overlay = document.querySelector(".overlay");
    const menuLinks = document.querySelectorAll(".side-menu a");

    if (!hamburger || !menu) {
        // Some pages might not have sidebar elements, or they are named differently.
        // But based on investigation, they all seem to have .hamburger and .side-menu.
        // We'll log a warning but not crash.
        console.warn("Sidebar elements not found on this page.");
        return;
    }

    function toggleMenu() {
        const isActive = menu.classList.contains("active");

        if (isActive) {
            menu.classList.remove("active");
            hamburger.classList.remove("active");
            if (overlay) overlay.classList.remove("active");

            // Reset animations for links
            menuLinks.forEach((link) => {
                link.style.opacity = "0";
                link.style.transform = "translateX(50px)";
            });
        } else {
            menu.classList.add("active");
            hamburger.classList.add("active");
            if (overlay) overlay.classList.add("active");

            // Trigger animations for links
            menuLinks.forEach((link) => {
                link.style.opacity = "1";
                link.style.transform = "translateX(0)";
            });
        }
    }

    hamburger.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
        if (menu.classList.contains("active") && !menu.contains(e.target) && !hamburger.contains(e.target)) {
            toggleMenu();
        }
    });

    // Close menu when clicking a link
    menuLinks.forEach((link) => {
        link.addEventListener("click", () => {
            toggleMenu();
        });
    });

    // Close menu when clicking overlay
    if (overlay) {
        overlay.addEventListener("click", () => {
            if (menu.classList.contains("active")) {
                toggleMenu();
            }
        });
    }
});
