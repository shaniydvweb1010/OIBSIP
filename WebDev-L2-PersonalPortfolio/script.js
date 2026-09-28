// ============================================
// NAVIGATION
// ============================================

const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  navToggle.classList.toggle("open", isOpen);
  navToggle.setAttribute("aria-expanded", isOpen);
});

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});


// ============================================
// NAVBAR SCROLL EFFECT
// ============================================

const navbar = document.getElementById("navbar");

function updateNavbar() {
  if (window.scrollY > 30) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", updateNavbar);
updateNavbar();



// ============================================
// SCROLL PROGRESS BAR
// ============================================

const progressBar = document.querySelector(".progress-bar");

function updateProgress() {
  const scrollTop = window.scrollY;
  const documentHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress =
    documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;

  progressBar.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateProgress);
updateProgress();


// ============================================
// ACTIVE NAVIGATION LINK
// ============================================

const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".nav-links a");

function updateActiveLink() {
  const scrollPosition = window.scrollY + 120;

  let currentSection = "home";

  sections.forEach((section) => {
    if (scrollPosition >= section.offsetTop) {
      currentSection = section.id;
    }
  });

  navigationLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveLink);
updateActiveLink();


// ============================================
// SCROLL REVEAL ANIMATION
// ============================================

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});


// ============================================
// CONTACT FORM VALIDATION
// ============================================

const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

function showError(input, message) {
  const field = input.closest(".field");
  const error = field.querySelector(".error-msg");

  input.classList.add("invalid");
  error.textContent = message;
}

function clearError(input) {
  const field = input.closest(".field");
  const error = field.querySelector(".error-msg");

  input.classList.remove("invalid");
  error.textContent = "";
}

function validateForm() {
  let valid = true;

  clearError(nameInput);
  clearError(emailInput);
  clearError(messageInput);

  formSuccess.hidden = true;

  // Name validation
  if (nameInput.value.trim().length < 2) {
    showError(nameInput, "Please enter your name.");
    valid = false;
  }

  // Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(emailInput.value.trim())) {
    showError(emailInput, "Please enter a valid email.");
    valid = false;
  }

  // Message validation
  if (messageInput.value.trim().length < 10) {
    showError(messageInput, "Message must be at least 10 characters.");
    valid = false;
  }

  return valid;
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (validateForm()) {
    formSuccess.hidden = false;

    contactForm.reset();

    setTimeout(() => {
      formSuccess.hidden = true;
    }, 5000);
  }
});


// ============================================
// REMOVE ERROR WHILE TYPING
// ============================================

[nameInput, emailInput, messageInput].forEach((input) => {
  input.addEventListener("input", () => {
    clearError(input);
  });
});



// ============================================
// CURRENT YEAR
// ============================================

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const roles = [
  "Full Stack Developer Trainee | Web Development Intern | Mumbai India",
  
];

let roleIndex = 0;
let charIndex = 0;

const dynamicTextSpan = document.getElementById("dynamicText");

function typeEffect() {
  if (charIndex < roles[roleIndex].length) {

    dynamicTextSpan.textContent += roles[roleIndex].charAt(charIndex);

    charIndex++;

    setTimeout(typeEffect, 100);

  } else {

    setTimeout(eraseEffect, 2000);
  }
}

function eraseEffect() {

  if (charIndex > 0) {

    dynamicTextSpan.textContent =
      roles[roleIndex].substring(0, charIndex - 1);

    charIndex--;

    setTimeout(eraseEffect, 50);

  } else {

    roleIndex = (roleIndex + 1) % roles.length;

    setTimeout(typeEffect, 300);
  }
}

typeEffect();
// Light/Dark Mode
// const themeToggle = document.getElementById("themeToggle");

// themeToggle.addEventListener("click", () => {
//   document.body.classList.toggle("light-mode");

//   if (document.body.classList.contains("light-mode")) {
//     themeToggle.textContent = "🌙";
//   } else {
//     themeToggle.textContent = "☀️";
//   }
// });