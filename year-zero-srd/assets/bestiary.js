/* Bestiary render + filters. One data file (bestiary-data.js) two languages. */

const GROUP = {
  en: { scavengers: "Scavengers and pests", predators: "Predators", roots: "Root and sap things", rot: "The rot-touched", great: "Great things" },
  ru: { scavengers: "Падальщики и вредители", predators: "Хищники", roots: "Корень и сок", rot: "Тронутые гнилью", great: "Великие" }
};
const LEAD = {
  en: {
    scavengers: "Small things that want the scraps of a campfire: cable, kep, a melting lantern and whatever the Overgrowth drops.",
    predators: "Beasts with teeth that work the same cities as people, the same roads, and the same soft spot under a bridge.",
    roots: "Things the Tree pushed into a monster's shape: a hound with too much sap, a worm under the floor, a fungus with a flock of its own.",
    rot: "Animals and people the rot has finished — and a saint that has not quite finished yet.",
    great: "Things too big for a campfire and too sharp for a story. Listed so people know what not to wake up."
  },
  ru: {
    scavengers: "Маленькие вещи, за которые хочется дрова: кабель, кеф, горящий фонарь и всё, что насыпала Поросль.",
    predators: "Звери с зубами, которые работают те же города и дороги, и та же мягкая находка под мостом.",
    roots: "Вещи, которых Древо заставило жить в облике монстра: гончий с лишним соком, червь под полом, гриб с собственным стадом.",
    rot: "Звери и люди, которых Гниль кончила — и святой, который ещё не совсем кончился.",
    great: "Великие: слишком большие для костра и слишком опасные для легенды. Занесены, чтобы знать, на что не мешать."
  }
};
const ATTR = { en: ["Str", "Agi", "Wit", "Emp"], ru: ["Вл", "Ловк", "Пам", "Соц"] };
const RANK = { 1: "D", 2: "D", 3: "C", 4: "B", 5: "A", 6: "A" };
const DEFS = {
  en: { attacks: "Attacks", special: "Special", wants: "It wants", loot: "Loot" },
  ru: { attacks: "Атаки", special: "Особенность", wants: "Хочет", loot: "Лут" }
};

function esc(s){ return String(s).replace(/[&<>]/g, c => c==="&"?"&amp;":c==="<"?"&lt;":"&gt;"); }
function rank(n){ return RANK[n] || ""; }

function cardHTML(e, lang){
  const d = e[lang];
  const dots = "●".repeat(e.threat);
  const stats = e.attrs.map((v,i)=>`<div class="stat"><dt>${ATTR[lang][i]}</dt><dd>${v}<small>${rank(v)}</small></dd></div>`).join("");
  const defs = DEFS[lang];
  return `<article class="beast" data-threat="${e.threat}" data-group="${e.group}" data-id="${e.id}">
    <header class="hb"><h3>${esc(d.name)}</h3><span class="dots" aria-hidden="true">${dots}</span></header>
    <p class="ep">${esc(d.epithet)}</p>
    <dl class="st">${stats}</dl>
    <p class="ln"><b>${defs.attacks}.</b> ${esc(d.attacks)}</p>
    <p class="ln"><b>${defs.special}.</b> ${esc(d.special)}</p>
    <p class="ln"><b>${defs.wants}.</b> ${esc(d.wants)}</p>
    <p class="ln"><b>${defs.loot}.</b> ${esc(d.loot)}</p>
  </article>`;
}

function renderGroup(id){
  const host = document.getElementById("beasts-"+id);
  if(!host) return;
  const lang = document.documentElement.lang;
  host.innerHTML = GROUP[lang][id] ? "" : "";
  GROUP[lang].forEach(key => {
    if(key !== id) return;
    const list = window.ROOTCLAW_BESTIARY.filter(e=>e.group===id);
    host.innerHTML = list.map(e=>cardHTML(e,lang)).join("");
    const lead = document.getElementById("lead-"+id);
    if(lead) lead.textContent = LEAD[lang][id];
  });
}

function syncTOC(){
  document.querySelectorAll("#toc li[data-toc-id]").forEach(li=>{
    const ch = document.getElementById(li.getAttribute("data-toc-id"));
    const hidden = ch && window.getComputedStyle(ch).display==="none";
    li.style.display = hidden ? "none" : "";
  });
}

function filters(){
  const chips = document.querySelectorAll("[data-threat-filter]");
  const search = document.querySelector("[data-best-search]");
  const count = document.querySelector("[data-best-count]");
  if(!chips.length) return;
  const lang = document.documentElement.lang;
  chips.forEach(b=>{
    const t = parseInt(b.dataset.threatFilter);
    b.textContent = t===0 ? "All" : "●".repeat(t)+" "+(t===1?"Low":t===2?"Medium":"High");
    b.setAttribute("aria-pressed","false");
    b.textContent = t===0 ? "All" : "●".repeat(t)+" "+(t===1?"Low":t===2?"Medium":"High");
  });
  const labels = { 0:"All", 1:"Low", 2:"Medium", 3:"High" };
  function apply(){
    const q = (search?search.value:"").toLowerCase();
    const threat = document.querySelector("[data-threat-filter][aria-pressed='true']")?.dataset.threatFilter || "0";
    let shown = 0;
    document.querySelectorAll(".beast").forEach(a=>{
      const t = a.dataset.threat;
      let ok = (threat==="0" || t===threat);
      if(ok && q){
        ok = a.dataset.id.includes(q)
          || a.textContent.toLowerCase().includes(q);
        const text = a.textContent.toLowerCase();
        ok = a.querySelector("h3")?.textContent.toLowerCase().includes(q)
            || a.querySelector(".ep")?.textContent.toLowerCase().includes(q)
            || a.textContent.toLowerCase().includes(q);
        ok = a.textContent.toLowerCase().includes(q);
        ok = a.textContent.toLowerCase().includes(q);
      }
      a.style.display = ok ? "grid" : "none";
      if(ok) shown++;
    });
    document.querySelectorAll(".chapter").forEach(ch=>{
      const bs = ch.querySelector(".beasts");
      ch.style.display = (bs && bs.querySelector(".beast:not([style*='none']{display:grid'})")) ? "" : "none";
    });
    syncTOC();
    if(count){
      count.textContent = `Showing ${shown} of ${window.ROOTCLAW_BESTIARY.length} beasts`;
    }
  }
  chips.forEach(b=> b.addEventListener("click", ()=>{
    chips.forEach(c=> c.setAttribute("aria-pressed","false"));
    b.setAttribute("aria-pressed","true");
    apply();
  }));
  if(search) search.addEventListener("input", apply);
  apply();
}

function buildTOC(){
  const toc = document.getElementById("toc");
  if(!toc) return;
  const lang = document.documentElement.lang;
  Object.keys(GROUP[lang]).forEach(id=>{
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "#"+id;
    a.textContent = GROUP[lang][id];
    a.dataset.tocId = id;
    li.appendChild(a);
    toc.appendChild(li);
  });
}

function boot(){
  if(typeof ROOTCLAW_BESTIARY !== "object" || !Array.isArray(ROOTCLAW_BESTIARY)){
    setTimeout(boot, 120);
    return;
  }
  const lang = document.documentElement.lang;
  buildTOC();
  Object.keys(GROUP[lang]).forEach(renderGroup);
  filters();
}

if(typeof document !== "undefined" && document.readyState === "loading"){
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
