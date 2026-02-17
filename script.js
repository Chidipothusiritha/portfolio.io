console.log("✅ script.js loaded");

document.addEventListener("DOMContentLoaded", () => {
  // -----------------------------
  // Footer year
  // -----------------------------
  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

  // -----------------------------
  // Dark mode toggle (sets data-theme on <html>)
  // -----------------------------
  const toggleBtn = document.getElementById("themeToggle");
  const icon = document.getElementById("themeIcon"); // <-- use an id (more reliable)

  const applyTheme = (mode) => {
    if (mode === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      if (icon) icon.textContent = "☀️";
    } else {
      document.documentElement.removeAttribute("data-theme");
      if (icon) icon.textContent = "🌙";
    }
  };

  // Load saved theme
  const saved = localStorage.getItem("theme"); // "dark" | "light" | null
  applyTheme(saved === "dark" ? "dark" : "light");

  // Click toggle
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      const next = isDark ? "light" : "dark";
      localStorage.setItem("theme", next);
      applyTheme(next);
    });
  } else {
    console.warn("themeToggle not found. Add id='themeToggle' to the toggle button in index.html");
  }

  // -----------------------------
  // Rotating typing subtitle
  // -----------------------------
  const rotating = document.getElementById("rotating");

  if (rotating) {
    const phrases = [
      "Data Science @ Rutgers",
      "Data Analyst • Data Engineer • Data Scientist",
      "Python • SQL • Spark • Airflow",
      "RAG & Agentic AI Explorer",
      "Actively seeking roles"
    ];

    const TYPE_SPEED = 55;
    const DELETE_SPEED = 35;
    const HOLD_TIME = 1100;
    const GAP_TIME = 250;

    let i = 0;
    let j = 0;
    let deleting = false;

    function tick() {
      const word = phrases[i % phrases.length];

      if (!deleting) {
        rotating.classList.add("typing");
        rotating.textContent = word.slice(0, j++);
        if (j > word.length) {
          deleting = true;
          rotating.classList.remove("typing");
          return setTimeout(tick, HOLD_TIME);
        }
        return setTimeout(tick, TYPE_SPEED);
      } else {
        rotating.textContent = word.slice(0, j--);
        if (j < 0) {
          deleting = false;
          i++;
          return setTimeout(tick, GAP_TIME);
        }
        return setTimeout(tick, DELETE_SPEED);
      }
    }

    tick();
  }

  // -----------------------------
  // Nav active on click
  // -----------------------------
  document.querySelectorAll(".nav__link").forEach((a) => {
    a.addEventListener("click", () => {
      document.querySelectorAll(".nav__link").forEach((x) => x.classList.remove("active"));
      a.classList.add("active");
    });
  });
});