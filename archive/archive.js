document.addEventListener('DOMContentLoaded', function () {
  // Animate mission nodes on scroll and toggle active state
  const nodes = document.querySelectorAll('.mission-node');

  const observerOptions = {
    root: null,
    rootMargin: '-40% 0px -40% 0px', // Trigger when element is in the middle 20% of screen
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.classList.add('active');
      } else {
        entry.target.classList.remove('active');
      }
    });
  }, observerOptions);

  nodes.forEach(node => {
    observer.observe(node);
  });

  // Hamburger menu logic

}); 