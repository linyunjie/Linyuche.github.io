(function () {
  "use strict";

  var sideNav = document.getElementById("sideNav");
  var navCollapse = document.getElementById("navbarSupportedContent");
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function closeMobileNav() {
    if (!navCollapse || !window.bootstrap) {
      return;
    }
    var instance = bootstrap.Collapse.getInstance(navCollapse);
    if (instance) {
      instance.hide();
    }
  }

  document.querySelectorAll('a.js-scroll-trigger[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      var hash = this.getAttribute("href");
      if (!hash || hash === "#") {
        return;
      }

      var target = document.querySelector(hash);
      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start"
      });

      if (history.pushState) {
        history.pushState(null, "", hash);
      }

      closeMobileNav();
    });
  });

  var sections = Array.prototype.slice.call(document.querySelectorAll("section.resume-section[id]"));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll("#sideNav .nav-link"));

  function setActiveLink() {
    var scrollPos = window.scrollY + 120;
    var currentId = sections.length ? sections[0].id : "";

    sections.forEach(function (section) {
      if (section.offsetTop <= scrollPos) {
        currentId = section.id;
      }
    });

    navLinks.forEach(function (link) {
      var isActive = link.getAttribute("href") === "#" + currentId;
      link.classList.toggle("active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  var revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }

  windowActiveLink();
  window.addEventListener("scroll", setActiveLink, { passive: true });
  window.addEventListener("resize", setActiveLink);

  if (sideNav) {
    sideNav.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeMobileNav();
      }
    });
  }
})();
