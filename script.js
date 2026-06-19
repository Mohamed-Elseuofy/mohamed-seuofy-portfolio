(function () {
  "use strict";

  /*
    Owner Edit Password:
    Default password is below. Change it before publishing if needed.

    Important:
    This is a static GitHub Pages website. A password inside JavaScript is not
    real server security. It is only a convenient owner-only editing interface.
  */
  const OWNER_PASSWORD = "Seuofy@2026!";

  const STORAGE_KEY = "mohamed-seuofy-portfolio-data-v1";

  const defaultData = {
    profile: {
      image: "assets/profile.jpg"
    },
    cv: {
      url: "assets/CV.pdf"
    },
    certificatesPack: {
      url: "certificates/certificates.pdf"
    },
    tools: {
      iso14064: {
        image: "projects/iso14064-platform.jpg",
        link: "https://mohamed-elseuofy.github.io/ISO14064-ABD-ELSALM3/"
      },
      personalCarbon: {
        image: "projects/personal-carbon-calculator.jpg",
        link: "[ADD PERSONAL CARBON FOOTPRINT LINK HERE]"
      }
    },
    videos: {
      video1: {
        title: "ISO 50001 Energy Management Training",
        description: "Professional training on energy management systems, KPIs, baselines, and implementation.",
        link: "[ADD VIDEO LINK HERE]"
      },
      video2: {
        title: "Carbon Footprint and ISO 14064",
        description: "Training content on emissions, GHG inventory, activity data, factors, and reporting.",
        link: "[ADD VIDEO LINK HERE]"
      },
      video3: {
        title: "Hydrogen Utilization and Liquefaction",
        description: "Lecture content on hydrogen production, storage, utilization, transportation, and liquefaction.",
        link: "[ADD VIDEO LINK HERE]"
      }
    },
    links: {
      linkedin: "https://www.linkedin.com/in/mohamed-seuofy-994339a5/",
      googleScholar: "[ADD GOOGLE SCHOLAR LINK HERE]",
      researchGate: "[ADD RESEARCHGATE LINK HERE]",
      youtube: "[ADD YOUTUBE LINK HERE]",
      github: "[ADD GITHUB LINK HERE]"
    }
  };

  const editableFields = [
    {
      key: "profile.image",
      label: "Item 1 — Profile image path / URL",
      help: "Example: assets/profile.jpg or paste an online image URL.",
      type: "text"
    },
    {
      key: "profile.image",
      label: "Preview upload profile image",
      help: "This previews locally. To publish for everyone, upload the image to assets/ and export/update site-data.json.",
      type: "file",
      accept: "image/*"
    },
    {
      key: "cv.url",
      label: "Item 2 — CV PDF path / URL",
      help: "Example: assets/CV.pdf",
      type: "text"
    },
    {
      key: "cv.url",
      label: "Preview upload CV PDF",
      help: "Large PDFs may not save locally. Best public method: upload PDF to assets/CV.pdf.",
      type: "file",
      accept: "application/pdf"
    },
    {
      key: "certificatesPack.url",
      label: "Item 3 — Certificates PDF path / URL",
      help: "Example: certificates/certificates.pdf",
      type: "text"
    },
    {
      key: "certificatesPack.url",
      label: "Preview upload certificates PDF",
      help: "For public download, upload your certificates PDF to certificates/certificates.pdf.",
      type: "file",
      accept: "application/pdf"
    },
    {
      key: "tools.iso14064.image",
      label: "Item 4 — ISO 14064 platform image path / URL",
      help: "Example: projects/iso14064-platform.jpg",
      type: "text"
    },
    {
      key: "tools.iso14064.image",
      label: "Preview upload ISO 14064 platform image",
      help: "This previews locally. Public method: upload image then export site-data.json.",
      type: "file",
      accept: "image/*"
    },
    {
      key: "tools.iso14064.link",
      label: "Item 5 — ISO 14064 platform link",
      help: "Paste the platform link here.",
      type: "url"
    },
    {
      key: "tools.personalCarbon.link",
      label: "Item 6 — Personal carbon footprint calculator link",
      help: "Paste the personal carbon calculator link here.",
      type: "url"
    },
    {
      key: "tools.personalCarbon.image",
      label: "Personal carbon calculator image path / URL",
      help: "Example: projects/personal-carbon-calculator.jpg",
      type: "text"
    },
    {
      key: "videos.video1.title",
      label: "VIP Video 1 title",
      help: "Example: ISO 50001 Energy Management Training",
      type: "text"
    },
    {
      key: "videos.video1.description",
      label: "VIP Video 1 description",
      help: "Short professional description.",
      type: "textarea"
    },
    {
      key: "videos.video1.link",
      label: "VIP Video 1 link",
      help: "Paste YouTube, webinar, or course link.",
      type: "url"
    },
    {
      key: "videos.video2.title",
      label: "VIP Video 2 title",
      help: "Example: Carbon Footprint and ISO 14064",
      type: "text"
    },
    {
      key: "videos.video2.description",
      label: "VIP Video 2 description",
      help: "Short professional description.",
      type: "textarea"
    },
    {
      key: "videos.video2.link",
      label: "VIP Video 2 link",
      help: "Paste YouTube, webinar, or course link.",
      type: "url"
    },
    {
      key: "videos.video3.title",
      label: "VIP Video 3 title",
      help: "Example: Hydrogen Utilization and Liquefaction",
      type: "text"
    },
    {
      key: "videos.video3.description",
      label: "VIP Video 3 description",
      help: "Short professional description.",
      type: "textarea"
    },
    {
      key: "videos.video3.link",
      label: "VIP Video 3 link",
      help: "Paste YouTube, webinar, or course link.",
      type: "url"
    },
    {
      key: "links.linkedin",
      label: "LinkedIn link",
      help: "Paste your LinkedIn profile link.",
      type: "url"
    },
    {
      key: "links.googleScholar",
      label: "Google Scholar link",
      help: "Paste your Google Scholar profile link.",
      type: "url"
    },
    {
      key: "links.researchGate",
      label: "ResearchGate link",
      help: "Paste your ResearchGate profile link.",
      type: "url"
    },
    {
      key: "links.youtube",
      label: "YouTube / video channel link",
      help: "Paste your YouTube or video channel link.",
      type: "url"
    },
    {
      key: "links.github",
      label: "GitHub link",
      help: "Paste your GitHub profile or project link.",
      type: "url"
    }
  ];

  let siteData = structuredCloneSafe(defaultData);

  function structuredCloneSafe(value) {
    if (typeof structuredClone === "function") {
      return structuredClone(value);
    }

    return JSON.parse(JSON.stringify(value));
  }

  function isObject(value) {
    return value !== null && typeof value === "object" && !Array.isArray(value);
  }

  function deepMerge(target, source) {
    const output = structuredCloneSafe(target);

    if (!isObject(source)) {
      return output;
    }

    Object.keys(source).forEach((key) => {
      if (isObject(source[key]) && isObject(output[key])) {
        output[key] = deepMerge(output[key], source[key]);
      } else {
        output[key] = source[key];
      }
    });

    return output;
  }

  function getByPath(object, path) {
    return path.split(".").reduce((current, key) => {
      if (current && Object.prototype.hasOwnProperty.call(current, key)) {
        return current[key];
      }

      return "";
    }, object);
  }

  function setByPath(object, path, value) {
    const keys = path.split(".");
    const lastKey = keys.pop();

    let current = object;

    keys.forEach((key) => {
      if (!isObject(current[key])) {
        current[key] = {};
      }

      current = current[key];
    });

    current[lastKey] = value;
  }

  async function loadSiteData() {
    let data = structuredCloneSafe(defaultData);

    try {
      const response = await fetch("site-data.json", { cache: "no-store" });

      if (response.ok) {
        const json = await response.json();
        data = deepMerge(data, json);
      }
    } catch (error) {
      // site-data.json may not load when opening index.html directly from file system.
    }

    try {
      const localData = localStorage.getItem(STORAGE_KEY);

      if (localData) {
        data = deepMerge(data, JSON.parse(localData));
      }
    } catch (error) {
      console.warn("Local saved data could not be loaded.", error);
    }

    siteData = data;
    applySiteData(siteData);
  }

  function applySiteData(data) {
    document.querySelectorAll("[data-text]").forEach((element) => {
      const value = getByPath(data, element.dataset.text);

      if (value) {
        element.textContent = value;
      }
    });

    document.querySelectorAll("[data-href]").forEach((element) => {
      const value = getByPath(data, element.dataset.href);

      if (value) {
        element.setAttribute("href", value);
      }
    });

    document.querySelectorAll("[data-src]").forEach((element) => {
      const value = getByPath(data, element.dataset.src);

      if (value) {
        element.setAttribute("src", value);
      }
    });

    handleImageFallbacks();
  }

  function handleImageFallbacks() {
    document.querySelectorAll("img").forEach((image) => {
      image.addEventListener("error", () => {
        image.classList.add("is-missing");
      });

      image.addEventListener("load", () => {
        image.classList.remove("is-missing");
      });

      if (image.complete && image.naturalWidth === 0) {
        image.classList.add("is-missing");
      }
    });
  }

  function initNavigation() {
    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector(".nav-links");
    const links = document.querySelectorAll(".nav-links a");

    if (!navToggle || !navLinks) {
      return;
    }

    function closeMenu() {
      navLinks.classList.remove("show");
      navToggle.setAttribute("aria-expanded", "false");
    }

    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("show");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    links.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  }

  function initActiveLinks() {
    const sections = document.querySelectorAll("main section[id]");
    const links = document.querySelectorAll(".nav-links a[href^='#']");

    if (!sections.length || !links.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          links.forEach((link) => link.classList.remove("active"));

          const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);

          if (activeLink) {
            activeLink.classList.add("active");
          }
        });
      },
      {
        threshold: 0.24,
        rootMargin: "-18% 0px -62% 0px"
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  function initRevealAnimations() {
    const revealElements = document.querySelectorAll(".reveal");

    if (!revealElements.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    revealElements.forEach((element) => observer.observe(element));
  }

  function createAdminField(field) {
    const wrapper = document.createElement("div");
    wrapper.className = field.type === "textarea" ? "admin-field full" : "admin-field";

    const label = document.createElement("label");
    label.textContent = field.label;

    const help = document.createElement("small");
    help.textContent = field.help;

    let input;

    if (field.type === "textarea") {
      input = document.createElement("textarea");
      input.rows = 4;
      input.value = getByPath(siteData, field.key) || "";
    } else {
      input = document.createElement("input");
      input.type = field.type === "file" ? "file" : field.type;
      input.value = field.type === "file" ? "" : getByPath(siteData, field.key) || "";

      if (field.accept) {
        input.accept = field.accept;
      }
    }

    input.dataset.key = field.key;
    input.dataset.fieldType = field.type;

    if (field.type === "file") {
      input.addEventListener("change", () => {
        const file = input.files && input.files[0];

        if (!file) {
          return;
        }

        const reader = new FileReader();

        reader.addEventListener("load", () => {
          setByPath(siteData, field.key, reader.result);
          applySiteData(siteData);
          const status = document.getElementById("adminEditorStatus");
          status.textContent = "Preview loaded. Save locally or export site-data.json.";
        });

        reader.addEventListener("error", () => {
          const status = document.getElementById("adminEditorStatus");
          status.textContent = "File could not be read. Try using a path like assets/profile.jpg.";
        });

        reader.readAsDataURL(file);
      });
    }

    wrapper.append(label, input, help);
    return wrapper;
  }

  function buildAdminFields() {
    const adminFields = document.getElementById("adminFields");

    if (!adminFields) {
      return;
    }

    adminFields.innerHTML = "";

    editableFields.forEach((field) => {
      adminFields.appendChild(createAdminField(field));
    });
  }

  function openAdminModal() {
    const modal = document.getElementById("adminModal");
    const passwordInput = document.getElementById("adminPassword");

    if (!modal) {
      return;
    }

    modal.hidden = false;

    requestAnimationFrame(() => {
      if (passwordInput) {
        passwordInput.focus();
      }
    });
  }

  function closeAdminModal() {
    const modal = document.getElementById("adminModal");

    if (modal) {
      modal.hidden = true;
    }
  }

  function initAdminPanel() {
    const ownerButton = document.getElementById("ownerEditButton");
    const loginForm = document.getElementById("adminLogin");
    const editorForm = document.getElementById("adminEditor");
    const loginStatus = document.getElementById("adminLoginStatus");
    const editorStatus = document.getElementById("adminEditorStatus");
    const exportButton = document.getElementById("exportDataButton");
    const resetButton = document.getElementById("resetDataButton");

    if (!ownerButton || !loginForm || !editorForm) {
      return;
    }

    ownerButton.addEventListener("click", openAdminModal);

    document.querySelectorAll("[data-close-admin]").forEach((button) => {
      button.addEventListener("click", closeAdminModal);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeAdminModal();
      }
    });

    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const passwordInput = document.getElementById("adminPassword");
      const enteredPassword = passwordInput ? passwordInput.value : "";

      if (enteredPassword !== OWNER_PASSWORD) {
        loginStatus.textContent = "Incorrect password.";
        return;
      }

      loginStatus.textContent = "";
      loginForm.hidden = true;
      editorForm.hidden = false;
      buildAdminFields();
    });

    editorForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const inputs = editorForm.querySelectorAll("[data-key]");

      inputs.forEach((input) => {
        if (input.dataset.fieldType === "file") {
          return;
        }

        setByPath(siteData, input.dataset.key, input.value.trim());
      });

      applySiteData(siteData);

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(siteData));
        editorStatus.textContent = "Saved locally in this browser. Export site-data.json to publish changes.";
      } catch (error) {
        editorStatus.textContent = "Could not save locally. File may be too large. Use normal file paths and export JSON.";
      }
    });

    exportButton.addEventListener("click", () => {
      const inputs = editorForm.querySelectorAll("[data-key]");

      inputs.forEach((input) => {
        if (input.dataset.fieldType === "file") {
          return;
        }

        setByPath(siteData, input.dataset.key, input.value.trim());
      });

      const json = JSON.stringify(siteData, null, 2);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = "site-data.json";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();

      URL.revokeObjectURL(url);
      editorStatus.textContent = "Exported site-data.json. Upload it to your GitHub repository root.";
    });

    resetButton.addEventListener("click", () => {
      localStorage.removeItem(STORAGE_KEY);
      siteData = structuredCloneSafe(defaultData);
      applySiteData(siteData);
      buildAdminFields();
      editorStatus.textContent = "Local changes reset. Reload the page to load site-data.json again.";
    });
  }

  function secureExternalLinks() {
    document.querySelectorAll('a[target="_blank"]').forEach((link) => {
      const rel = link.getAttribute("rel") || "";
      const tokens = new Set(rel.split(" ").filter(Boolean));

      tokens.add("noopener");
      tokens.add("noreferrer");

      link.setAttribute("rel", Array.from(tokens).join(" "));
    });
  }

  function init() {
    initNavigation();
    initActiveLinks();
    initRevealAnimations();
    initAdminPanel();
    secureExternalLinks();
    loadSiteData();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
