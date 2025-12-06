// for progress bar
const progressBar = document.getElementById("progressBar");
window.addEventListener("scroll", () => {
  const scrollPercentage =
    (window.scrollY /
      (document.documentElement.scrollHeight - window.innerHeight)) *
    100;
  progressBar.style.height = `${scrollPercentage}%`;
});

// for smooth scrolling of links 
// Select all links with href starting with '#'
const navLinks = document.querySelectorAll('a[href^="#"]');
navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    targetSection.scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Animations for the humburger in the hero section
const nl = document.getElementById('navLinks')
const humburger = document.querySelector('.humburger')
const humLineEl = document.querySelectorAll('.humLine')
let toggle = true

humburger.addEventListener('click', () => {
  if (toggle) {
    nl.style.left = 0

  }
  else {
    nl.style.left = '-100%'
  }
  toggle = !toggle;

  humLineEl.forEach(item => {
    item.classList.toggle('hb')
  })
})

// for project section click on me button
function moveText(event) {
  const card = event.currentTarget;
  const hoverText = card.querySelector('.hover-text');

  // Calculate relative position within the card
  const x = event.clientX - card.getBoundingClientRect().left;
  const y = event.clientY - card.getBoundingClientRect().top;

  // Update the position of the hover text
  hoverText.style.left = `${x}px`;
  hoverText.style.top = `${y}px`;
}


// For skills section animation on hover
const skills = document.querySelectorAll(".skill span");
const tl = gsap.timeline({ paused: true }); // Pause the timeline initially
skills.forEach((text, index) => {
  text.parentNode.addEventListener("mouseenter", () => {
    gsap.to(text, {
      x: 0,
      y: 0,
      opacity: 1, 
      duration: 0.2,
      repeat: 5,
      yoyo: true,
    });
  });

  text.parentNode.addEventListener("mousemove", (event) => {
    const rect = text.parentNode.getBoundingClientRect();
    const relX = event.clientX - rect.left - rect.width / 2;
    const relY = event.clientY - rect.top - rect.height / 2;
    const angle = Math.atan2(relY, relX);
    const maxRadius = (rect.width / 2) - (text.offsetWidth / 2);
    const x = maxRadius * Math.cos(angle);
    const y = maxRadius * Math.sin(angle);
    
    gsap.to(text, {
      x: x,
      y: y,
      duration: 0.2,
    });
  });

  text.parentNode.addEventListener("mouseleave", () => {
    gsap.to(text, {
      x: 0,
      y: 0,
      duration: 0.2,
    });
  });
});

const skillsSection = document.getElementById("Skills");
skillsSection.addEventListener("mouseover", () => {
  tl.play(); // Play the GSAP timeline when you hover over the section
});