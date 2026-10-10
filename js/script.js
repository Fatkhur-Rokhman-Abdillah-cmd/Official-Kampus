/* =========================================================
   POLITEKNIK NEGERI CILACAP — SCRIPT
   Satu file JavaScript untuk seluruh halaman
   ========================================================= */

(function () {
  "use strict";

  /* ---------- 1. DARK MODE ---------- */
  const THEME_KEY = "pnc-theme";
  const body = document.body;
  const themeToggle = document.getElementById("themeToggle");

  function applyTheme(theme) {
    if (theme === "dark") {
      body.classList.add("dark");
    } else {
      body.classList.remove("dark");
    }
  }

  // Terapkan tema tersimpan atau preferensi sistem
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    applyTheme("dark");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const isDark = body.classList.toggle("dark");
      localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
    });
  }

  /* ---------- 2. MOBILE MENU ---------- */
  const menuToggle = document.getElementById("menuToggle");
  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      const open = body.classList.toggle("menu-open");
      menuToggle.setAttribute("aria-expanded", String(open));
    });

    // Tutup menu saat link diklik
    document.querySelectorAll(".navbar__link, .navbar__cta").forEach(function (link) {
      link.addEventListener("click", function () {
        body.classList.remove("menu-open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- 3. NAVBAR SCROLL EFFECT ---------- */
  const navbar = document.getElementById("navbar");
  function onScroll() {
    if (!navbar) return;
    if (window.scrollY > 12) {
      navbar.classList.add("is-scrolled");
    } else {
      navbar.classList.remove("is-scrolled");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- 4. ACTIVE NAV LINK ---------- */
  (function highlightActiveLink() {
    const path = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".navbar__link").forEach(function (link) {
      const href = link.getAttribute("href");
      if (href === path) {
        link.classList.add("is-active");
        link.setAttribute("aria-current", "page");
      }
    });
  })();

  /* ---------- 5. BACK TO TOP ---------- */
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 420) {
        backToTop.classList.add("is-visible");
      } else {
        backToTop.classList.remove("is-visible");
      }
    }, { passive: true });

    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- 6. CURRENT YEAR ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- 7. SCROLL REVEAL ---------- */
  (function scrollReveal() {
    const elements = document.querySelectorAll("[data-reveal]");
    if (!elements.length) return;

    if (!("IntersectionObserver" in window)) {
      elements.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    elements.forEach(function (el) { observer.observe(el); });
  })();

  /* ---------- 8. COUNTER ANIMATION ---------- */
  (function animateCounters() {
    const counters = document.querySelectorAll("[data-counter]");
    if (!counters.length) return;

    function animate(el) {
      const target = parseInt(el.getAttribute("data-counter"), 10) || 0;
      const suffix = el.getAttribute("data-suffix") || "";
      const duration = 1600;
      const start = performance.now();

      function frame(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.floor(eased * target);
        el.textContent = value.toLocaleString("id-ID") + suffix;
        if (progress < 1) requestAnimationFrame(frame);
        else el.textContent = target.toLocaleString("id-ID") + suffix;
      }
      requestAnimationFrame(frame);
    }

    if (!("IntersectionObserver" in window)) {
      counters.forEach(animate);
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    counters.forEach(function (el) { observer.observe(el); });
  })();

  /* ---------- 9. KEGIATAN FILTER ---------- */
  (function kegiatanFilter() {
    const buttons = document.querySelectorAll(".filter__btn");
    const cards = document.querySelectorAll("#kegiatanGrid [data-category]");
    const emptyState = document.getElementById("emptyState");
    if (!buttons.length || !cards.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) { b.classList.remove("is-active"); });
        btn.classList.add("is-active");

        const filter = btn.getAttribute("data-filter");
        let visibleCount = 0;

        cards.forEach(function (card) {
          const category = card.getAttribute("data-category");
          const show = filter === "all" || category === filter;
          card.style.display = show ? "" : "none";
          if (show) visibleCount += 1;
        });

        if (emptyState) emptyState.hidden = visibleCount > 0;
      });
    });
  })();

  /* ---------- 10. FORM VALIDATION ---------- */
  (function contactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    const statusEl = document.getElementById("formStatus");
    const submitBtn = document.getElementById("submitBtn");

    const fields = {
      nama: {
        el: document.getElementById("nama"),
        validate: function (v) {
          if (!v.trim()) return "Nama wajib diisi.";
          if (v.trim().length < 3) return "Nama minimal 3 karakter.";
          return "";
        }
      },
      email: {
        el: document.getElementById("email"),
        validate: function (v) {
          if (!v.trim()) return "Email wajib diisi.";
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())) return "Format email tidak valid.";
          return "";
        }
      },
      subjek: {
        el: document.getElementById("subjek"),
        validate: function (v) {
          if (!v.trim()) return "Subjek wajib diisi.";
          return "";
        }
      },
      pesan: {
        el: document.getElementById("pesan"),
        validate: function (v) {
          if (!v.trim()) return "Pesan wajib diisi.";
          if (v.trim().length < 10) return "Pesan minimal 10 karakter.";
          return "";
        }
      }
    };

    function setError(name, message) {
      const group = fields[name].el.closest(".form__group");
      const errorEl = group.querySelector("[data-error-for='" + name + "']");
      if (message) {
        group.classList.add("has-error");
        errorEl.textContent = message;
      } else {
        group.classList.remove("has-error");
        errorEl.textContent = "";
      }
    }

    // Validasi realtime saat blur
    Object.keys(fields).forEach(function (name) {
      const field = fields[name];
      if (!field.el) return;
      field.el.addEventListener("blur", function () {
        setError(name, field.validate(field.el.value));
      });
      field.el.addEventListener("input", function () {
        const group = field.el.closest(".form__group");
        if (group.classList.contains("has-error")) {
          setError(name, field.validate(field.el.value));
        }
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      let valid = true;
      Object.keys(fields).forEach(function (name) {
        const field = fields[name];
        const message = field.validate(field.el.value);
        setError(name, message);
        if (message) valid = false;
      });

      if (!valid) {
        statusEl.textContent = "Mohon periksa kembali data yang Anda isi.";
        statusEl.className = "form__status is-error";
        return;
      }

      // Simulasi pengiriman
      const namaValue = fields.nama.el.value.trim();
      submitBtn.disabled = true;
      submitBtn.textContent = "Mengirim...";
      statusEl.textContent = "";
      statusEl.className = "form__status";

      setTimeout(function () {
        statusEl.textContent = "Terima kasih, " + namaValue + ". Pesan Anda telah kami terima.";
        statusEl.className = "form__status is-success";
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Kirim Pesan' +
          '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>';
        setTimeout(function () {
          statusEl.textContent = "";
          statusEl.className = "form__status";
        }, 6000);
      }, 900);
    });
  })();

})();