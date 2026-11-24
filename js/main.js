/*
  Enchanted Realm Finds
  Shared script for every page. Handles the mobile navigation menu,
  the gentle scroll reveal animation on cards and sections, the starfield
  sparkle dots in the hero, and the automatic footer year.
*/

document.addEventListener("DOMContentLoaded", function () {
  setupNavToggle();
  setupScrollReveal();
  setupStarfield();
  setupFooterYear();
});

function setupNavToggle() {
  var toggle = document.querySelector(".navToggle");
  var links = document.querySelector(".navLinks");
  if (!toggle || !links) {
    return;
  }
  toggle.addEventListener("click", function () {
    var isOpen = links.classList.toggle("isOpen");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
  links.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      links.classList.remove("isOpen");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setupScrollReveal() {
  var items = document.querySelectorAll(".revealOnScroll");
  if (!items.length) {
    return;
  }
  if (!("IntersectionObserver" in window)) {
    items.forEach(function (item) {
      item.classList.add("isVisible");
    });
    return;
  }
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("isVisible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  items.forEach(function (item) {
    observer.observe(item);
  });
}

function setupStarfield() {
  var field = document.querySelector(".starfield");
  if (!field) {
    return;
  }
  var total = 26;
  for (var i = 0; i < total; i++) {
    var dot = document.createElement("span");
    dot.style.left = Math.random() * 100 + "%";
    dot.style.top = Math.random() * 100 + "%";
    dot.style.animationDelay = (Math.random() * 3).toFixed(2) + "s";
    field.appendChild(dot);
  }
}

function setupFooterYear() {
  var yearSpan = document.querySelector("[data-current-year]");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}
