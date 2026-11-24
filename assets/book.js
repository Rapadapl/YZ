/* Shared behaviour for the Root & Claw books:
   contents built from headings, reading progress, in-book search,
   mobile drawer, language hand-off and chapter paging. */

(function () {
  "use strict";

  const str = window.YZE_STR;
  const lang = window.YZE_LANG;
  const main = document.querySelector("main");
  if (!main) return;

  /* ---------- strings --------------------------------------------------- */

  const setText = (selector, value) => {
    document.querySelectorAll(selector).forEach((node) => {
      if (typeof value === "function") value(node);
      else node.textContent = value;
    });
  };

  setText("[data-str]", (node) => {
    const key = node.dataset.str;
    node.textContent = str(key);
  });
  setText("[data-str-aria]", (node) => {
    node.setAttribute("aria-label", str(node.dataset.strAria));
  });
  setText("[data-str-placeholder]", (node) => {
    node.setAttribute("placeholder", str(node.dataset.strPlaceholder));
  });
  setText("[data-str-title]", (node) => {
    node.setAttribute("title", str(node.dataset.strTitle));
  });

  const skip = document.querySelector(".skip-link");
  if (skip) skip.textContent = str("skip");

  /* ---------- contents -------------------------------------------------- */

  const rail = document.querySelector(".rail");
  const toc = document.getElementById("toc");
  const chapters = Array.from(main.querySelectorAll(".chapter"));
  const progress = document.querySelector(".progress");

  const entries = chapters
    .map((chapter) => {
      const heading = chapter.querySelector("h2");
      if (!heading || !heading.id) return null;
      const label = heading.textContent.replace(/#\s*$/, "").trim();
      const num = chapter.querySelector(".chapter__num");
      return {
        id: heading.id,
        label,
        num: num ? num.textContent.trim().padStart(2, "0") : "",
        link: null,
        item: null
      };
    })
    .filter(Boolean);

  if (toc) {
    const frag = document.createDocumentFragment();
    entries.forEach((entry) => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = `#${entry.id}`;
      const num = document.createElement("span");
      num.className = "num";
      num.textContent = entry.num;
      const label = document.createElement("span");
      label.textContent = entry.label;
      link.append(num, label);
      item.append(link);
      frag.append(item);
      entry.link = link;
      entry.item = item;
      link.dataset.search = `${entry.label} ${entry.id}`.toLowerCase();
    });
    toc.append(frag);
  }

  /* heading anchors: clicking a heading gives a copyable link */
  main.querySelectorAll(".chapter h2").forEach((heading) => {
    if (!heading.id) return;
    const label = heading.textContent.trim();
    const link = document.createElement("a");
    link.className = "anchor";
    link.href = `#${heading.id}`;
    link.textContent = label;
    heading.textContent = "";
    heading.append(link);
  });

  /* ---------- reading position ------------------------------------------ */

  let ticking = false;
  let lockedEntry = null;
  let lockUntil = 0;

  /* The chapter counts as current once its heading has come to rest just
     under the top edge. That means using exactly the offset the browser
     scrolls to (scroll-padding-top), not a second guess at it — with a wider
     threshold the chapter before the one you clicked stays selected. */
  const restOffset = () => {
    const value = parseFloat(window.getComputedStyle(document.documentElement).scrollPaddingTop);
    return (Number.isFinite(value) ? value : 80) + 2;
  };

  const updatePosition = () => {
    ticking = false;
    const offset = restOffset();
    let current = entries[0];

    if (lockedEntry && performance.now() < lockUntil) {
      current = lockedEntry;
    } else {
      for (const entry of entries) {
        const node = document.getElementById(entry.id);
        if (node && node.getBoundingClientRect().top - offset <= 0) current = entry;
      }
    }
    entries.forEach((entry) => {
      if (!entry.link) return;
      const active = current && entry.id === current.id;
      if (active) entry.link.setAttribute("aria-current", "true");
      else entry.link.removeAttribute("aria-current");
    });

    if (progress) {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      progress.style.width = `${(ratio * 100).toFixed(2)}%`;
      progress.setAttribute("aria-valuenow", String(Math.round(ratio * 100)));
    }
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updatePosition);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  /* A click on a chapter is authoritative: keep that chapter selected while
     the smooth scroll is still travelling, instead of letting it walk back
     through the chapters it passes. */
  const lockTo = (entry) => {
    if (!entry) return;
    lockedEntry = entry;
    lockUntil = performance.now() + 900;
  };

  if (toc) {
    toc.addEventListener("click", (event) => {
      const link = event.target.closest("a[href^='#']");
      if (!link) return;
      const id = link.getAttribute("href").slice(1);
      lockTo(entries.find((entry) => entry.id === id));
      window.requestAnimationFrame(updatePosition);
    });
  }

  document.querySelectorAll(".pager a[href^='#'], .chapter h2 a.anchor").forEach((link) => {
    link.addEventListener("click", () => {
      const id = (link.getAttribute("href") || "").slice(1);
      lockTo(entries.find((entry) => entry.id === id));
      window.requestAnimationFrame(updatePosition);
    });
  });

  updatePosition();

  /* ---------- search ---------------------------------------------------- */

  const search = document.querySelector("[data-toc-search]");
  if (search && toc) {
    const empty = document.createElement("li");
    empty.className = "toc__empty";
    empty.hidden = true;
    toc.append(empty);

    const filter = () => {
      const query = search.value.trim().toLowerCase();
      let shown = 0;
      entries.forEach((entry) => {
        if (!entry.item) return;
        const match = !query || entry.link.dataset.search.includes(query);
        entry.item.hidden = !match;
        if (match) shown += 1;
      });
      empty.hidden = shown !== 0 || query === "";
      empty.textContent = query ? str("searchEmpty", { q: search.value.trim() }) : "";
    };

    search.addEventListener("input", filter);
    search.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        search.value = "";
        filter();
        search.blur();
      }
      if (event.key === "Enter") {
        const first = entries.find((entry) => entry.item && !entry.item.hidden);
        if (first) {
          search.blur();
          closeDrawer();
          window.location.hash = `#${first.id}`;
        }
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target;
      const typing = target instanceof HTMLElement &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      if (typing) return;
      event.preventDefault();
      openDrawer();
      search.focus();
    });
  }

  /* ---------- mobile drawer -------------------------------------------- */

  const toggle = document.querySelector(".rail-toggle");
  const scrim = document.querySelector(".scrim");

  const openDrawer = () => {
    if (!rail || !toggle) return;
    rail.dataset.open = "true";
    toggle.setAttribute("aria-expanded", "true");
    if (scrim) scrim.hidden = false;
    document.body.style.overflow = "hidden";
    const closeBtn = rail.querySelector("[data-close]");
    if (closeBtn) closeBtn.focus();
  };

  const closeDrawer = () => {
    if (!rail || !toggle) return;
    rail.dataset.open = "false";
    toggle.setAttribute("aria-expanded", "false");
    if (scrim) scrim.hidden = true;
    document.body.style.overflow = "";
  };

  if (toggle) {
    toggle.addEventListener("click", () => {
      if (rail.dataset.open === "true") closeDrawer();
      else openDrawer();
    });
  }
  if (scrim) scrim.addEventListener("click", closeDrawer);
  if (rail) {
    rail.addEventListener("click", (event) => {
      const link = event.target.closest("a[href^='#']");
      if (link) closeDrawer();
      if (event.target.closest("[data-close]")) closeDrawer();
    });
  }
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeDrawer();
  });

  /* ---------- print ----------------------------------------------------- */

  document.querySelectorAll("[data-print]").forEach((node) => {
    node.addEventListener("click", (event) => {
      event.preventDefault();
      window.print();
    });
  });

  /* ---------- language hand-off ---------------------------------------- */

  /* A saved language choice outranks the file name: opening player-book.html
     after choosing Russian in the library goes to player-book.ru.html, and the
     same in reverse. replace() keeps the unwanted page out of the back stack. */
  const savedLang = (() => {
    try {
      const saved = localStorage.getItem("yze-lang");
      if (saved === "en" || saved === "ru") return saved;
    } catch (error) {
      /* storage can be unavailable; the page simply stays as it is */
    }
    return null;
  })();

  if (savedLang && savedLang !== lang) {
    const pair = Array.from(document.querySelectorAll("[data-alt-lang]")).find(
      (link) => (link.lang || link.getAttribute("hreflang")) === savedLang
    );
    if (pair) {
      window.location.replace(pair.dataset.altLang + (window.location.hash || ""));
      return;
    }
  }

  document.querySelectorAll("[data-alt-lang]").forEach((link) => {
    const base = link.dataset.altLang;
    if (!base) return;
    const hash = window.location.hash;
    link.setAttribute("href", hash && hash.length > 1 ? `${base}${hash}` : base);
    link.addEventListener("click", () => {
      try {
        localStorage.setItem("yze-lang", link.lang || "");
      } catch (error) {
        /* storage can be unavailable; the link still works */
      }
    });
  });

  const langSwitch = document.querySelector("[data-lang-switch]");
  if (langSwitch) {
    langSwitch.setAttribute("aria-label", str("language"));
    langSwitch.dataset.lang = lang;
  }

  /* ---------- chapter paging ------------------------------------------- */

  const pager = document.querySelector(".pager");
  if (pager && entries.length > 1) {
    const active = () => {
      const current = entries.filter((entry) => entry.link && entry.link.getAttribute("aria-current") === "true");
      return current.length ? current[current.length - 1] : entries[0];
    };
    const prev = pager.querySelector("[data-pager='prev']");
    const next = pager.querySelector("[data-pager='next']");
    const label = (node, text) => {
      const span = node.querySelector("span");
      if (span) span.textContent = text;
    };

    if (prev) label(prev, str("prev"));
    if (next) label(next, str("next"));

    const sync = () => {
      const index = entries.indexOf(active());
      if (prev) {
        const target = entries[index - 1];
        if (target) {
          prev.hidden = false;
          prev.href = `#${target.id}`;
          const name = prev.querySelector("[data-pager-label]");
          if (name) name.textContent = target.label;
        } else {
          prev.hidden = true;
        }
      }
      if (next) {
        const target = entries[index + 1];
        if (target) {
          next.hidden = false;
          next.href = `#${target.id}`;
          const name = next.querySelector("[data-pager-label]");
          if (name) name.textContent = target.label;
        } else {
          next.hidden = true;
        }
      }
    };

    sync();
    window.addEventListener("scroll", () => window.requestAnimationFrame(sync), { passive: true });
  }
})();

