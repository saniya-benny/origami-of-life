// Update year in footer
const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear().toString();
}

// Mobile nav toggle
const navToggleButton = document.querySelector(".nav-toggle");
const navLinks = document.getElementById("primary-navigation");
if (navToggleButton && navLinks) {
  navToggleButton.addEventListener("click", () => {
    const isOpen = navLinks.getAttribute("data-open") === "true";
    navLinks.setAttribute("data-open", String(!isOpen));
    navToggleButton.setAttribute("aria-expanded", String(!isOpen));
  });
}

// Smooth scroll for hash links
const internalLinks = document.querySelectorAll('a[href^="#"]');
internalLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = (link.getAttribute("href") || "").slice(1);
    if (!targetId) return;
    const target = document.getElementById(targetId);
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Simple form handler
const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");
if (contactForm && formMessage) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const email = String(formData.get("email") || "").trim();
    if (!email) {
      formMessage.textContent = "Please enter a valid email.";
      return;
    }
    // Simulate async submit
    formMessage.textContent = "Submitting...";
    await new Promise((resolve) => setTimeout(resolve, 700));
    formMessage.textContent = `Thanks! We\u2019ll keep ${email} updated.`;
    contactForm.reset();
  });
}