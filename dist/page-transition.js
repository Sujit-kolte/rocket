document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".page").classList.add("show");

  document.querySelectorAll(".page-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      let href = link.getAttribute("href");

      // Blur effect before navigation
      document.querySelector(".page").classList.remove("show");
      setTimeout(() => {
        window.location.href = href;
      }, 600); // Delay matches CSS transition time
    });
  });
});