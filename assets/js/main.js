/* ==========================================================================
   Farrmill Pest Control — Site interactions
   Vanilla JS, zero dependencies. Fast on every device.
   ========================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var doc = document;

  function ready(fn) {
    if (doc.readyState !== "loading") fn();
    else doc.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    /* ---- Current year ---- */
    var yr = doc.getElementById("year");
    if (yr) yr.textContent = new Date().getFullYear();

    /* ---- Header shrink on scroll ---- */
    var header = doc.querySelector(".site-header");
    var onScroll = function () {
      if (!header) return;
      header.classList.toggle("is-scrolled", window.scrollY > 20);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    /* ---- Mobile nav toggle ---- */
    var toggle = doc.querySelector(".nav-toggle");
    var nav = doc.querySelector(".nav");
    function closeNav() {
      doc.body.classList.remove("nav-open");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    }
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = doc.body.classList.toggle("nav-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      nav.addEventListener("click", function (e) {
        if (e.target.closest("a")) closeNav();
      });
      doc.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closeNav();
      });
      window.addEventListener("resize", function () {
        if (window.innerWidth > 900) closeNav();
      });
    }

    /* ---- Scroll reveal (IntersectionObserver) ---- */
    var revealEls = doc.querySelectorAll("[data-reveal], [data-stagger]");

    function reveal(el) {
      if (el.classList.contains("in")) return;
      // stagger children
      if (el.hasAttribute("data-stagger")) {
        var step = parseInt(el.getAttribute("data-stagger-delay") || "80", 10);
        Array.prototype.forEach.call(el.children, function (child, i) {
          child.style.transitionDelay = (i * step) + "ms";
        });
      }
      el.classList.add("in");
    }

    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach(reveal);
    } else {
      var io = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          reveal(entry.target);
          obs.unobserve(entry.target);
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
      revealEls.forEach(function (el) { io.observe(el); });

      // Belt-and-braces: anything already in (or near) the viewport reveals
      // regardless of viewport height, font-load shifts, or observer timing.
      var sweep = function () {
        var vh = window.innerHeight || document.documentElement.clientHeight;
        revealEls.forEach(function (el) {
          if (el.classList.contains("in")) return;
          if (el.getBoundingClientRect().top < vh * 0.95) {
            reveal(el);
            io.unobserve(el);
          }
        });
      };
      window.addEventListener("load", sweep);
      setTimeout(sweep, 400);   // after initial layout/fonts
      setTimeout(sweep, 1600);  // final safety net
    }

    /* ---- Animated counters ---- */
    var counters = doc.querySelectorAll("[data-count]");
    function animateCount(el) {
      var target = parseFloat(el.getAttribute("data-count"));
      var decimals = (el.getAttribute("data-decimals") | 0);
      var dur = 1500;
      if (reduceMotion) { el.textContent = target.toFixed(decimals); return; }
      var start = null;
      function tick(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        el.textContent = (target * eased).toFixed(decimals);
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = target.toFixed(decimals);
      }
      requestAnimationFrame(tick);
    }
    if (counters.length) {
      if (!("IntersectionObserver" in window)) {
        counters.forEach(animateCount);
      } else {
        var co = new IntersectionObserver(function (entries, obs) {
          entries.forEach(function (e) {
            if (e.isIntersecting) { animateCount(e.target); obs.unobserve(e.target); }
          });
        }, { threshold: 0.5 });
        counters.forEach(function (c) { co.observe(c); });
      }
    }

    /* ---- Accordion (FAQ) ---- */
    doc.querySelectorAll(".acc-trigger").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var item = btn.closest(".acc-item");
        var panel = item.querySelector(".acc-panel");
        var isOpen = item.classList.contains("open");
        // close siblings within same accordion
        var parent = item.closest(".accordion");
        if (parent) {
          parent.querySelectorAll(".acc-item.open").forEach(function (openItem) {
            if (openItem !== item) {
              openItem.classList.remove("open");
              openItem.querySelector(".acc-panel").style.maxHeight = null;
              openItem.querySelector(".acc-trigger").setAttribute("aria-expanded", "false");
            }
          });
        }
        item.classList.toggle("open", !isOpen);
        btn.setAttribute("aria-expanded", (!isOpen).toString());
        panel.style.maxHeight = !isOpen ? panel.scrollHeight + "px" : null;
      });
    });

    /* ---- Booking / contact form ---- */
    var form = doc.querySelector("[data-booking-form]");
    if (form) {
      var successBox = doc.querySelector("[data-form-success]");
      var errorBanner = doc.querySelector("[data-form-error]");

      /* ---- Anti-spam plumbing ----
         Layered, defence-in-depth signals. These stop the overwhelming majority
         of automated junk before it reaches a human. They must ALSO be re-checked
         on the server once the form is wired to a backend (a bot can POST directly
         and skip all client-side JS). See notes in contact.html. */
      var honeypot   = form.querySelector('[name="company_website"]');
      var loadedField = form.querySelector("[data-loaded-at]");
      var tokenField  = form.querySelector("[data-human-token]");
      var MIN_FILL_MS = 3500;          // humans take longer than this to complete the form
      var loadedAt = Date.now();
      if (loadedField) loadedField.value = String(loadedAt);

      // "human_verified" token is only set once a real user interacts (pointer/keyboard).
      // Bots that don't run JS or never interact leave it empty and are rejected.
      var humanInteracted = false;
      function markHuman() {
        if (humanInteracted) return;
        humanInteracted = true;
        if (tokenField) tokenField.value = "h:" + (Date.now() - loadedAt);
      }
      ["pointerdown", "keydown", "touchstart"].forEach(function (evt) {
        form.addEventListener(evt, markHuman, { once: false, passive: true });
      });

      function looksLikeSpam() {
        // 1) Honeypot filled in
        if (honeypot && honeypot.value.trim() !== "") return "honeypot";
        // 2) Submitted implausibly fast
        if (Date.now() - loadedAt < MIN_FILL_MS) return "too-fast";
        // 3) No genuine human interaction recorded
        if (!humanInteracted || (tokenField && !tokenField.value)) return "no-interaction";
        // 4) Link spam in free-text fields (common junk signature)
        var msg = form.querySelector("#message");
        if (msg) {
          var urls = (msg.value.match(/https?:\/\//gi) || []).length
                   + (msg.value.match(/\[url=|\bhref=|\.ru\b|<a\s/gi) || []).length;
          if (urls >= 2) return "link-spam";
        }
        return null;
      }

      function setError(field, on) {
        var wrap = field.closest(".field");
        if (wrap) wrap.classList.toggle("has-error", on);
      }
      function validateField(field) {
        var val = (field.value || "").trim();
        var ok = true;
        if (field.hasAttribute("required") && !val) ok = false;
        if (ok && field.type === "email" && val) {
          ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        }
        if (ok && field.type === "tel" && val) {
          ok = val.replace(/[^0-9]/g, "").length >= 8;
        }
        setError(field, !ok);
        return ok;
      }

      // validate on blur
      form.querySelectorAll("input, select, textarea").forEach(function (f) {
        f.addEventListener("blur", function () {
          if (f.closest(".field").classList.contains("has-error") || f.hasAttribute("required")) {
            validateField(f);
          }
        });
        f.addEventListener("input", function () {
          if (f.closest(".field").classList.contains("has-error")) validateField(f);
        });
      });

      form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Spam gate — runs before anything else. Silently drop obvious bots:
        // show the normal success state so scripted submitters get no useful
        // feedback, but never treat it as a real lead.
        var spamReason = looksLikeSpam();
        if (spamReason) {
          if (window.console && console.warn) console.warn("Submission blocked:", spamReason);
          form.style.display = "none";
          if (successBox) successBox.classList.add("show");
          return;
        }

        var fields = form.querySelectorAll("[required]");
        var firstBad = null, allOk = true;
        fields.forEach(function (f) {
          var ok = validateField(f);
          if (!ok && !firstBad) firstBad = f;
          if (!ok) allOk = false;
        });
        if (!allOk) {
          if (firstBad) firstBad.focus();
          return;
        }
        var btn = form.querySelector("[type=submit]");
        var original = btn ? btn.innerHTML : "";
        if (btn) { btn.disabled = true; btn.innerHTML = "Sending…"; }
        if (errorBanner) errorBanner.classList.remove("show");

        // Real submit via Web3Forms (https://web3forms.com) — no backend required.
        var accessKey = form.getAttribute("data-web3forms-key");
        var payload = {
          access_key: accessKey,
          subject: (form.querySelector('[name="subject"]') || {}).value || "New booking request — Farrmill website",
          from_name: (form.querySelector('[name="from_name"]') || {}).value || "Farrmill website",
          botcheck: "" // Web3Forms' own honeypot: always blank for real users
        };
        ["first_name", "last_name", "phone", "email", "suburb", "service", "date", "time", "message"].forEach(function (name) {
          var el = form.querySelector('[name="' + name + '"]');
          if (el) payload[name] = el.value;
        });
        // Date inputs always submit YYYY-MM-DD; send it as DD/MM/YYYY for the email.
        var ymd = /^(\d{4})-(\d{2})-(\d{2})$/.exec(payload.date || "");
        if (ymd) payload.date = ymd[3] + "/" + ymd[2] + "/" + ymd[1];

        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload)
        })
          .then(function (res) { return res.json(); })
          .then(function (data) {
            if (!data || !data.success) throw new Error((data && data.message) || "Submission failed");
            if (successBox) {
              form.style.display = "none";
              successBox.classList.add("show");
              successBox.setAttribute("tabindex", "-1");
              successBox.focus();
              successBox.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
            } else {
              form.reset();
            }
          })
          .catch(function (err) {
            if (window.console && console.error) console.error("Booking form submission failed:", err);
            if (btn) { btn.disabled = false; btn.innerHTML = original; }
            if (errorBanner) {
              errorBanner.classList.add("show");
              errorBanner.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
            }
          });
      });
    }
  });
})();
