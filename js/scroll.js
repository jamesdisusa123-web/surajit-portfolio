// Scroll Reveal Animation

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  const triggerPoint = windowHeight * 0.85;

  reveals.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < triggerPoint) {
      element.classList.add("show");
    }
  });
}

// Run on scroll
window.addEventListener("scroll", revealOnScroll);

// Run once on load
revealOnScroll();
