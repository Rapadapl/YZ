/* The psychosis track, shared by the player's book, the master's book and the
   module. Pages mark the place with [data-psychosis-table]; the rows below are
   the single source for all three languages. */

(function () {
  "use strict";

  const host = document.querySelector("[data-psychosis-table]");
  if (!host) return;

  const lang = window.YZE_LANG || "en";

  const copy = {
    en: {
      caption: "The psychosis track",
      head: ["Psychosis", "State", "At the table"],
      rows: [
        ["0–2", "Clear", "No trace yet: the hero sleeps, eats and talks like a person. No change to any check."],
        ["3–4", "Beast under the skin", "+1 die to Observation: sharper smell and hearing. −1 die to Persuasion with anyone not of your own."],
        ["5–6", "On the edge", "+1 die to Brawl and Shooting against whoever drew blood first. −1 die to Crafting and Healing: the hands shake."],
        ["7–8", "Breakdown close", "−1 die to every Wits check except Observation. A night's sleep no longer clears psychosis."],
        ["9", "One step from the beast", "+1 die to Survival and Stealth. Helping an ally now needs an Empathy roll. Any new curse or shock takes the hero to 10."],
        ["10–11", "Instinct", "An Empathy save at the start of every round. On a failure the instinct runs that round and the save pool loses a die. Empty pool means 18."],
        ["12–13", "Deeper instinct", "A successful save only drops psychosis to 10. Speech is broken: −2 dice to Persuasion and Animal Ken."],
        ["14–15", "Almost a beast", "The save is rolled once per scene. The hero understands only his own people and the pack leader, and cannot read or cast."],
        ["16–17", "Beast within", "The GM runs the hero. Only an ally at Engaged range can bring him back, with a Persuasion or Animal Ken check."],
        ["18", "Transformation", "A beast run by the GM for good, until a ritual returns the body."]
      ]
    },
    ru: {
      caption: "Шкала психоза",
      head: ["Психоз", "Состояние", "За столом"],
      rows: [
        ["0–2", "Чисто", "Следа ещё нет: герой спит, ест и говорит как человек. Проверки не меняются."],
        ["3–4", "Зверь под кожей", "+1 кубик к Наблюдательности: тоньше нюх и слух. −1 кубик к Убеждению с чужими."],
        ["5–6", "На грани", "+1 кубик к Драке и Стрельбе против того, кто первым пустил кровь. −1 кубик к Ремеслу и Медицине: руки дрожат."],
        ["7–8", "Срыв близко", "−1 кубик ко всем проверкам Смекалки, кроме Наблюдательности. Ночь сна больше не снимает психоз."],
        ["9", "Шаг до зверя", "+1 кубик к Выживанию и Скрытности. Помочь союзнику теперь требует броска Эмпатии. Любое новое проклятие или потрясение поднимает до 10."],
        ["10–11", "Инстинкт", "Спасение Эмпатией в начале каждого раунда. При провале инстинкт ведёт этот раунд, а пул спасения теряет кубик. Пустой пул — это 18."],
        ["12–13", "Глубокий инстинкт", "Успешное спасение снижает психоз только до 10. Речь ломается: −2 кубика к Убеждению и Звериному языку."],
        ["14–15", "Почти зверь", "Спасение бросают раз за сцену. Герой понимает только своих и вожака, не читает и не колдует."],
        ["16–17", "Зверь внутри", "Мастер ведёт героя. Вернуть его может только союзник вплотную, броском Убеждения или Звериного языка."],
        ["18", "Превращение", "Зверь под управлением мастера навсегда, пока ритуал не вернёт тело."]
      ]
    },
    zh: {
      caption: "精神错乱轨",
      head: ["精神错乱", "状态", "桌边"],
      rows: [
        ["0–2", "清明", "还没有痕迹：英雄像人一样睡眠、进食、交谈。任何检定都不变。"],
        ["3–4", "皮下之兽", "观察 +1 骰：嗅觉与听觉更敏锐。对非自己人的说服 −1 骰。"],
        ["5–6", "临界", "对先见血者，武斗与射击 +1 骰。手艺与医学 −1 骰：手在抖。"],
        ["7–8", "崩溃将近", "除观察外，所有智识检定 −1 骰。一夜睡眠不再清除精神错乱。"],
        ["9", "距兽一步", "生存与潜行 +1 骰。帮助同伴现在需要共情投掷。任何新的诅咒或冲击都把英雄推到 10。"],
        ["10–11", "本能", "每轮开始进行共情豁免。失败则本轮由本能支配，豁免池失去一颗骰。池空即为 18。"],
        ["12–13", "更深的本能", "豁免成功也只能把精神错乱降到 10。言语破碎：说服与兽语 −2 骰。"],
        ["14–15", "几乎成兽", "豁免每场投一次。英雄只听得懂自己人和群族首领，不能阅读，也不能施法。"],
        ["16–17", "兽在体内", "由主持人扮演英雄。只有贴身的同伴能靠说服或兽语检定把他唤回。"],
        ["18", "蜕变", "英雄成为由主持人永久扮演的野兽，直到某场仪式归还身体。"]
      ]
    }
  };

  const text = copy[lang] || copy.en;

  const wrap = document.createElement("div");
  wrap.className = "tbl-wrap";

  const table = document.createElement("table");
  table.className = "tbl";

  const caption = document.createElement("caption");
  caption.textContent = text.caption;
  table.append(caption);

  const thead = document.createElement("thead");
  const headRow = document.createElement("tr");
  text.head.forEach((value) => {
    const th = document.createElement("th");
    th.scope = "col";
    if (value === text.head[0]) th.className = "num";
    th.textContent = value;
    headRow.append(th);
  });
  thead.append(headRow);
  table.append(thead);

  const tbody = document.createElement("tbody");
  text.rows.forEach((row) => {
    const tr = document.createElement("tr");
    row.forEach((value, index) => {
      const cell = document.createElement(index === 0 ? "td" : "td");
      if (index === 0) cell.className = "num";
      cell.textContent = value;
      tr.append(cell);
    });
    tbody.append(tr);
  });
  table.append(tbody);

  wrap.append(table);
  host.append(wrap);
})();
