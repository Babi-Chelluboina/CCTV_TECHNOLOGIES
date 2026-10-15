"use strict";
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  menuToggle.textContent = open ? "✕" : "☰";
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

const cameraGallery = document.getElementById("cameraGallery");
const galleryDialog = cameraGallery.querySelector(".gallery-dialog");
let galleryReturnFocus = null;
document.querySelectorAll("[data-open-camera-gallery]").forEach(button => {
  button.addEventListener("click", () => {
    galleryReturnFocus = button;
    cameraGallery.classList.add("open");
    cameraGallery.setAttribute("aria-hidden", "false");
    document.body.classList.add("gallery-locked");
    galleryDialog.focus();
  });
});
const recorderGallery = document.getElementById("recorderGallery");
const recorderDialog = recorderGallery.querySelector(".recorder-dialog");
let recorderReturnFocus = null;
document.querySelectorAll("[data-open-recorder-gallery]").forEach(button => {
  button.addEventListener("click", () => {
    recorderReturnFocus = button;
    recorderGallery.classList.add("open");
    recorderGallery.setAttribute("aria-hidden", "false");
    document.body.classList.add("gallery-locked");
    recorderDialog.focus();
  });
});
function closeRecorderGallery() {
  recorderGallery.classList.remove("open");
  recorderGallery.setAttribute("aria-hidden", "true");
  document.body.classList.remove("gallery-locked");
  if (recorderReturnFocus) recorderReturnFocus.focus();
}
recorderGallery.querySelectorAll("[data-close-recorder-gallery]").forEach(button => button.addEventListener("click", closeRecorderGallery));
function closeCameraGallery() {
  cameraGallery.classList.remove("open");
  cameraGallery.setAttribute("aria-hidden", "true");
  document.body.classList.remove("gallery-locked");
  if (galleryReturnFocus) galleryReturnFocus.focus();
}
cameraGallery.querySelectorAll("[data-close-camera-gallery]").forEach(button => button.addEventListener("click", closeCameraGallery));
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && cameraGallery.classList.contains("open")) closeCameraGallery();
  if (event.key === "Escape" && recorderGallery.classList.contains("open")) closeRecorderGallery();
});
cameraGallery.querySelectorAll("[data-camera-filter]").forEach(tab => {
  tab.addEventListener("click", () => {
    const filter = tab.dataset.cameraFilter;
    cameraGallery.querySelectorAll("[data-camera-filter]").forEach(item => {
      const selected = item === tab;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-selected", String(selected));
    });
    cameraGallery.querySelectorAll("[data-camera-type]").forEach(card => {
      card.hidden = filter !== "all" && card.dataset.cameraType !== filter;
    });
  });
});

const serviceSelect = document.getElementById("service");
document.querySelectorAll("[data-service]").forEach(link => {
  link.addEventListener("click", () => {
    serviceSelect.value = link.dataset.service;
  });
});

document.getElementById("enquiryForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const area = document.getElementById("area").value.trim();
  const service = serviceSelect.value;
  const message = document.getElementById("message").value.trim();

  const text =
    "Hello Konaseema CCTV Technologies,\\n\\n" +
    "I would like to request a quotation.\\n\\n" +
    "Name: " + name + "\\n" +
    "Mobile: " + phone + "\\n" +
    "Area: " + area + "\\n" +
    "Service: " + service + "\\n" +
    "Requirements: " + (message || "Please contact me to discuss my requirements.") +
    "\\n\\nThank you.";

  document.getElementById("formStatus").textContent =
    "WhatsApp will open so you can review and send your enquiry.";
  window.open("https://wa.me/917794920721?text=" + encodeURIComponent(text), "_blank", "noopener,noreferrer");
});

const powerGallery = document.getElementById("powerGallery");
const powerDialog = powerGallery.querySelector(".power-dialog");
let powerReturnFocus = null;
document.querySelectorAll("[data-open-power-gallery]").forEach(button => {
  button.addEventListener("click", () => {
    powerReturnFocus = button;
    powerGallery.classList.add("open");
    powerGallery.setAttribute("aria-hidden", "false");
    document.body.classList.add("gallery-locked");
    powerDialog.focus();
  });
});
function closePowerGallery() {
  powerGallery.classList.remove("open");
  powerGallery.setAttribute("aria-hidden", "true");
  document.body.classList.remove("gallery-locked");
  if (powerReturnFocus) powerReturnFocus.focus();
}
powerGallery.querySelectorAll("[data-close-power-gallery]").forEach(button => button.addEventListener("click", closePowerGallery));
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && powerGallery.classList.contains("open")) closePowerGallery();
});

// Reveal page content with a restrained 3D entrance as it scrolls into view.
(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) return;
  const revealTargets = document.querySelectorAll(
    ".hero-copy, .security-badge, .stat, .section-head, .service-card, .quote-card, .power-layout > div, .brand-logo, .contact-layout > div, .contact-form, .footer-main > *"
  );
  revealTargets.forEach((element, index) => {
    element.classList.add("motion-ready");
    element.style.setProperty("--motion-delay", `${(index % 5) * 70}ms`);
  });
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in-view");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14, rootMargin: "0px 0px -35px 0px" });
  revealTargets.forEach(element => observer.observe(element));
})();

// Include the added company, use-case and FAQ sections in the scroll animation.
(() => {
  const revealTargets = document.querySelectorAll(".about-layout > div, .use-case-grid > article, .faq-layout > *, .faq-list details");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
  revealTargets.forEach((element, index) => {
    element.classList.add("motion-ready");
    element.style.setProperty("--motion-delay", `${(index % 4) * 75}ms`);
  });
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("in-view");
    observer.unobserve(entry.target);
  }), { threshold: 0.14, rootMargin: "0px 0px -35px 0px" });
  revealTargets.forEach(element => observer.observe(element));
})();

// Swap the opening text hero for the full banner image when its asset is present.
(() => {
  const hero = document.getElementById("home");
  const banner = hero.querySelector(".hero-banner-image");
  const showBanner = () => hero.classList.add("banner-loaded");
  banner.addEventListener("load", showBanner, { once: true });
  if (banner.complete && banner.naturalWidth > 0) showBanner();
})();
