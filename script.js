const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const revealItems = document.querySelectorAll(".reveal");
const typedRole = document.querySelector("#typed-role");

function closeMenu() {
  if (!navToggle || !navMenu) return;
  navToggle.classList.remove("is-active");
  navMenu.classList.remove("is-open");
  document.body.classList.remove("menu-open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Open navigation");
}

function openMenu() {
  if (!navToggle || !navMenu) return;
  navToggle.classList.add("is-active");
  navMenu.classList.add("is-open");
  document.body.classList.add("menu-open");
  navToggle.setAttribute("aria-expanded", "true");
  navToggle.setAttribute("aria-label", "Close navigation");
}

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.contains("is-open");
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -70px 0px",
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

const sections = document.querySelectorAll("main section[id]");
const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("active", isCurrent);
      });
    });
  },
  {
    threshold: 0.45,
  }
);

sections.forEach((section) => activeObserver.observe(section));

function runTypingEffect() {
  if (!typedRole) return;

  const fullText = "PHP Laravel Developer";
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    typedRole.textContent = fullText;
    return;
  }

  let index = 0;
  typedRole.textContent = "";

  const typeNext = () => {
    typedRole.textContent = fullText.slice(0, index);
    index += 1;

    if (index <= fullText.length) {
      window.setTimeout(typeNext, 76);
    }
  };

  window.setTimeout(typeNext, 360);
}

runTypingEffect();
