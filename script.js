const progressBar = document.getElementById("progressBar");
const siteHeader = document.getElementById("siteHeader");
const navToggle = document.getElementById("navToggle");
const mobilePanel = document.getElementById("mobilePanel");
const navLinks = document.querySelectorAll(".nav-links a, .mobile-panel a");
const sections = [...document.querySelectorAll("section[id]")];

const updateProgress = () => {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
  progressBar.style.transform = `scaleX(${progress})`;
};

const updateHeader = () => {
  siteHeader.classList.toggle("scrolled", window.scrollY > 24);
};

window.addEventListener("scroll", () => {
  updateProgress();
  updateHeader();
}, { passive: true });

window.addEventListener("resize", updateProgress);
updateProgress();
updateHeader();

navToggle?.addEventListener("click", () => {
  const isOpen = mobilePanel.classList.toggle("open");
  document.body.classList.toggle("nav-open", isOpen);
  siteHeader.classList.toggle("menu-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobilePanel?.classList.remove("open");
    document.body.classList.remove("nav-open");
    siteHeader.classList.remove("menu-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

const setActiveLink = () => {
  const current = sections
    .filter((section) => section.getBoundingClientRect().top <= 120)
    .at(-1);

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.classList.toggle("active", current && link.getAttribute("href") === `#${current.id}`);
  });
};

window.addEventListener("scroll", setActiveLink, { passive: true });
setActiveLink();

const revealElements = [...document.querySelectorAll(".reveal")];
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion) {
  revealElements.forEach((element) => element.classList.add("reveal-in"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-in");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}

document.addEventListener("visibilitychange", () => {
  document.title = document.hidden
    ? "Karan Kumar - Web Developer"
    : "Karan Kumar - Web Developer";
});
