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
      "AI/ML Engineer",
      "Machine Learning Engineer",
      "Data Engineer",
      "Data Analyst",
      "NLP & LLM Builder",
      "RAG • MCP • Agentic AI",
      "Python • PyTorch • Spark • SQL",
      "MSDS @ Rutgers | Open to Roles"
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
  // Nav active on scroll (IntersectionObserver)
  // -----------------------------
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav__link");

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((a) => a.classList.remove("active"));
        const active = document.querySelector(`.nav__link[href="#${entry.target.id}"]`);
        if (active) active.classList.add("active");
      }
    });
  }, { rootMargin: "-50% 0px -50% 0px" });

  sections.forEach((s) => navObserver.observe(s));

  // Also update on click
  navLinks.forEach((a) => {
    a.addEventListener("click", () => {
      navLinks.forEach((x) => x.classList.remove("active"));
      a.classList.add("active");
    });
  });

  // -----------------------------
  // Scroll-reveal for cards
  // -----------------------------
  document.querySelectorAll(".card, .paper, .stat-cube").forEach((el) => {
    el.classList.add("reveal");
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  // -----------------------------
  // AI Chat Agent
  // -----------------------------
  const GROQ_API_KEY = "__GROQ_API_KEY__";

  const SYSTEM_PROMPT = `You are an AI assistant embedded in Siritha Chidipothu's portfolio website. Answer questions about Siritha concisely and professionally. Keep responses to 2-4 sentences unless more detail is needed.

ABOUT: Siritha Chidipothu is a Rutgers MSDS (Master of Data Science) student and AI/Data Science Research Assistant building ML models, NLP pipelines, LLM evaluation frameworks, and production data systems.

CURRENT ROLES:
- AI/ML Engineer Intern, Ascend Cargo Systems (May 2026–Present): Built a custom MCP server on Java Spring Boot exposing LLM-callable tools across web, Slack, and Teams. Built a two-LLM pipeline using a lightweight classifier to route queries into a GPT-4o tool loop, reducing prompt size and improving tool-calling accuracy.
- Data Engineer Assistant, National Transit Institute (May 2026–Present): Automated financial reports and working sheets, eliminating years of manual effort.

PAST EXPERIENCE:
- AI & Data Science Research Assistant, Rutgers (Feb 2025–Present): EDA on large text datasets, improved classifier F1, automated annotation pipelines.
- Data Science Intern, URZZA (Jan–Apr 2024): EV charging time-series anomaly detection, KPI dashboards.
- Data Analysis Intern, ADONMO (May–Jul 2023): Power BI reporting, regression + clustering for campaign analysis.

PROJECTS:
1. Quant Signal Platform (Jan 2026–Present): End-to-end long-short equity strategy on 30 S&P 500 stocks. Sharpe 0.82, 19.4% annualized return. PostgreSQL + Airflow + yfinance + SEC EDGAR.
2. FilingsQA (Jun 2026–Present): Evaluated RAG assistant over SEC 10-K/10-Q filings. EDGAR → pgvector → AWS Bedrock/OpenAI. Ragas + LLM-as-judge evaluation harness.
3. ML-Powered Fraud Monitoring: Isolation Forest anomaly detection + FastAPI backend.
4. Customer 360° Analytics Platform (Banking): ETL/ELT pipeline, star schema, PostgreSQL warehouse.
5. NLP Text Classifier & LLM Evaluation: Few-shot vs zero-shot on Reddit data; FEEG framework for LLM cognitive-level evaluation using Bloom's Taxonomy.

SKILLS: PyTorch, TensorFlow, Scikit-learn, XGBoost, HuggingFace Transformers, Fine-tuning/LoRA, OpenAI API/GPT-4o, LangChain, RAG, MCP, Tool Calling, Multi-agent Orchestration, PySpark, Apache Spark, Airflow, dbt, Kafka, Databricks, Snowflake, PostgreSQL, MySQL, MongoDB, FastAPI, Azure, AWS, Docker, Power BI, Tableau, Python, SQL, Java/Spring Boot.

RESEARCH:
- Published dataset on Harvard Dataverse: Global AI News Headlines Corpus
- Paper under review at Data & Policy Journal (Cambridge University Press): "AI Narratives Across Global Media"
- Published paper (Sep 2025): "Societal Impacts and Public Perception of Chatbots"
- Conference paper at NEDSI: "Adaptive Few-Shot Learning versus Hyper-AFSL"
- Research Poster: "FEEG: Bloom's Taxonomy-Based Query Classification Framework"

EDUCATION: MS in Data Science, Rutgers University (in progress)
SEEKING: AI/ML Engineer, Machine Learning Engineer, Data Engineer, Data Analyst, Data Scientist roles
CONTACT: siritha.chidipothu@rutgers.edu | New Brunswick, NJ | LinkedIn: linkedin.com/in/siritha-chidipothu-b90999216 | GitHub: github.com/Chidipothusiritha

If asked something not covered here, say you don't have that detail and suggest reaching out via email.`;

  const chatFab    = document.getElementById("chatFab");
  const chatPanel  = document.getElementById("chatPanel");
  const chatClose  = document.getElementById("chatClose");
  const chatInput  = document.getElementById("chatInput");
  const chatSend   = document.getElementById("chatSend");
  const chatMsgs   = document.getElementById("chatMessages");

  const history = [{ role: "system", content: SYSTEM_PROMPT }];

  function toggleChat() {
    chatPanel.classList.toggle("open");
    if (chatPanel.classList.contains("open")) chatInput.focus();
  }

  chatFab.addEventListener("click", toggleChat);
  chatClose.addEventListener("click", toggleChat);

  function appendMsg(role, text) {
    const div = document.createElement("div");
    div.className = `chat-msg chat-msg--${role === "user" ? "user" : "ai"}`;
    const p = document.createElement("p");
    p.textContent = text;
    div.appendChild(p);
    chatMsgs.appendChild(div);
    chatMsgs.scrollTop = chatMsgs.scrollHeight;
    return div;
  }

  function showTyping() {
    const div = document.createElement("div");
    div.className = "chat-msg chat-msg--ai chat-typing";
    div.innerHTML = "<p>Thinking…</p>";
    chatMsgs.appendChild(div);
    chatMsgs.scrollTop = chatMsgs.scrollHeight;
    return div;
  }

  async function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    chatInput.value = "";
    chatSend.disabled = true;

    appendMsg("user", text);
    history.push({ role: "user", content: text });

    const typing = showTyping();

    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "llama-3.1-70b-versatile",
          messages: history,
          max_tokens: 300,
          temperature: 0.7
        })
      });

      const data = await res.json();
      typing.remove();

      if (data.choices && data.choices[0]) {
        const reply = data.choices[0].message.content;
        history.push({ role: "assistant", content: reply });
        appendMsg("ai", reply);
      } else {
        appendMsg("ai", "Sorry, something went wrong. Please try again.");
      }
    } catch {
      typing.remove();
      appendMsg("ai", "Couldn't connect right now. Please try again shortly.");
    }

    chatSend.disabled = false;
    chatInput.focus();
  }

  chatSend.addEventListener("click", sendMessage);
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  // -----------------------------
  // Animated stat counters
  // -----------------------------
  const statEls = document.querySelectorAll(".stat__n[data-target]");

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      let current = 0;
      const step = Math.ceil(target / 30);
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current;
        if (current >= target) clearInterval(timer);
      }, 40);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  statEls.forEach((el) => counterObserver.observe(el));
});