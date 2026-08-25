(function () {
  "use strict";

  /* Mobile navigation */

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  if (toggle && nav) {
    var setOpen = function (open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        setOpen(false);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  /* Inquiry type routing: hide location questions for sellers */

  var inquiry = document.getElementById("inquiry-type");

  if (inquiry) {
    var locationOnly = document.querySelectorAll("[data-only='location']");
    var locationRow = document.querySelector("[data-row='location-type']");
    var message = document.getElementById("message");
    var submit = document.querySelector(".contact-form button[type='submit']");
    var business = document.getElementById("business");
    var businessLabel = document.querySelector("label[for='business']");

    var messagePrompts = {
      "Vending for my location":
        "Do you have vending at the location now? Anything else we should know about the space?",
      "Selling my machines or route":
        "How many machines or locations, roughly where they are, and what you are hoping to get for them.",
      "Something else": "Tell us a little about what you need."
    };

    var applyInquiry = function () {
      var value = inquiry.value;
      var isLocation = value === "Vending for my location";

      Array.prototype.forEach.call(locationOnly, function (group) {
        group.hidden = !isLocation;
        var field = group.querySelector("select, input, textarea");
        if (field && !isLocation) {
          field.value = "";
        }
      });

      if (locationRow) {
        locationRow.classList.toggle("is-single", !isLocation);
      }

      if (business && businessLabel) {
        business.required = isLocation;
        var hint = businessLabel.querySelector(".optional");
        if (isLocation && hint) {
          hint.remove();
        } else if (!isLocation && !hint) {
          businessLabel.insertAdjacentHTML(
            "beforeend",
            ' <span class="optional">(optional)</span>'
          );
        }
      }

      if (message && messagePrompts[value]) {
        message.placeholder = messagePrompts[value];
      }

      if (submit) {
        submit.textContent = isLocation ? "Ask about vending" : "Send inquiry";
      }
    };

    inquiry.addEventListener("change", applyInquiry);
    applyInquiry();
  }

  /* Reveal on scroll */

  var revealed = document.querySelectorAll(".reveal");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!revealed.length) {
    return;
  }

  if (reduceMotion || !("IntersectionObserver" in window)) {
    Array.prototype.forEach.call(revealed, function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
  );

  Array.prototype.forEach.call(revealed, function (el) {
    observer.observe(el);
  });
})();
