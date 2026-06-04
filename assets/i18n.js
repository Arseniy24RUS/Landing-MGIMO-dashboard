(function () {
  "use strict";

  const LANGUAGES = ["ru", "en"];
  const STORAGE_KEY = "lang";
  const SOURCE_LANGUAGE = "ru";
  const ATTRIBUTES = ["alt", "aria-label", "placeholder", "title", "content", "data-search"];
  const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEMPLATE"]);
  const sourceText = new WeakMap();
  const sourceAttributes = new WeakMap();
  const dictionaries = {};
  const fallbackUi = {
    ru: {
      widgetsFound: "\u041d\u0430\u0439\u0434\u0435\u043d\u043e \u0432\u0438\u0434\u0436\u0435\u0442\u043e\u0432: {visible} \u0438\u0437 {total}.",
      tasksFound: "\u041d\u0430\u0439\u0434\u0435\u043d\u043e \u0437\u0430\u0434\u0430\u043d\u0438\u0439: {visible} \u0438\u0437 {total}.",
      toggleLabel: "\u041f\u0435\u0440\u0435\u043a\u043b\u044e\u0447\u0438\u0442\u044c \u044f\u0437\u044b\u043a"
    },
    en: {
      widgetsFound: "Widgets found: {visible} of {total}.",
      tasksFound: "Assignments found: {visible} of {total}.",
      toggleLabel: "Switch language"
    }
  };

  let currentLanguage = pickInitialLanguage();

  function normalize(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function sanitizeLanguage(language) {
    return LANGUAGES.includes(language) ? language : SOURCE_LANGUAGE;
  }

  function getStoredLanguage() {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      return LANGUAGES.includes(stored) ? stored : "";
    } catch (error) {
      return "";
    }
  }

  function pickInitialLanguage() {
    const stored = getStoredLanguage();
    if (stored) return stored;

    const browserLanguages = Array.isArray(navigator.languages) && navigator.languages.length
      ? navigator.languages
      : [navigator.language || ""];
    return browserLanguages.some((language) => String(language).toLowerCase().includes("ru"))
      ? "ru"
      : "en";
  }

  async function loadLanguage(language) {
    const nextLanguage = sanitizeLanguage(language);
    if (dictionaries[nextLanguage]) return dictionaries[nextLanguage];

    const response = await fetch(`locales/${nextLanguage}.json`, { cache: "no-cache" });
    if (!response.ok) {
      throw new Error(`Unable to load locale: ${nextLanguage}`);
    }
    dictionaries[nextLanguage] = await response.json();
    return dictionaries[nextLanguage];
  }

  function interpolate(value, params) {
    if (!params) return value;
    return value.replace(/\{(\w+)\}/g, (match, key) => (
      Object.prototype.hasOwnProperty.call(params, key) ? String(params[key]) : match
    ));
  }

  function t(key, params) {
    const dictionary = dictionaries[currentLanguage];
    const value = (dictionary && dictionary.ui && dictionary.ui[key])
      || (dictionary && dictionary.strings && dictionary.strings[key])
      || (fallbackUi[currentLanguage] && fallbackUi[currentLanguage][key])
      || key;
    return interpolate(value, params);
  }

  function translateSource(source, dictionary) {
    const key = normalize(source);
    if (!key) return source;
    return (dictionary.strings && dictionary.strings[key]) || key;
  }

  function translateTextNode(node, dictionary) {
    if (!sourceText.has(node)) {
      sourceText.set(node, node.nodeValue);
    }

    const original = sourceText.get(node);
    const match = /^(\s*)([\s\S]*?)(\s*)$/.exec(original);
    const core = match ? match[2] : original;
    if (!normalize(core)) return;

    node.nodeValue = `${match ? match[1] : ""}${translateSource(core, dictionary)}${match ? match[3] : ""}`;
  }

  function translateAttributes(element, dictionary) {
    let originals = sourceAttributes.get(element);
    if (!originals) {
      originals = {};
      sourceAttributes.set(element, originals);
    }

    ATTRIBUTES.forEach((attribute) => {
      if (!element.hasAttribute(attribute)) return;
      if (!Object.prototype.hasOwnProperty.call(originals, attribute)) {
        originals[attribute] = normalize(element.getAttribute(attribute));
      }
      const original = originals[attribute];
      if (!original) return;
      element.setAttribute(attribute, translateSource(original, dictionary));
    });
  }

  function translateDom(dictionary) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || SKIP_TAGS.has(parent.tagName)) return NodeFilter.FILTER_REJECT;
        return normalize(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });

    const textNodes = [];
    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }
    textNodes.forEach((node) => translateTextNode(node, dictionary));
    document.body.querySelectorAll("*").forEach((element) => translateAttributes(element, dictionary));
  }

  function applyMetadata(dictionary) {
    const meta = dictionary.meta || {};
    document.documentElement.lang = currentLanguage;
    if (meta.title) document.title = meta.title;

    [
      ['meta[name="description"]', meta.description],
      ['meta[property="og:title"]', meta.title],
      ['meta[property="og:description"]', meta.description],
      ['meta[name="twitter:title"]', meta.title],
      ['meta[name="twitter:description"]', meta.description]
    ].forEach(([selector, value]) => {
      const element = document.querySelector(selector);
      if (element && value) element.setAttribute("content", value);
    });
  }

  function updateToggle(dictionary) {
    const button = document.querySelector('[data-testid="language-toggle"]');
    if (!button) return;
    button.textContent = currentLanguage === "ru" ? "EN" : "RU";
    const label = (dictionary.ui && dictionary.ui.toggleLabel)
      || (fallbackUi[currentLanguage] && fallbackUi[currentLanguage].toggleLabel)
      || "Switch language";
    button.setAttribute("aria-label", label);
    button.setAttribute("title", label);
  }

  async function apply(language) {
    currentLanguage = sanitizeLanguage(language || currentLanguage);
    const dictionary = await loadLanguage(currentLanguage);
    applyMetadata(dictionary);
    translateDom(dictionary);
    updateToggle(dictionary);

    if (typeof window.updateCounters === "function") {
      window.updateCounters();
    }

    window.dispatchEvent(new CustomEvent("app:i18n", {
      detail: { language: currentLanguage }
    }));
    return currentLanguage;
  }

  async function setLanguage(language) {
    currentLanguage = sanitizeLanguage(language);
    try {
      window.localStorage.setItem(STORAGE_KEY, currentLanguage);
    } catch (error) {
      // Local storage can be unavailable in private or embedded contexts.
    }
    return apply(currentLanguage);
  }

  function getLanguage() {
    return currentLanguage;
  }

  function toggleLanguage() {
    return setLanguage(currentLanguage === "ru" ? "en" : "ru");
  }

  function onReady(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback, { once: true });
    } else {
      callback();
    }
  }

  const ready = new Promise((resolve) => {
    onReady(() => {
      apply(currentLanguage).then(resolve).catch(() => resolve(currentLanguage));
      document.addEventListener("click", (event) => {
        const button = event.target.closest('[data-testid="language-toggle"]');
        if (!button) return;
        toggleLanguage();
      });
    });
  });

  window.AppI18n = {
    t,
    getLanguage,
    setLanguage,
    toggleLanguage,
    apply,
    ready
  };
}());
