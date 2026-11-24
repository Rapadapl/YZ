/* The psychosis track lives in assets/psychosis-table.json and nowhere else.
   Every page that shows the table carries an empty <div data-psychosis-table>
   and this script fills it in the page's language, so the four copies can never
   drift apart. The markdown chapter is generated from the same file by
   tools/build-psychosis-table.py. */

(function () {
  "use strict";

  const host = "[data-psychosis-table]";
  const lang = () => (document.documentElement.lang === "ru" ? "ru" : "en");

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  /* Notes in the JSON keep <strong> so the rich HTML pages get bold labels;
     injection is done node by node, never with innerHTML. */
  const renderNote = (paragraph, text) => {
    const parts = String(text).split(/(<strong>[\s\S]*?<\/strong>)/g);
    parts.forEach((part) => {
      const bold = part.match(/^<strong>([\s\S]*?)<\/strong>$/);
      if (bold) {
        paragraph.append(el("strong", null, bold[1]));
      } else if (part) {
        paragraph.append(document.createTextNode(part));
      }
    });
  };

  const render = (data) => {
    const copy = data[lang()] || data.en;
    const out = [];
    out.push(el("h3", null, copy.title));
    out.push(el("p", null, copy.intro));

    const wrap = el("div", "tbl-wrap");
    const table = el("table", "tbl");
    const caption = el("caption", null, copy.caption);
    table.append(caption);

    const thead = document.createElement("thead");
    const headRow = document.createElement("tr");
    copy.columns.forEach((name) => {
      const th = document.createElement("th");
      th.scope = "col";
      th.textContent = name;
      headRow.append(th);
    });
    thead.append(headRow);
    table.append(thead);

    const tbody = document.createElement("tbody");
    copy.rows.forEach((row) => {
      const tr = document.createElement("tr");
      const band = String(row[0]);
      if (parseInt(band, 10) >= data.instinctAt) tr.dataset.instinct = "true";
      row.forEach((cell, index) => {
        const td = document.createElement("td");
        if (index === 0) {
          const strong = el("strong", null, cell);
          td.append(strong);
        } else {
          td.textContent = cell;
        }
        tr.append(td);
      });
      tbody.append(tr);
    });
    table.append(tbody);
    wrap.append(table);
    out.push(wrap);

    copy.notes.forEach((note) => {
      const p = el("p");
      renderNote(p, note);
      out.push(p);
    });

    return out;
  };

  const paint = (data) => {
    document.querySelectorAll(host).forEach((node) => {
      node.replaceChildren(...render(data));
      node.dataset.ready = "true";
    });
  };

  const start = () => {
    if (!document.querySelector(host)) return;
    const url = new URL("assets/psychosis-table.json", document.baseURI);
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error("psychosis table: " + response.status);
        return response.json();
      })
      .then(paint)
      .catch((error) => {
        console.error(error);
        document.querySelectorAll(host).forEach((node) => {
          node.textContent = lang() === "ru"
            ? "Таблица психоза не загрузилась. Откройте assets/psychosis-table.json."
            : "The psychosis table did not load. See assets/psychosis-table.json.";
        });
      });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