/* ---------- editions: read the book as one system ---------------------- */

/* Every rule that belongs to a single variant is marked with data-system in
   the page itself. Choosing an edition hides the other one, remembers the
   choice and keeps it in the address, so player-book.html?system=classic is
   a link to the classic edition of the book. */
(function () {
  "use strict";

  const masthead = document.querySelector(".masthead");
  if (!masthead) return;

  const str = window.YZE_STR || ((key) => key);
  const root = document.documentElement;
  const STORE = "yze-system";
  const baseTitle = document.title;

  const group = document.createElement("div");
  group.className = "edition";
  group.setAttribute("role", "group");
  group.setAttribute("aria-label", str("edition"));

  const label = document.createElement("span");
  label.className = "edition__label";
  label.textContent = str("edition");
  group.append(label);

  [
    ["both", "editionBoth"],
    ["classic", "editionClassic"],
    ["modern", "editionModern"]
  ].forEach(([value, key]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "edition__btn";
    button.dataset.edition = value;
    button.textContent = str(key);
    group.append(button);
  });

  const note = document.createElement("p");
  note.className = "edition__note";

  const lead = masthead.querySelector(".masthead__lead");
  if (lead) lead.after(group, note);
  else masthead.append(group, note);

  const apply = (value, remember) => {
    const choice = value === "classic" || value === "modern" ? value : "both";

    if (choice === "both") root.removeAttribute("data-system");
    else root.dataset.system = choice;

    group.querySelectorAll("[data-edition]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.edition === choice));
    });

    note.textContent = str(
      choice === "classic" ? "editionNoteClassic" : choice === "modern" ? "editionNoteModern" : "editionNoteBoth"
    );

    const name = choice === "classic" ? str("editionClassic") : choice === "modern" ? str("editionModern") : "";
    document.title = name ? `${baseTitle} · ${name}` : baseTitle;

    if (!remember) return;

    try {
      localStorage.setItem(STORE, choice);
    } catch (error) {
      /* the edition still applies, it just will not be remembered */
    }

    const url = new URL(window.location.href);
    if (choice === "both") url.searchParams.delete("system");
    else url.searchParams.set("system", choice);
    window.history.replaceState(null, "", url);
  };

  group.addEventListener("click", (event) => {
    const button = event.target.closest("[data-edition]");
    if (button) apply(button.dataset.edition, true);
  });

  const requested = new URLSearchParams(window.location.search).get("system");
  let saved = null;
  try {
    saved = localStorage.getItem(STORE);
  } catch (error) {
    saved = null;
  }

  const initial = requested === "classic" || requested === "modern" || requested === "both" ? requested : saved;
  apply(initial || "both", false);
})();
