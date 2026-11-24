/* Character sheet: the editable form, its saved state, and the print/PDF path.
   Everything lives in localStorage — there is no server behind GitHub Pages,
   so a sheet belongs to the browser it was filled in until it is exported. */

(function () {
  "use strict";

  const root = document.querySelector("[data-sheet]");
  if (!root) return;

  const STORE = "rootclaw-sheet-v1";
  const GEAR_ROWS = 8;
  const MUTATION_ROWS = 6;
  const TRACKS = { damage: 10, stress: 10, supplies: 6, psychosis: 10 };
  const trackValues = { damage: 0, stress: 0, supplies: 0, psychosis: 0 };

  const lang = () => (document.documentElement.lang === "ru" ? "ru" : "en");

  const t = (key, vars) => {
    const all = window.YZE_STRINGS || {};
    let value = (all[lang()] && all[lang()][key]) || (all.en && all.en[key]) || key;
    if (vars) {
      Object.entries(vars).forEach(([name, replacement]) => {
        value = value.replace(`{${name}}`, replacement);
      });
    }
    return value;
  };

  const CHARS = [
    { id: "body", en: "Strength", ru: "Сила" },
    { id: "agility", en: "Agility", ru: "Ловкость" },
    { id: "wits", en: "Wits", ru: "Смекалка" },
    { id: "empathy", en: "Empathy", ru: "Эмпатия" }
  ];

  const SKILLS = [
    { id: "force", en: "Force", ru: "Мощь", char: "body" },
    { id: "brawl", en: "Brawl", ru: "Драка", char: "body" },
    { id: "endurance", en: "Endurance", ru: "Выносливость", char: "body" },
    { id: "shooting", en: "Shooting", ru: "Стрельба", char: "agility" },
    { id: "acrobatics", en: "Acrobatics", ru: "Акробатика", char: "agility" },
    { id: "stealth", en: "Stealth", ru: "Скрытность", char: "agility" },
    { id: "crafting", en: "Crafting", ru: "Ремесло", char: "wits" },
    { id: "observation", en: "Observation", ru: "Наблюдательность", char: "wits" },
    { id: "survival", en: "Survival", ru: "Выживание", char: "wits" },
    { id: "animal-ken", en: "Animal Ken", ru: "Звериный язык", char: "empathy" },
    { id: "healing", en: "Healing", ru: "Медицина", char: "empathy" },
    { id: "persuasion", en: "Persuasion", ru: "Убеждение", char: "empathy" }
  ];

  const GRADES = ["", "I", "II", "III"];

  const RANKS = [
    { value: "A", die: "d12" },
    { value: "B", die: "d10" },
    { value: "C", die: "d8" },
    { value: "D", die: "d6" }
  ];
  const DIE_MAX = { A: 12, B: 10, C: 8, D: 6 };

  const names = [];
  const named = (element, en, ru) => {
    names.push({ element, en, ru });
    element.textContent = lang() === "ru" ? ru : en;
    return element;
  };

  /* ---------- building the form ---------------------------------------- */

  const rankOptions = (includeBlank) => {
    const options = includeBlank ? ['<option value="">—</option>'] : [];
    RANKS.forEach((rank) => {
      options.push(`<option value="${rank.value}">${rank.value} · ${rank.die}</option>`);
    });
    return options.join("");
  };

  const buildChars = () => {
    const host = root.querySelector("[data-chars]");
    CHARS.forEach((characteristic) => {
      const tile = document.createElement("div");
      tile.className = "char";

      const name = document.createElement("span");
      name.className = "char__name";
      named(name, characteristic.en, characteristic.ru);

      const slot = document.createElement("span");
      slot.className = "char__slot";

      const value = document.createElement("input");
      value.className = "char__val";
      value.type = "number";
      value.min = "1";
      value.max = "5";
      value.inputMode = "numeric";
      value.dataset.field = `chars.${characteristic.id}.value`;
      value.setAttribute("aria-label", characteristic.en);

      const rank = document.createElement("select");
      rank.className = "char__rank f";
      rank.dataset.field = `chars.${characteristic.id}.rank`;
      rank.setAttribute("aria-label", `${characteristic.en} rank`);
      rank.innerHTML = rankOptions(false);
      rank.value = "C";

      slot.append(value, rank);

      tile.append(name, slot);
      host.append(tile);
    });
  };

  const buildSkills = () => {
    const host = root.querySelector("[data-skill-rows]");
    SKILLS.forEach((skill) => {
      const row = document.createElement("tr");

      const nameCell = document.createElement("td");
      const name = document.createElement("span");
      name.className = "skills__name";
      named(name, skill.en, skill.ru);
      nameCell.append(name);

      const charCell = document.createElement("td");
      charCell.className = "skills__char";
      const characteristic = CHARS.find((item) => item.id === skill.char);
      const charName = document.createElement("span");
      named(charName, characteristic.en, characteristic.ru);
      charCell.append(charName);

      const valueCell = document.createElement("td");
      valueCell.className = "skills__val";
      const level = document.createElement("input");
      level.className = "f f--num skill__level";
      level.type = "number";
      level.min = "0";
      level.max = "5";
      level.inputMode = "numeric";
      level.dataset.field = `skills.${skill.id}.level`;
      level.setAttribute("aria-label", `${skill.en} level`);

      const rank = document.createElement("select");
      rank.className = "f f--rank skill__rank";
      rank.dataset.field = `skills.${skill.id}.rank`;
      rank.setAttribute("aria-label", `${skill.en} rank`);
      rank.innerHTML = rankOptions(true);
      rank.value = "C";
      valueCell.append(level, rank);

      const specCell = document.createElement("td");
      const spec = document.createElement("input");
      spec.className = "f";
      spec.type = "text";
      spec.dataset.field = `skills.${skill.id}.spec`;
      spec.setAttribute("aria-label", `${skill.en} specialization`);
      specCell.append(spec);

      const specRankCell = document.createElement("td");
      specRankCell.className = "skills__specrank";
      const specRank = document.createElement("select");
      specRank.className = "f f--rank";
      specRank.dataset.field = `skills.${skill.id}.specRank`;
      specRank.setAttribute("aria-label", `${skill.en} specialization rank`);
      specRank.innerHTML = rankOptions(true);
      specRankCell.append(specRank);

      row.append(nameCell, charCell, valueCell, specCell, specRankCell);
      host.append(row);
    });
  };

  const buildGear = () => {
    const host = root.querySelector("[data-gear]");
    for (let index = 0; index < GEAR_ROWS; index += 1) {
      const row = document.createElement("div");
      row.className = "gear__row";

      const item = document.createElement("input");
      item.className = "f";
      item.type = "text";
      item.dataset.field = `gear.${index}.item`;

      const load = document.createElement("input");
      load.className = "f f--num";
      load.type = "number";
      load.min = "0";
      load.max = "9";
      load.inputMode = "numeric";
      load.dataset.field = `gear.${index}.load`;
      load.setAttribute("aria-label", t("sheetLoad"));

      row.append(item, load);
      host.append(row);
    }
  };

  /* Mutations are half the character: two bio, or one bio and one psi. The cost
     column follows the type, and psi rows are counted into a summary. */
  const buildMutations = () => {
    const host = root.querySelector("[data-mutation-rows]");
    if (!host) return;

    for (let index = 0; index < MUTATION_ROWS; index += 1) {
      const row = document.createElement("tr");

      const nameCell = document.createElement("td");
      const name = document.createElement("input");
      name.className = "f";
      name.type = "text";
      name.dataset.field = `mutations.${index}.name`;
      name.setAttribute("aria-label", `Mutation ${index + 1}`);
      nameCell.append(name);

      const typeCell = document.createElement("td");
      const type = document.createElement("select");
      type.className = "f mut__type";
      type.dataset.field = `mutations.${index}.type`;
      type.setAttribute("aria-label", `Mutation ${index + 1} type`);
      type.innerHTML = '<option value="">—</option><option value="bio">Bio</option><option value="psi">Psi</option>';
      typeCell.append(type);

      const gradeCell = document.createElement("td");
      gradeCell.className = "mut__grade";
      const grade = document.createElement("select");
      grade.className = "f";
      grade.dataset.field = `mutations.${index}.grade`;
      grade.setAttribute("aria-label", `Mutation ${index + 1} grade`);
      grade.innerHTML = GRADES.map((value) => `<option value="${value}">${value || "—"}</option>`).join("");
      gradeCell.append(grade);

      const costCell = document.createElement("td");
      costCell.className = "mut__cost";
      costCell.dataset.mutationCost = String(index);

      row.append(nameCell, typeCell, gradeCell, costCell);
      host.append(row);
    }
  };

  const paintMutations = () => {
    const l = lang();
    let psi = 0;

    for (let index = 0; index < MUTATION_ROWS; index += 1) {
      const type = root.querySelector(`[data-field="mutations.${index}.type"]`);
      const cost = root.querySelector(`[data-mutation-cost="${index}"]`);
      const value = type ? type.value : "";
      if (value === "psi") psi += 1;

      if (type) {
        type.options[1].textContent = l === "ru" ? "Био" : "Bio";
        type.options[2].textContent = l === "ru" ? "Пси" : "Psi";
      }
      if (cost) {
        cost.textContent = value === "psi"
          ? (l === "ru" ? "психоз" : "psychosis")
          : value === "bio"
            ? (l === "ru" ? "постоянно" : "always")
            : "—";
      }
    }

    const sum = root.querySelector("[data-mutation-sum]");
    if (!sum) return;
    if (!psi) {
      sum.textContent = l === "ru" ? "Пси-мутации ничего не стоят, но каждая 1 на кубике даёт +1 психоз" : "Psi-mutations cost nothing; each 1 on the die adds 1 psychosis";
      return;
    }
    sum.textContent = l === "ru"
      ? `Пси: ${psi} · +1 психоз за каждую 1 на кубике`
      : `Psi: ${psi} · +1 psychosis per 1 on the die`;
  };

  /* A damage track is a counter, not a set of independent ticks: clicking the
     fifth box marks five points, and clicking the last marked box takes one
     back. That way the track can never show a gap in the middle. */
  const buildTracks = () => {
    root.querySelectorAll("[data-track]").forEach((host) => {
      const track = host.dataset.track;
      const count = TRACKS[track] || 6;
      for (let index = 0; index < count; index += 1) {
        const pip = document.createElement("button");
        pip.type = "button";
        pip.className = "pip";
        pip.dataset.pip = String(index);
        pip.dataset.track = track;
        host.append(pip);
      }

      const counter = document.createElement("span");
      counter.className = "track__count";
      counter.dataset.count = track;
      host.after(counter);

      host.addEventListener("click", (event) => {
        const pip = event.target.closest(".pip");
        if (!pip) return;
        const index = Number(pip.dataset.pip);
        const current = trackValues[track] || 0;
        trackValues[track] = index + 1 === current ? index : index + 1;
        paintTrack(track);

        queueSave();
      });
    });
  };

  const paintTrack = (track) => {
    const count = TRACKS[track] || 6;
    const value = Math.max(0, Math.min(count, trackValues[track] || 0));
    const row = root.querySelector(`[data-track="${track}"]`).closest(".track");
    const name = row ? (row.querySelector(".track__name") || {}).textContent || track : track;

    root.querySelectorAll(`.pip[data-track="${track}"]`).forEach((pip) => {
      const index = Number(pip.dataset.pip);
      const on = index < value;
      pip.setAttribute("aria-pressed", String(on));
      pip.setAttribute("aria-label", `${name} ${index + 1} / ${count}`);
      pip.title = `${name} ${index + 1} / ${count}`;
    });

    const counter = root.querySelector(`[data-count="${track}"]`);
    if (counter) counter.textContent = `${value} / ${count}`;
  };

  const paintTracks = () => {
    Object.keys(TRACKS).forEach((track) => paintTrack(track));
  };

  /* ---------- state ----------------------------------------------------- */

  const fields = () => Array.from(root.querySelectorAll("[data-field]"));

  const collect = () => {
    const data = { version: 1, variant: document.body.dataset.variant || "classic", fields: {} };
    fields().forEach((field) => {
      data.fields[field.dataset.field] = field.type === "checkbox" ? field.checked : field.value;
    });
    data.tracks = {};
    Object.keys(TRACKS).forEach((track) => {
      data.tracks[track] = trackValues[track] || 0;
    });
    return data;
  };

  const apply = (data) => {
    if (!data || typeof data !== "object") return;
    if (data.variant === "modern" || data.variant === "classic") setVariant(data.variant, false);

    const saved = data.fields || {};
    fields().forEach((field) => {
      const value = saved[field.dataset.field];
      if (field.type === "checkbox") {
        field.checked = value === true || value === "on" || value === 1;
        return;
      }
      if (typeof value === "string" || typeof value === "number") field.value = value;
    });
    const tracks = data.tracks || {};
    Object.keys(TRACKS).forEach((track) => {
      trackValues[track] = Number(tracks[track]) || 0;
    });
    paintTracks();
    recalculate();
  };

  const clear = () => {
    fields().forEach((field) => {
      if (field.type === "checkbox") {
        field.checked = false;
        return;
      }
      field.value = field.tagName === "SELECT" ? (field.classList.contains("char__rank") || field.classList.contains("skill__rank") ? "C" : "") : "";
    });
    Object.keys(TRACKS).forEach((track) => {
      trackValues[track] = 0;
    });
    paintTracks();
    recalculate();
  };

  let saveTimer = null;
  let status = null;

  const say = (key, vars) => {
    status = { key, vars };
    const node = document.querySelector("[data-sheet-status]");
    if (node) node.textContent = t(key, vars);
  };

  const save = () => {
    try {
      localStorage.setItem(STORE, JSON.stringify(collect()));
      say("sheetSaved");
    } catch (error) {
      say("sheetSaveFailed");
    }
  };

  const queueSave = () => {
    window.clearTimeout(saveTimer);
    saveTimer = window.setTimeout(save, 400);
  };

  /* ---------- derived numbers ------------------------------------------ */

  const setVariant = (variant, announce) => {
    document.body.dataset.variant = variant;
    document.querySelectorAll("[data-variant-set]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.variantSet === variant));
    });
    recalculate();
    if (announce !== false) queueSave();
  };

  const recalculate = () => {
    const read = (name) => root.querySelector(`[data-field="${name}"]`);

    const bodyValue = Number((read("chars.body.value") || {}).value || 0);
    const bodyRank = (read("chars.body.rank") || {}).value || "C";
    const base = document.body.dataset.variant === "modern" ? DIE_MAX[bodyRank] || 0 : bodyValue * 2;

    /* a worn backpack adds a second carry limit's worth of gear, at the price
       of two dice on every Mobility roll */
    const backpack = read("carry.backpack");
    const loaded = !!(backpack && backpack.checked);
    const capacity = loaded ? base * 2 : base;

    let load = 0;
    for (let index = 0; index < GEAR_ROWS; index += 1) {
      const field = read(`gear.${index}.load`);
      load += Math.max(0, Number(field && field.value) || 0);
    }

    const output = root.querySelector("[data-load-value]");
    if (output) output.textContent = `${load} / ${capacity}`;
    const block = root.querySelector("[data-load]");
    if (block) block.classList.toggle("is-over", load > capacity);
    const penalty = root.querySelector("[data-load-pen]");
    if (penalty) penalty.hidden = !loaded;

    /* mounts and vehicles carry their own load; leading the animal on foot
       instead of riding doubles it */
    const mountField = read("carry.mount");
    const mountLimit = Math.max(0, Number(mountField && mountField.value) || 0);
    const ledBox = read("carry.led");
    const led = !!(ledBox && ledBox.checked);
    const mountValue = mountLimit ? mountLimit * (led ? 2 : 1) : 0;
    const mountOutput = root.querySelector("[data-mount-value]");
    if (mountOutput) mountOutput.textContent = mountValue ? String(mountValue) : "—";

    /* aura is a standing score, not a pool: the sheet reads it back as light,
       dark or balanced so the table can see which bonus applies */
    const auraField = read("aura.value");
    const auraRaw = auraField ? String(auraField.value).trim() : "";
    const aura = Math.max(-5, Math.min(5, Number(auraRaw) || 0));
    const auraOutput = root.querySelector("[data-aura-state]");
    if (auraOutput) {
      const l = lang();
      auraOutput.textContent = auraRaw === ""
        ? "—"
        : aura === 0
          ? (l === "ru" ? "Ровная" : "Balanced")
          : aura > 0
            ? (l === "ru" ? `Светлая +${aura}` : `Light +${aura}`)
            : (l === "ru" ? `Тёмная −${Math.abs(aura)}` : `Dark −${Math.abs(aura)}`);
      auraOutput.dataset.balance = auraRaw === "" || aura === 0 ? "even" : aura > 0 ? "light" : "dark";
    }

    paintMutations();
  };

  /* ---------- wiring ---------------------------------------------------- */

  setVariant(document.body.dataset.variant || "classic", false);

  root.addEventListener("input", (event) => {
    if (!event.target.matches("[data-field]")) return;
    recalculate();
    queueSave();
  });

  root.addEventListener("change", (event) => {
    if (!event.target.matches("[data-field]")) return;
    recalculate();
    queueSave();
  });

  document.querySelectorAll("[data-variant-set]").forEach((button) => {
    button.addEventListener("click", () => setVariant(button.dataset.variantSet));
  });

  const printButton = document.querySelector("[data-print]");
  if (printButton) {
    printButton.addEventListener("click", () => window.print());
  }

  const exportButton = document.querySelector("[data-export]");
  if (exportButton) {
    exportButton.addEventListener("click", () => {
      const data = collect();
      const nameField = root.querySelector('[data-field="name"]');
      const hero = (nameField && nameField.value.trim()) || "character";
      const slug = hero.toLowerCase().replace(/[^a-zа-я0-9]+/gi, "-").replace(/^-|-$/g, "") || "character";
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `rootclaw-${slug}.json`;
      document.body.append(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      say("sheetExported");
    });
  }

  const importInput = document.querySelector("[data-import]");
  if (importInput) {
    importInput.addEventListener("change", () => {
      const file = importInput.files && importInput.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        try {
          const data = JSON.parse(String(reader.result));
          if (!data || typeof data !== "object" || !data.fields) throw new Error("shape");
          clear();
          apply(data);
          save();
          say("sheetImported");
        } catch (error) {
          say("sheetImportFailed");
        }
        importInput.value = "";
      });
      reader.addEventListener("error", () => {
        say("sheetImportFailed");
        importInput.value = "";
      });
      reader.readAsText(file);
    });
  }

  const newButton = document.querySelector("[data-new]");
  if (newButton) {
    newButton.addEventListener("click", () => {
      if (!window.confirm(t("sheetConfirmBlank"))) return;
      clear();
      save();
      say("sheetBlank");
    });
  }

  /* the language buttons are handled by home.js; the generated names and the
     status line have to follow it afterwards */
  document.querySelectorAll("[data-set-lang]").forEach((button) => {
    button.addEventListener("click", () => {
      names.forEach((entry) => {
        entry.element.textContent = button.dataset.setLang === "ru" ? entry.ru : entry.en;
      });
      if (status) say(status.key, status.vars);
      document.querySelectorAll("[data-load] .load__label").forEach((node) => {
        node.textContent = button.dataset.setLang === "ru" ? "Нагрузка" : "Load";
      });
      document.querySelectorAll('[data-field$=".load"]').forEach((node) => {
        if (node.type === "number") node.setAttribute("aria-label", t("sheetLoad"));
      });
      recalculate();
    });
  });

  /* ---------- start ----------------------------------------------------- */

  buildChars();
  buildSkills();
  buildMutations();
  buildGear();
  buildTracks();
  paintTracks();

  let stored = null;
  try {
    stored = JSON.parse(localStorage.getItem(STORE) || "null");
  } catch (error) {
    stored = null;
  }
  if (stored) apply(stored);
  else recalculate();
})();
