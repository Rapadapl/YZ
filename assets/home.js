/* Language toggle for the library and sheet pages. Every translatable element carries
   data-en / data-ru; the choice is remembered and passed to the books. */

(function () {
  "use strict";

  const STORE_KEY = "yze-lang";
  const buttons = Array.from(document.querySelectorAll("[data-set-lang]"));
  const translatable = Array.from(document.querySelectorAll("[data-en]"));

  const zhText = (node) => {
    const direct = node.getAttribute("data-zh");
    if (direct !== null) return direct;
    const dictionary = window.YZE_ZH || {};
    const key = node.getAttribute("data-en") || "";
    return Object.prototype.hasOwnProperty.call(dictionary, key) ? dictionary[key] : null;
  };

  const read = () => {
    const asked = new URLSearchParams(window.location.search).get("lang");
    if (asked === "en" || asked === "ru" || asked === "zh") return asked;
    try {
      const saved = localStorage.getItem(STORE_KEY);
      if (saved === "en" || saved === "ru" || saved === "zh") return saved;
    } catch (error) {
      /* storage may be blocked; fall back to the browser language */
    }
    const tag = (navigator.language || "en").toLowerCase();
    if (tag.startsWith("ru")) return "ru";
    if (tag.startsWith("zh")) return "zh";
    return "en";
  };

  const apply = (lang) => {
    document.documentElement.lang = lang;

    translatable.forEach((node) => {
      const value = node.getAttribute(`data-${lang}`) ?? (lang === "zh" ? zhText(node) : null);
      if (value !== null) node.textContent = value;
    });

    document.querySelectorAll("[data-href-en][data-href-ru]").forEach((link) => {
      const href = link.getAttribute(`data-href-${lang}`);
      if (href) link.setAttribute("href", href);
    });

    buttons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.setLang === lang));
    });
  };

  const choose = (lang) => {
    apply(lang);
    try {
      localStorage.setItem(STORE_KEY, lang);
    } catch (error) {
      /* the page still switches, it just will not be remembered */
    }
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => choose(button.dataset.setLang));
  });

  apply(read());
})();
